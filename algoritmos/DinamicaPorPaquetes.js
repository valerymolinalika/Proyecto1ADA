const fs = require("fs")
const path = require ("path")

// let arreglito = [
//     [951,90000,70000],
//     [912,10000,10000],
//     [885,70000,30000],
//     [817,100000,80000],
//     [777,90000,0],
//     [608,50000,40000],
//     [308,90000,10000],
//     [261,40000,0],
//     [248,30000,20000],
//     [233,100000,10000],
//     [100,100000,0],
//   ];
//   let A = 100000;
//   let B = 100;
//   let n=11;
//   let p= 10000;
  
//   9.471E7


function maximizarGanancias(accionesTotales, precioMinimo, numerocompradores, compradores, paquete) {

    var memo = Array(numerocompradores).fill().map(()=>Array(accionesTotales/paquete).fill())
    acciones_paquete=accionesTotales/paquete;
    return costoSolucion(acciones_paquete, precioMinimo, numerocompradores, compradores, memo, 0, paquete);

  }
  
  function costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, i, paquete) {
        
        if (i == numerocompradores) {
            //console.log(accionesTotales)
            return accionesTotales * precioMinimo*paquete;
        }
  
        if (memo[i][accionesTotales] !== undefined) {
          return memo[i][accionesTotales];
        }
  
        let mejorGanancia = 0;
        let opciones = [];
      
        
        opciones.push(
            (compradores[i][0] * 0 * paquete) + 
            costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, i+1,paquete)
        );
        for (let j = (compradores[i][2]/paquete);  j <= Math.min((compradores[i][1]/paquete), accionesTotales); j++) {
            
              //console.log("holaa")
                opciones.push(
                    (compradores[i][0] * j * paquete) + 
                    costoSolucion(accionesTotales - j, precioMinimo, numerocompradores, compradores, memo, i+1,paquete)
                ); 
                
            
           
            
        }
        
        mejorGanancia = Math.max(...opciones);
        memo[i][accionesTotales]=mejorGanancia;
        
        return mejorGanancia;
    }
    let A = null;
    let B = null;
    let numOfertas = null;
    let p=null;
    let queries = [];

    let filename = "resultadosPaquetes.txt";
    const writeFile = (name, content, index = 0,) => {
      fs.writeFile("./resultadosPaquetes/"+name+".txt", content, {flag: "wx"}, (err) => {
        if(err){
          // filename = filename + index;
          index++
          writeFile(path.parse(filename).name + index, content, index);
        }
      })
    }
    
    function leer(){
      const files = fs.readdirSync('./pruebasPaquetes') 
      for(i=0; i<files.length; i++){
        fs.readFileSync("./pruebasPaquetes/"+files[i], "utf8").toString().split(/\r?\n/).map((line, index) => {
          const lineArr = line.split(",");
          if (index == 0) {
            A = Number(lineArr[0]);  
          }else if (index == 1) {
            B = Number(lineArr[0]);
          }else if (index == 2) {
            numOfertas = Number(lineArr[0]);
          }else if(index==(3+numOfertas)){
            p= Number(lineArr[0])
          }
          else {
            queries.push(lineArr.map(n => {
              return Number(n)
            }))
          }
        });
        let result = maximizarGanancias(A, B,numOfertas,queries,p);
        let resultString = JSON.stringify(result);
        writeFile("resultadosPaquetes-" + path.parse(files[i]).name, resultString)
        A = null
        B = null
        numOfertas = null
        p=null
        queries = []
    
      }
      
    }
    
    leer();
//9.471E7
//94710000.
   // console.log(maximizarGanancias(A, B,n,arreglito, p));