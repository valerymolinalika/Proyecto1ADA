let A = 1000;
let arreglito = [  [500, 600, 400],
  [450, 400, 100],
  [400, 400, 100],
  [200, 200, 50],
  [100, 1000, 0],
];
// [[500, 600, 400], [450, 400, 100],[100, 1000, 0]]
let n = arreglito.length - 1;

function MemoizedMatrixSPA (compradores,accionesTotales,arrayO){
  var matrix = new Array(compradores+1);

  for (let i = 0 ; i< compradores + 1;i++){
    matrix[i]=new Array(compradores + 1)
    for(let j = 0 ; j < compradores + 1; j++){
      matrix[i][j] = 0
    }
  }

  return costoSolucion(matrix,accionesTotales,arrayO,0,compradores)
}


function costoSolucion (matriz,accionesTotales,arrayO,i,j){
        let B = 100
        let q = 0
        let vx = [0,0]

        if(arrayO[i][1] > arrayO[j][1]){
          vx[0] = arrayO[i][1] * arrayO[i][0]
        }else{
          vx[0] = arrayO[j][1] * arrayO[j][0]
        }

        if (i == j){
          
          matriz[i][j] = accionesTotales * B
        }else{
          
          for( var k=i;k<=j-1;k++){
            
            q = Math.max(costoSolucion(matriz,accionesTotales,arrayO,i,k)[0], costoSolucion(matriz,accionesTotales,arrayO,k+1,j)[0]) 
           
            if (q > matriz[i][j]){
              
              matriz[i][j] = q
            }

          }
        }

        vx[1] = matriz
        return vx

}


function recorrerMatriz(func,compradores){
  let opcion = 0;
  for(let i = 0; i < compradores; i ++){
    for(let j = 0; j < compradores; j ++){
      if(func[i][j] > opcion){
        opcion = func[i][j]
      }
    }  
  }
  return opcion
}
console.log(recorrerMatriz(MemoizedMatrixSPA(n,A,arreglito)[1], n))

