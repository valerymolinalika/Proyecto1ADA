const fs = require("fs")
const path = require ("path")

// let A = 1000;
// let arreglito = [  [500, 600, 400],
//   [450, 400, 100],
//   [400, 400, 100],
//   [200, 200, 50],
//   [100, 1000, 0],
// ];
//let B = 100
// [[500, 600, 400], [450, 400, 100],[100, 1000, 0]]
//let n = arreglito.length - 1;

function fuerzaBruta(accionesTotales,precioMinimo, compradores, arrayO) {
    let x = [];
    let precioGobierno = arrayO[arrayO.length - 1][0];
    let combinaciontotal = [];
  
    for (let i = 0; i < Math.pow(2, arrayO.length - 1); i++) {
      let combinaciontransi = [];
      let opcion = 0;
  
      for (let j = 0; j < arrayO.length - 1; j++) {
        if ((i / Math.pow(2, j)) % 2 >= 1) {
          opcion += arrayO[j][1];
          combinaciontransi[j] = arrayO[j][1];
        } else {
          combinaciontransi[j] = 0;
        }
  
        if (opcion > accionesTotales) {
          break;
        }
      }
  
      if (opcion <= accionesTotales) {
        const faltante = accionesTotales - opcion;
        combinaciontransi[arrayO.length - 1] = faltante >= 0 ? faltante : 0;
  
        const ganancia = combinaciontransi.reduce((acc, curr, idx) => {
          return acc + curr * arrayO[idx][0];
        }, 0);
  
        x.push(ganancia);
        combinaciontotal.push(combinaciontransi);
      }
    }
  
    const mejorGanancia = Math.max(...x);
    console.log(mejorGanancia)
    return mejorGanancia;
  }

let A = null;
let B = null;
let numOfertas = null;
let queries = [];


let filename = "resultadoFuerzaBruta.txt";
const writeFile = (name, content, index = 0,) => {
  fs.writeFile("./ResultadosFuerzaBruta/"+name+".txt", content, {flag: "wx"}, (err) => {
    if(err){
      // filename = filename + index;
      index++
      writeFile(path.parse(filename).name + index, content, index);
    }
  })
}

function leer(){
  const files = fs.readdirSync('./pruebas') 
  for(i=0; i<files.length; i++){
    fs.readFileSync("./pruebas/"+files[i], "utf8").toString().split(/\r?\n/).map((line, index) => {
      const lineArr = line.split(",");
      //console.log(lineArr)
      if (index == 0) {
        A = lineArr[0];  
      }else if (index == 1) {
        B = lineArr[0];
      }else if (index == 2) {
        numOfertas = lineArr[0];
      }else {
        queries.push(lineArr.map(n => {
          return Number(n)
        }))
      }
    });

    let result = fuerzaBruta(A, B, numOfertas, queries);
    let resultString = JSON.stringify(result);
    writeFile("resultadoFuerzaBruta-" + path.parse(files[i]).name, resultString)

    queries = []
    A = null
    B = null
    numOfertas = null

  }
  
}

leer();


//console.log(fuerzaBruta(A,B, n, arreglito));