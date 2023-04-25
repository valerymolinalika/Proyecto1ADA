
// const fs = require("fs")
// const path = require ("path")



 function maximizarGananciasFuerzaBruta(accionesTotales,precioMinimo, compradores, arrayO) {
  let x = [];
  let precioGobierno = arrayO[arrayO.length - 1][0];
  let combinaciontotal = [];
  let mejorCombinacion = [];
  
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

      if (ganancia === Math.max(...x)) {
        mejorCombinacion = combinaciontransi;
      }
    }
  }

  
  return { ganancia: Math.max(...x), combinacion: mejorCombinacion };
}

export default function fuerzaBruta(accionesTotales,precioMinimio,numerocompradores,arrayO){
    let object = maximizarGananciasFuerzaBruta(accionesTotales,precioMinimio,numerocompradores,arrayO)
    let solution = object.combinacion
    let solutionCost = object.ganancia
    let solutionCostString = JSON.stringify(solutionCost);
    let solutionString = JSON.stringify(solution);
    let mensaje = "Maxima Ganancia posible: "
    let result = mensaje.concat(solutionCostString," Distribucion de las acciones: ",solutionString)
    return result
}
// let A = null;
// let B = null;
// let numOfertas = null;
// let queries = [];


// let filename = "resultadoFuerzaBruta.txt";
// const writeFile = (name, content, index = 0,) => {
//   const fileName = index === 0 ? name : `${name}(${index})`;
//   const filePath = path.join('./ResultadosFuerzaBruta', `${fileName}.txt`);
//   if (fs.existsSync(filePath)) {
//     writeFile(name, content, index + 1);
//   } else {
//     fs.writeFileSync(filePath, content, {flag: "w"});
//   }
// }

// function leerFuerzaBruta(){
//   const files = fs.readdirSync('./pruebasFuerzaBruta') 
//   for(i=0; i<files.length; i++){
//     fs.readFileSync("./pruebasFuerzaBruta/"+files[i], "utf8").toString().split(/\r?\n/).map((line, index) => {
//       const lineArr = line.split(",");
//       //console.log(lineArr)
//       if (index == 0) {
//         A = lineArr[0];  
//       }else if (index == 1) {
//         B = lineArr[0];
//       }else if (index == 2) {
//         numOfertas = lineArr[0];
//       }else {
//         queries.push(lineArr.map(n => {
//           return Number(n)
//         }))
//       }
//     });

//     let result = fuerzaBruta(A, B, numOfertas, queries);
//     let resultString = JSON.stringify(result);
//     writeFile("resultadoFuerzaBruta-" + path.parse(files[i]).name, resultString)

//     queries = []
//     A = null
//     B = null
//     numOfertas = null

//   }
  
// }

// leerFuerzaBruta();


