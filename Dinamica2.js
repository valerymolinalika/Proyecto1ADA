const fs = require("fs")
const path = require ("path")

// let arreglito = [[52,6,2],
// [33,10,3],
// [23,0,0],
// [17,2,0],
// [7,6,0],
// [7,10,0],
// ]
// let A = 10;
// let B = 7;

function maximizarGanancias(accionesTotales, precioMinimo, compradores) {
    const memo = [];
    
    const gananciaOptima = costoSolucion(accionesTotales, precioMinimo, compradores, [...memo]);
    return gananciaOptima;
  }
  
  function costoSolucion(accionesTotales, precioMinimo, compradores, memo) {
      if (accionesTotales <= 0) {
        return 0;
      }
    
      if (memo[accionesTotales] !== undefined) {
        return memo[accionesTotales];
      }
    
      let mejorGanancia = 0;
    
      for (let i = 0; i < compradores.length; i++) {
        const comprador = compradores[i];
    
        let accionesCompradas = 0;
        let ganancia = 0;
    
        for (let j = 0; j < comprador[1]; j++) {
          const accion = comprador[0];
          if (accionesTotales - accionesCompradas <= 0) {
            break;
          }
          accionesCompradas++;
          ganancia += accion;
        }
    
        if (ganancia >= precioMinimo) {
          compradores.splice(i, 1);
          const gananciaRestante = costoSolucion(
            accionesTotales - accionesCompradas,
            precioMinimo,
            compradores,
            memo
          );
          mejorGanancia = Math.max(mejorGanancia, ganancia + gananciaRestante);
          compradores.splice(i, 0, comprador);
        }
      }
    
      memo[accionesTotales] = mejorGanancia;
      return mejorGanancia;
    }
  
    let A = null;
    let B = null;
    //let numOfertas = null;
    let queries = [];
    
    
    let filename = "resultadoDinamica.txt";
    const writeFile = (name, content, index = 0,) => {
      fs.writeFile("./ResultadosDinamica/"+name+".txt", content, {flag: "wx"}, (err) => {
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
            //numOfertas = lineArr[0];
          }else {
            queries.push(lineArr.map(n => {
              return Number(n)
            }))
          }
        });
    
        let result = maximizarGanancias(A, B, queries);
        let resultString = JSON.stringify(result);
        writeFile("resultadoDinamica-" + path.parse(files[i]).name, resultString)
    
        queries = []
        A = null
        B = null
        //numOfertas = null
    
      }
      
    }
    
    leer();