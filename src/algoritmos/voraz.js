

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
// const fs = require("fs")
// const path = require ("path")

function maximizarGananciasVoraz(accionesTotales, precioMinimo,numerocompradores, compradores) {
  // ordenar los compradores por ganancia por acción en orden decreciente
  let gananciaTotal = 0;
  let detallesCompra = [];
  let solution=[];

  for (let i = 0; i < numerocompradores && accionesTotales >= 0; i++) {
    const comprador = compradores[i];
    const comprador_siguiente = compradores[i+1]
    let accionesCompradas = 0
    let montoTotalPagado = 0
    
    for (let j = 0; j < comprador[1]; j++) {
      const accion = comprador[0];
      
      if ( i < numerocompradores - 1){
        if (((accionesTotales-comprador[2])>comprador_siguiente[2]) && ((accionesTotales-accionesCompradas) <= comprador_siguiente[2]) && ((accionesTotales-comprador[1]) >= 0)) {
          break;
          }
        
        }
      if (accionesTotales - accionesCompradas <= 0) {
          break;
      }
      accionesCompradas++;
      montoTotalPagado += accion;
      
      
      
      
    }

    if (accionesCompradas < comprador[2]) {
      detallesCompra[i]=0;
      continue;
      
  }
    

    accionesTotales -= accionesCompradas;
    //const montoTotalPagado = accionesCompradas * comprador[0];
    gananciaTotal += montoTotalPagado;
    detallesCompra[i]=accionesCompradas;
  }
  solution[0]=gananciaTotal;
  solution[1]=detallesCompra
  return solution;
}


export default function Voraz(accionesTotales,precioMinimio,numerocompradores,arrayO){
  let object = maximizarGananciasVoraz(accionesTotales,precioMinimio,numerocompradores,arrayO)
  let solution = object[1]
  let solutionCost = object[0]
  let solutionCostString = JSON.stringify(solutionCost);
  let solutionString = JSON.stringify(solution);
  let mensaje = "Maxima Ganancia posible: "
  let result = mensaje+solutionCostString+" Distribucion de las acciones: "+"\n"+ solutionString
  return result
}