
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
const fs = require("fs")
const path = require ("path")

function maximizarGanancias(accionesTotales, precioMinimo,numerocompradores, compradores) {
    // ordenar los compradores por ganancia por acción en orden decreciente
    let gananciaTotal = 0;
    let detallesCompra = [];
  
    for (let i = 0; i < numerocompradores && accionesTotales >= 0; i++) {
      const comprador = compradores[i];
      const comprador_siguiente = compradores[i+1]
      let accionesCompradas = 0
      let montoTotalPagado = 0
      
      for (let j = 0; j < comprador[1]; j++) {
        const accion = comprador[0];
        if ( i < numerocompradores - 1){
        if (j > comprador_siguiente[0]) {
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
        detallesCompra.push({
            comprador: i,
            accionesCompradas: 0,
            montoPagado: 0
          });
        continue;
        
    }
      
  
      accionesTotales -= accionesCompradas;
      //const montoTotalPagado = accionesCompradas * comprador[0];
      gananciaTotal += montoTotalPagado;
      detallesCompra.push({
        comprador: i,
        accionesCompradas: accionesCompradas,
        montoPagado: montoTotalPagado
      });
    }
  
    return {
      ganancia: gananciaTotal,
      detallesCompra: detallesCompra
    };
  }
  let A = null;
  let B = null;
  //let numOfertas = null;
  let queries = [];
  
  
  let filename = "ResultadosVoraz.txt";
  const writeFile = (name, content, index = 0,) => {
    const fileName = index === 0 ? name : `${name}(${index})`;
    const filePath = path.join('./ResultadosVoraz', `${fileName}.txt`);
    if (fs.existsSync(filePath)) {
      writeFile(name, content, index + 1);
    } else {
      fs.writeFileSync(filePath, content, {flag: "w"});
    }
  }
  
  function leerVoraz(){
    const files = fs.readdirSync('./pruebasVoraz') 
    for(i=0; i<files.length; i++){
      fs.readFileSync("./pruebasVoraz/"+files[i], "utf8").toString().split(/\r?\n/).map((line, index) => {
        const lineArr = line.split(",");
        //console.log(lineArr)
        if (index == 0) {
          A = Number(lineArr[0]);  
        }else if (index == 1) {
          B = Number(lineArr[0]);
        }else if (index == 2) {
          numOfertas = lineArr[0];
        }else {
          queries.push(lineArr.map(n => {
            return Number(n)
          }))
        }
      });
  
      let result = maximizarGanancias(A, B,numOfertas,queries);
      console.log(result)
      let resultString = JSON.stringify(result);
      writeFile("resultadosVoraz-" + path.parse(files[i]).name, resultString)
  
      queries = []
      A = null
      B = null
      numOfertas = null
  
    }
    
  }
  
  leerVoraz();
  //console.log(maximizarGanancias(A, B,n,arreglito))

//346