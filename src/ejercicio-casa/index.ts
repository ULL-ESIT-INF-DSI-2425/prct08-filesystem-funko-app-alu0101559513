import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Funko, TipoFunko, TipoGenero, TipoFranquicia, ColeccionFunkosPop } from './funko.js';
yargs(hideBin(process.argv))
  .command('add', 'Add a new Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    desc: { type: 'string', demandOption: true },
    type: { type: 'string', choices: Object.values(TipoFunko), demandOption: true },
    genre: { type: 'string', choices: Object.values(TipoGenero), demandOption: true },
    franchise: { type: 'string', choices: Object.values(TipoFranquicia), demandOption: true },
    franchiseNumber: { type: 'number', demandOption: true },
    exclusive: { type: 'boolean', demandOption: true },
    specialFeatures: { type: 'string', demandOption: true },
    marketValue: { type: 'number', demandOption: true }
  }, (args) => {
    const funko: Funko = {
      ID: args.id,
      nombre: args.name,
      descripcion: args.desc,
      tipo: args.type as TipoFunko,
      genero: args.genre as TipoGenero,
      franquicia: args.franchise as TipoFranquicia,
      numeroFranquicia: args.franchiseNumber,
      exclusivo: args.exclusive,
      caracteristicasEspeciales: args.specialFeatures,
      valorDeMercado: args.marketValue
    };

    const coleccion = new ColeccionFunkosPop(args.user);
    coleccion.cargarColeccion(() => {
      coleccion.añadirFunko(funko);
    });
  })

  .command('update', 'Update an existing Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    desc: { type: 'string', demandOption: true },
    type: { type: 'string', choices: Object.values(TipoFunko), demandOption: true },
    genre: { type: 'string', choices: Object.values(TipoGenero), demandOption: true },
    franchise: { type: 'string', choices: Object.values(TipoFranquicia), demandOption: true },
    franchiseNumber: { type: 'number', demandOption: true },
    exclusive: { type: 'boolean', demandOption: true },
    specialFeatures: { type: 'string', demandOption: true },
    marketValue: { type: 'number', demandOption: true }
  }, (args) => {
    const funko: Funko = {
      ID: args.id,
      nombre: args.name,
      descripcion: args.desc,
      tipo: args.type as TipoFunko,
      genero: args.genre as TipoGenero,
      franquicia: args.franchise as TipoFranquicia,
      numeroFranquicia: args.franchiseNumber,
      exclusivo: args.exclusive,
      caracteristicasEspeciales: args.specialFeatures,
      valorDeMercado: args.marketValue
    };

    const coleccion = new ColeccionFunkosPop(args.user);
    coleccion.cargarColeccion(() => {
      coleccion.modificarFunko(funko);
    });
  })

  .command('remove', 'Remove a Funko by ID', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
  }, (args) => {
    const coleccion = new ColeccionFunkosPop(args.user);
    coleccion.cargarColeccion(() => {
      coleccion.eliminarFunko(args.id);
    });
  })

  .command('list', 'List all Funkos from a user', {
    user: { type: 'string', demandOption: true }
  }, (args) => {
    const coleccion = new ColeccionFunkosPop(args.user);
    coleccion.cargarColeccion(() => {
      coleccion.listarFunkos();
    });
  })

  .command('read', 'Read a Funko by ID', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true }
  }, (args) => {
    const coleccion = new ColeccionFunkosPop(args.user);
    coleccion.cargarColeccion(() => {
      coleccion.mostrarInfoFunko(args.id);
    });
  })

  .help()
  .argv;
