// const fs = require("fs")
// const path = require ("path")

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


 function maximizarGananciasPaquetes(accionesTotales, precioMinimo, numerocompradores, compradores, paquete) {

    var memo = Array(numerocompradores);
    for (let i = 0; i < numerocompradores; i++){
        memo[i]= Array(accionesTotales/paquete).fill(undefined);
    }
    let acciones_paquete=accionesTotales/paquete;
    const solucionOptima = costoSolucion(acciones_paquete, precioMinimo, numerocompradores, compradores, memo, 0, paquete);
    return {ganancia: solucionOptima.ganancia, memo: solucionOptima.memo};
  }
  
  function costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, i, paquete) {
        
        if (i == numerocompradores) {
            return { ganancia: accionesTotales * precioMinimo*paquete, memo: memo};
        }
  
        if (memo[i][accionesTotales] !== undefined) {
          return { ganancia: memo[i][accionesTotales], memo:memo};
        }
  
        let mejorGanancia = { ganancia: 0, memo:memo};
        let opciones = [];
      
        
        opciones.push(
            (compradores[i][0] * 0 * paquete) + 
            costoSolucion(accionesTotales, precioMinimo, numerocompradores, compradores, memo, i+1,paquete).ganancia
        );
        for (let j = (compradores[i][2]/paquete);  j <= Math.min((compradores[i][1]/paquete), accionesTotales); j++) {
            
              //console.log("holaa")
                opciones.push(
                    (compradores[i][0] * j * paquete) + 
                    costoSolucion(accionesTotales - j, precioMinimo, numerocompradores, compradores, memo, i+1,paquete).ganancia
                ); 
                
            
           
            
        }
        
        mejorGanancia = { ganancia:Math.max(...opciones), memo:memo};
        memo[i][accionesTotales]=mejorGanancia.ganancia;
        
        return mejorGanancia;
    }

    function accionesComprador(accionesTotales, precioMinimo, numerocompradores, compradores, memo, paquete) {
        const compras = Array(numerocompradores).fill(0);
        let accionesRestantes = accionesTotales/paquete;
        for (let i = 0; i < numerocompradores; i++) {
          for (let j = (compradores[i][2]/paquete);  j <= Math.min((compradores[i][1]/paquete), accionesTotales/paquete); j++) {
            if (i < numerocompradores-1) {
            if (memo[i][accionesRestantes] === compradores[i][0] *paquete *j + memo[i+1][accionesRestantes-j]) {
                console.log("Estoy entrando")
              compras[i] += j;
              accionesRestantes -= j;
              break;
            }
        }
        if(i == numerocompradores-1){
          compras[i] = accionesRestantes
        }
          }
        }
        
        return compras;
      }

    export default function accionesPD2(accionesTotales,precioMinimo,numerocompradores,arrayO,paquete){
        let object = maximizarGananciasPaquetes(accionesTotales,precioMinimo,numerocompradores,arrayO,paquete)
        let solution = accionesComprador(accionesTotales, precioMinimo, numerocompradores, arrayO, object.memo,paquete)
        let solutionCost = object.ganancia
        let solutionCostString = JSON.stringify(solutionCost);
        let solutionString = solution[0];
        
        for (let i = 1; i < solution.length; i++) {
          solutionString += "\n" + solution[i];
       }
       

        let result =  solutionCostString + "\n" + solutionString;


        return result
    }
    // let A = null;
    // let B = null;
    // let numOfertas = null;
    // let p=null;
    // let queries = [];

    // let filename = "resultadosPaquetes.txt";
    // const writeFile = (name, content, index = 0,) => {
    //   fs.writeFile("./resultadosPaquetes/"+name+".txt", content, {flag: "wx"}, (err) => {
    //     if(err){
    //       // filename = filename + index;
    //       index++
    //       writeFile(path.parse(filename).name + index, content, index);
    //     }
    //   })
    // }
    
    // function leer(){
    //   const files = fs.readdirSync('./pruebasPaquetes') 
    //   for(i=0; i<files.length; i++){
    //     fs.readFileSync("./pruebasPaquetes/"+files[i], "utf8").toString().split(/\r?\n/).map((line, index) => {
    //       const lineArr = line.split(",");
    //       if (index == 0) {
    //         A = Number(lineArr[0]);  
    //       }else if (index == 1) {
    //         B = Number(lineArr[0]);
    //       }else if (index == 2) {
    //         numOfertas = Number(lineArr[0]);
    //       }else if(index==(3+numOfertas)){
    //         p= Number(lineArr[0])
    //       }
    //       else {
    //         queries.push(lineArr.map(n => {
    //           return Number(n)
    //         }))
    //       }
    //     });
    //     let result = maximizarGanancias(A, B,numOfertas,queries,p);
    //     let resultString = JSON.stringify(result);
    //     writeFile("resultadosPaquetes-" + path.parse(files[i]).name, resultString)
    //     A = null
    //     B = null
    //     numOfertas = null
    //     p=null
    //     queries = []
    
    //   }
      
    // }
    
    // leer();
//9.471E7
//94710000.
   // console.log(maximizarGanancias(A, B,n,arreglito, p));