// const fs = require("fs")
// const path = require ("path")

  
 function maximizarGananciasDinamica(accionesTotales, precioMinimo, numerocompradores, compradores) {
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


      export default function Dinamica(accionesTotales, precioMinimo, numerocompradores, compradores){
        let object = maximizarGananciasDinamica(accionesTotales, precioMinimo, numerocompradores, compradores);
        let solutionCost = object.ganancia;
        let solution = accionesComprador(accionesTotales, precioMinimo, numerocompradores, compradores, object.memo);
        let solutionCostString = JSON.stringify(solutionCost);
        let solutionString = JSON.stringify(solution);
        let mensaje = "Maxima Ganancia posible: "
        let result = mensaje.concat(solutionCostString," Distribucion de las acciones: ",solutionString)
        return result
      }

    //   let A = null;
    // let B = null;
    // let numOfertas = null;
    // let queries = [];

    // let filename = "resultadosDinamica.txt";
    // const writeFile = (name, content, index = 0,) => {
    //   fs.writeFile("./resultadosDinamica/"+name+".txt", content, {flag: "wx"}, (err) => {
    //     if(err){
    //       // filename = filename + index;
    //       index++
    //       writeFile(path.parse(filename).name + index, content, index);
    //     }
    //   })
    // }
    
    //  function leer(){
    //   const files = fs.readdirSync('./pruebas') 
    //   for(i=0; i<files.length; i++){
    //     fs.readFileSync("./pruebas/"+files[i], "utf8").toString().split(/\r?\n/).map((line, index) => {
    //       const lineArr = line.split(",");
    //       if (index == 0) {
    //         A = Number(lineArr[0]);  
    //       }else if (index == 1) {
    //         B = Number(lineArr[0]);
    //       }else if (index == 2) {
    //         numOfertas = Number(lineArr[0]);
    //       }else {
    //         queries.push(lineArr.map(n => {
    //           return Number(n)
    //         }))
    //       }
    //     });
    //     let object = maximizarGanancias(A, B,numOfertas,queries);
    //     let solutionCost = object.ganancia;
    //     let solution = accionesComprador(A,B,numOfertas,queries,object.memo);
    //     let solutionCostString = JSON.stringify(solutionCost);
    //     let solutionString = JSON.stringify(solution);
    //     let result = solutionCostString.concat(" ",solutionString)
    //     //console.log(result)
    //     writeFile("resultadosDinamica-" + path.parse(files[i]).name, result)
    //     A = null
    //     B = null
    //     numOfertas = null
    //     queries = []
    
    //   }
      
    // }
    
    // leer();
    // console.log(maximizarGanancias(A, B,n,arreglito).ganancia);
    // console.log(accionesComprador(A,B,n,arreglito,maximizarGanancias(A, B,n,arreglito).memo))