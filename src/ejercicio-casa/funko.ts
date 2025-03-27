import chalk from "chalk";
import path from 'path';
import { mkdir, readdir, readFile, writeFile, unlink } from 'fs';
export enum TipoFunko { POP = 'Pop!', RIDES = 'Rides', VYNL_SODA = 'Vinyl Soda', VYNL_GOLD = 'Vinyl Gold' };
export enum TipoGenero { ANIMATION = 'Animation', TV_MOVIES = 'TV & Movies', GAMES = 'Games', SPORTS = 'Sports', MUSIC = 'Music', ANIME = 'Anime' };
export enum TipoFranquicia { THEBIGBANGTHEORY = 'The Big Bang Theory', GAMEOFTHRONES = 'Game of Thrones', SONIC = 'Sonic the Hedgehog', MARVEL = 'Marvel' };
export type Funko = {
  ID: number,
  nombre: string,
  descripcion: string,
  tipo: TipoFunko,
  genero: TipoGenero,
  franquicia: TipoFranquicia,
  numeroFranquicia: number,
  exclusivo: boolean,
  caracteristicasEspeciales: string,
  valorDeMercado: number;
}
export function colorearValor(valor: number): string {
  if (valor >= 1000) {
    return chalk.green(`$${valor}`);
  } else if (valor >= 500) {
    return chalk.bgCyan(`$${valor}`);
  } else if (valor >= 100) {
    return chalk.yellow(`$${valor}`);
  } else {
    return chalk.red(`$${valor}`);
  }
}
export class ColeccionFunkosPop {
  private _coleccion: Funko[] = [];
  private _usuario: string;

  constructor(usuario: string) {
    this._usuario = usuario;
  }

  cargarColeccion(callback: () => void): void {
    const ruta = this.getRutaUsuario();
    readdir(ruta, (err, files) => {
      if (err || files.length === 0) {
        callback(); 
        return;
      }

      let cargados = 0;
      files.forEach((file) => {
        const rutaFunko = path.join(ruta, file);
        readFile(rutaFunko, (err, data) => {
          cargados++;
          if (!err) {
            try {
              const funko = JSON.parse(data.toString()) as Funko;
              this._coleccion.push(funko);
            } catch (e) {
              console.error(chalk.red(`Error parseando ${file}: ${e}`));
            }
          }
          if (cargados === files.length) callback();
        });
      });
    });
  }

  getRutaUsuario(): string {
    return path.join('data', this._usuario);
  }

  guardarFunkoEnArchivo(funko: Funko): void {
    const ruta = this.getRutaUsuario();
    mkdir(ruta, { recursive: true }, (err) => {
      if (err) {
        console.error(chalk.red(`Error creando carpeta del usuario: ${err.message}`));
        return;
      }
      const rutaFunko = path.join(ruta, `${funko.ID}.json`);
      writeFile(rutaFunko, JSON.stringify(funko, null, 2), (err) => {
        if (err) {
          console.error(chalk.red(`Error guardando Funko: ${err.message}`));
        }
      });
    });
  }

  eliminarArchivoFunko(id: number): void {
    const rutaFunko = path.join(this.getRutaUsuario(), `${id}.json`);
    unlink(rutaFunko, (err) => {
      if (err) console.error(chalk.red(`Error eliminando archivo del Funko: ${err.message}`));
    });
  }

  añadirFunko(nuevoFunko: Funko): void {
    if (!this.buscarID(nuevoFunko.ID)) {
      this._coleccion.push(nuevoFunko);
      this.guardarFunkoEnArchivo(nuevoFunko);
      console.log(chalk.green('Funko añadido con éxito'));
    } else {
      console.error(chalk.red('Ya existe un Funko con ese ID'));
    }
  }

  modificarFunko(modiFunko: Funko): void {
    const index = this._coleccion.findIndex(f => f.ID === modiFunko.ID);
    if (index !== -1) {
      this._coleccion[index] = modiFunko;
      this.guardarFunkoEnArchivo(modiFunko);
      console.log(chalk.green('Funko modificado con éxito'));
    } else {
      console.error(chalk.red('No existe un Funko con ese ID, no se ha podido modificar'));
    }
  }

  eliminarFunko(id: number): void {
    const index = this._coleccion.findIndex(f => f.ID === id);
    if (index !== -1) {
      this._coleccion.splice(index, 1);
      this.eliminarArchivoFunko(id);
      console.log(chalk.green('Funko eliminado con éxito'));
    } else {
      console.error(chalk.red('No existe un Funko con ese ID, no se ha podido eliminar'));
    }
  }

  listarFunkos(): void {
    if (this._coleccion.length === 0) {
      console.log(chalk.red('No hay Funkos en la colección.'));
      return;
    }
    this._coleccion.forEach(funko => {
      this.mostrarFunko(funko);
      console.log(chalk.gray('-------------------------'));
    });
  }

  mostrarInfoFunko(id: number): void {
    const funko = this._coleccion.find(item => item.ID === id);
    if (!funko) {
      console.error(chalk.red(`No existe un Funko con ID ${id}.`));
      return;
    }
    this.mostrarFunko(funko);
  }

  buscarID(id: number): boolean {
    const resultado = this._coleccion.find((funkoBusqueda) => funkoBusqueda.ID === id);
    if (resultado) {
      return true;
    }
    return false;
  }

  private mostrarFunko(funko: Funko): void {
    console.log(chalk.bold(`ID: ${funko.ID}`));
    console.log(`Nombre: ${funko.nombre}`);
    console.log(`Descripción: ${funko.descripcion}`);
    console.log(`Tipo: ${funko.tipo}`);
    console.log(`Género: ${funko.genero}`);
    console.log(`Franquicia: ${funko.franquicia}`);
    console.log(`Número en franquicia: ${funko.numeroFranquicia}`);
    console.log(`Exclusivo: ${funko.exclusivo ? 'Sí' : 'No'}`);
    console.log(`Características especiales: ${funko.caracteristicasEspeciales}`);
    console.log(`Valor de mercado: ${colorearValor(funko.valorDeMercado)}`);
  }
}
