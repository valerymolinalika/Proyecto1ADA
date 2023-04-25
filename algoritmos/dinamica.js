const fs = require("fs")
const path = require ("path")
// let arreglito = [
//     [52, 7842, 3241],
//     [50, 4555, 2659],
//     [35, 9923, 2990],
//     [23, 5062, 66],
//     [17, 3708, 1763],
//     [7, 10000, 0]
//   ];
//   let A = 10000;
//   let B = 7;
//   let n=6;

// let arreglito = [
//     [4270, 3, 1],
//     [3741, 9, 9],
//     [2805, 3, 0],
//     [2700, 9, 6],
//     [2688, 4, 0],
//     [2619, 5, 3],
//     [2441, 8, 7],
//     [2015, 2, 1],
//     [1991, 6, 2],
//     [1984, 2, 0],
//     [1866, 8, 5],
//     [1459, 4, 1],
//     [1366, 5, 5],
//     [1331, 1, 1],
//     [1258, 0, 0],
//     [1188, 10, 4],
//     [1177, 1, 0],
//     [684, 2, 2],
//     [595, 4, 1],
//     [490, 3, 1],
//     [450, 10, 0]
// ];

// let A = 10;
// let B = 450;
// let n= 21;
// let arreglito = [[52,6,2],
// [33,10,3],
// [23,0,0],
// [17,2,0],
// [7,6,0],
// [7,10,0],
// ]
// let A = 10;
// let B = 7;
// let n = 6;
  
  function maximizarGanancias(accionesTotales, precioMinimo, numerocompradores, compradores) {
    var memo = Array(numerocompradores);
    for (let i = 0; i < numerocompradores; i++) {
        memo[i] = Array(accionesTotales - compradores[i][2] + 1).fill(undefined);
    }
    const solucionOptima = costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, 0);
    return { ganancia: solucionOptima.ganancia, memo: solucionOptima.memo };

  }
  
  function costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, i) {
        if (i == numerocompradores) {
            return { ganancia: accionesTotales * precioMinimo, memo: memo };
        }
  
        if (memo[i][accionesTotales] !== undefined) {
          return { ganancia: memo[i][accionesTotales], memo: memo };
        }
  
        let mejorGanancia = { ganancia: 0, memo: memo };
        let opciones = [];
      
        
        opciones.push(
            compradores[i][0] * 0 + 
            costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, i+1).ganancia
        );
        for (let j = compradores[i][2];  j <= Math.min(compradores[i][1], accionesTotales); j++) {
            opciones.push(
                compradores[i][0] * j + 
                costoSolucion(accionesTotales - j, precioMinimo, numerocompradores, compradores, memo, i+1).ganancia
            );
            
        }
        mejorGanancia = { ganancia: Math.max(...opciones), memo: memo }
        memo[i][accionesTotales]= mejorGanancia.ganancia;
        return mejorGanancia;
    }
  
    function accionesComprador(accionesTotales, precioMinimo, numerocompradores, compradores, memo) {
        const compras = Array(numerocompradores).fill(0);
        let accionesRestantes = accionesTotales;
        
        for (let i = 0; i < numerocompradores; i++) {
          for (let j = compradores[i][2];  j <= Math.min(compradores[i][1], accionesTotales); j++) {
            if (i < numerocompradores-1) {
            if (memo[i][accionesRestantes] === compradores[i][0] * j + memo[i+1][accionesRestantes-j]) {
              compras[i] += j;
              accionesRestantes -= j;
              break;
            }
        }
          }
        }
        
        return compras;
      }

      let A = null;
    let B = null;
    let numOfertas = null;
    let queries = [];

    let filename = "resultadosDinamica.txt";
    const writeFile = (name, content, index = 0,) => {
      fs.writeFile("./resultadosDinamica/"+name+".txt", content, {flag: "wx"}, (err) => {
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
          if (index == 0) {
            A = Number(lineArr[0]);  
          }else if (index == 1) {
            B = Number(lineArr[0]);
          }else if (index == 2) {
            numOfertas = Number(lineArr[0]);
          }else {
            queries.push(lineArr.map(n => {
              return Number(n)
            }))
          }
        });
        let object = maximizarGanancias(A, B,numOfertas,queries);
        let solutionCost = object.ganancia;
        let solution = accionesComprador(A,B,numOfertas,queries,object.memo);
        let solutionCostString = JSON.stringify(solutionCost);
        let solutionString = JSON.stringify(solution);
        let result = solutionCostString.concat(" ",solutionString)
        //console.log(result)
        writeFile("resultadosDinamica-" + path.parse(files[i]).name, result)
        A = null
        B = null
        numOfertas = null
        queries = []
    
      }
      
    }
    
    leer();
    // console.log(maximizarGanancias(A, B,n,arreglito).ganancia);
    // console.log(accionesComprador(A,B,n,arreglito,maximizarGanancias(A, B,n,arreglito).memo))