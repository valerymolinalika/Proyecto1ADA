let A = 1000
let B = 100         
let arreglito = [[500, 600, 400],[450, 400, 100],[400, 400, 100],
    [200, 200, 50],[100, 1000, 0]]
    
let n = Object.keys(arreglito).length - 1



function fuerzaBruta(accionesTotales, compradores, arrayO) {
    let x = [];
    let precioGobierno = arrayO[arrayO.length - 1][0];
    let combinaciontotal = [];
    
  
    for (let i = 0; i < compradores + 1; i++) {
        let combinaciontransi = [];  
  
      for (let w = 0; w < compradores + 1; w++) {
        combinaciontransi.push(0);
      }
  
      let opcionActual = arrayO[i][1];
      let gananciaActual = arrayO[i][0] * arrayO[i][1];
      combinaciontransi[i] = arrayO[i][1];
  
      for (let j = i + 1; j < compradores + 1; j++) {
        let opcion = opcionActual;
        let ganancia = gananciaActual;
        let combinacion = combinaciontransi.slice();
  
        if ((arrayO[j][1] + opcion) <= accionesTotales) {
          opcion += arrayO[j][1];
          ganancia += arrayO[j][0] * arrayO[j][1];
          combinacion[j] = arrayO[j][1];
  
          if (opcion == accionesTotales) {
            x.push(ganancia);
            combinaciontotal.push(combinacion);

          }
        }
        
      }
      console.log("iteracion " + i + " " + opcionActual)
      if (opcionActual < accionesTotales) {
        let faltante = accionesTotales - opcionActual;
        combinaciontransi[compradores] = faltante;
        let ganancia = precioGobierno * faltante;
        x.push(gananciaActual + ganancia);
        combinaciontotal.push(combinaciontransi);
      }
    }

    ganancia = accionesTotales * precioGobierno;
    x.push(ganancia);
    let combinacions=[];
    for (let w = 0; w < compradores + 1; w++) {
        combinacions.push(0);
      }
    combinacions[compradores]=1000
    combinaciontotal.push(combinacions);
    
    
    let mejorGanancia = x[0];
  
    for (let k = 1; k < x.length; k++) {
      if (mejorGanancia < x[k]) {
        mejorGanancia = x[k];
      }
    }
    console.log(mejorGanancia);
    console.log(combinaciontotal);
    return x;
  }
  
  console.log(fuerzaBruta(A, n, arreglito));