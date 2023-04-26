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
        } if (i == numerocompradores - 1){
           compras[i] = accionesRestantes;
           
         }
          }
        }
        console.log(compras)
        return compras;
      }


      export default function accionesPD1(accionesTotales, precioMinimo, numerocompradores, compradores){
        let object = maximizarGananciasDinamica(accionesTotales, precioMinimo, numerocompradores, compradores);
        let solutionCost = object.ganancia;
        let solution = accionesComprador(accionesTotales, precioMinimo, numerocompradores, compradores, object.memo);
        //console.log(solution);
        let solutionCostString = JSON.stringify(solutionCost);
        let solutionString = solution[0];
        
        for (let i = 1; i < solution.length; i++) {
          solutionString += "\n" + solution[i];
       }
       


        let result =  solutionCostString + "\n" + solutionString;
        return result
      }
