let A = 1000
let B = 100         
let arreglito = [[600,800,100],
                 [500,600,100],
                 [450,300,400],
                 [400,100,50],
                 [100,1000,0]]
let n = Object.keys(arreglito).length - 1
function fuerzaBruta(accionesTotales,compradores, arrayO){
    let x = []
    let precioGobierno = arrayO[arrayO.length-1][0];

        for(let i = 0; i < compradores; i++){
             var opcion = arrayO[i][1];
             var ganancia = 0;
             //var compradoresValidos = [opcion];
             //(arrayO[j][1] + opcion) <= accionesTotales
             for(let j = 0; j < compradores  ; j++){             
                if (arrayO[j][1] != opcion){
                    if((arrayO[j][1] + opcion) <= accionesTotales){
                        //compradoresValidos.push(arrayO[j][1]);
                        opcion += arrayO[j][1];
                        ganancia += arrayO[j][0] * arrayO[j][1];
                        
                    }
                } else if (arrayO[j][1] < accionesTotales){
                    ganancia = arrayO[j][0] * arrayO[j][1];
                    
                }
            } 
            if (opcion<=accionesTotales){
                faltante=accionesTotales - opcion;
                x.push(ganancia + (precioGobierno*faltante));
            }
        }
        ganancia = accionesTotales * precioGobierno;
        x.push(ganancia);

        var mejorGanancia = x[0];

        for (k = 0; k <= Object.keys(x).length; k++){
            if( mejorGanancia < x[k]){
                mejorGanancia = x[k];
            }
        }
        
        return mejorGanancia;
}

console.log(fuerzaBruta(A,n,arreglito));

