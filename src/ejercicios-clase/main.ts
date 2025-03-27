import { watch, mkdir, access, copyFile, stat, rename } from "fs";
import path from "path";
const filenName = process.argv[2];
const filenName2 = process.argv[3];
const dirpath = path.join(
  "/home/usuario/prct08-filesystem-funko-app-alu0101559513",
  filenName,
);
const dirpathout = path.join(
  "/home/usuario/prct08-filesystem-funko-app-alu0101559513",
  filenName2,
);
console.log(dirpath);
watchMonitor(dirpath, dirpathout);
/**
 * Función que monitorea el directorio
 * @param dirpath - ruta de origen
 * @param dirpathsecurity - ruta de destino
 */
function watchMonitor(dirpath: string, dirpathsecurity: string) {
  access(dirpath, (err) => {
    if (!err) {
      console.error("The dir already exists");
      return;
    }
    mkdir(dirpath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating dir: ${err.message}`);
        return;
      }
    });
  });
  access(dirpathout, (err) => {
    if (!err) {
      console.error("The dir already exists");
      return;
    }
    mkdir(dirpathout, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating dir: ${err.message}`);
        return;
      }
    });
  });
  watch(dirpath, { recursive: true }, (change, filename) => {
    if (filename) {
      console.log(`Directorio: ${filename}`);
      if (change === "change") {
        commit(dirpath, dirpathout, filename);
      }
    } else {
      console.log("No exite fichero a examinar");
    }
  });
}
/**
 * Realiza la copia en el directorio de destino
 * @param dirpath - ruta de origen
 * @param dirpathout - ruta de destino
 * @param filename  - fichero a copiar
 */
function commit(dirpath: string, dirpathout: string, filename: string) {
  let mytime: Date;
  stat(dirpath, (err, stats) => {
    mytime = stats.mtime;
  });
  copyFile(dirpath, dirpathout, (err) => {
    if (err) {
      console.log("No se ha podido copiar el fichero");
    }
    /*rename (dirpathout,  ,(err) => {
      if (err) throw err;
      console.log('Rename complete!');
    }); 
     
    console.log(dirout);*/
    console.log("source was copied to destination");
  });
}
