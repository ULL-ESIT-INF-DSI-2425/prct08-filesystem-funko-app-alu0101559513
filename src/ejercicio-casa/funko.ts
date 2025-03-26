import chalk from "chalk";
enum TipoFunko {POP, RIDES, VYNILSODA, VYNILGOLD};
enum TipoGenero { ANIMACION, PELICULASYTV, VIDEOJUEGOS, DEPORTES, MUSICA, ANIME};
enum TipoFranquicia {THEBIGBANGTHEORY,GAMEOFTHRONES,SONICTHEHEDGEHOG, MARVEL};
type Funko = {
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
function colorearValor(valor: number): string {
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
class ColeccionFunkosPop {
  private _coleccion: Funko[];
  constructor(coleccionInicial: Funko[]) {
    this._coleccion = coleccionInicial;
  }
  añadirFunko(nuevoFunko: Funko): void {
    if (!this.buscarID(nuevoFunko.ID)){
      this._coleccion.push(nuevoFunko);
      console.log(chalk.green('Funko añadido con éxito'));
    } else {
      console.error(chalk.red('Ya existe un Funko con ese ID'));
    }
  }
  modificarFunko(modiFunko: Funko): void {
    if (this.buscarID(modiFunko.ID)){
      console.log(chalk.green('Funko modificado con éxito'));
    } else {
      console.error(chalk.red('No existe un Funko con ese ID, no se ha podido modificar'));
    }
  }
  eliminarFunko(elimFunko: Funko): void {
    if (this.buscarID(elimFunko.ID)) {
      const indice = this._coleccion.indexOf(elimFunko);
      this._coleccion.splice(indice,1);
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
      console.log(chalk.bold(`ID: ${funko.ID}`));
      console.log(`Nombre: ${funko.nombre}`);
      console.log(`Descripción: ${funko.descripcion}`);
      console.log(`Tipo: ${TipoFunko[funko.tipo]}`);
      console.log(`Género: ${TipoGenero[funko.genero]}`);
      console.log(`Franquicia: ${TipoFranquicia[funko.franquicia]}`);
      console.log(`Número en franquicia: ${funko.numeroFranquicia}`);
      console.log(`Exclusivo: ${funko.exclusivo ? 'Sí' : 'No'}`);
      console.log(`Características especiales: ${funko.caracteristicasEspeciales}`);
      console.log(`Valor de mercado: ${colorearValor(funko.valorDeMercado)}`);
      console.log(chalk.gray('-------------------------'));
    });
  }
  mostrarInfoFunko(id: number): void {
    const funko = this._coleccion.find(item => item.ID === id);
    if (!funko) {
      console.error(chalk.red(`No existe un Funko con ID ${id}.`));
      return;
    }
    console.log(chalk.bold(`ID: ${funko.ID}`));
    console.log(`Nombre: ${funko.nombre}`);
    console.log(`Descripción: ${funko.descripcion}`);
    console.log(`Tipo: ${TipoFunko[funko.tipo]}`);
    console.log(`Género: ${TipoGenero[funko.genero]}`);
    console.log(`Franquicia: ${TipoFranquicia[funko.franquicia]}`);
    console.log(`Número en franquicia: ${funko.numeroFranquicia}`);
    console.log(`Exclusivo: ${funko.exclusivo ? 'Sí' : 'No'}`);
    console.log(`Características especiales: ${funko.caracteristicasEspeciales}`);
    console.log(`Valor de mercado: ${colorearValor(funko.valorDeMercado)}`);
  }
  buscarID(id: number): boolean {
    const resultado = this._coleccion.find((funkoBusqueda) => funkoBusqueda.ID === id);
    if (resultado) {
      return true;
    }
    return false;
  }
}