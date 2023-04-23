let A = 1000;
let arreglito = [[500, 600, 400],
[450, 400, 100],
[400, 400, 100],
[200, 200, 50],
[100, 1000, 0],
];
let B = 100
//[[500, 600, 400], [450, 400, 100],[100, 1000, 0]]
let n = arreglito.length - 1;


function Dinamica(accionesTotales, precioMinimo, compradores, arrayO) {
    var matrix = new Array(compradores);

    for (let i = 0; i < compradores; i++) {
        matrix[i] = new Array(compradores);
        for (let j = 0; j < compradores; j++) {
            matrix[i][j] = 0;
        }
    }

    return costoSolucion(matrix, accionesTotales, arrayO, 0, compradores);
}

function costoSolucion(matriz, accionesTotales, arrayO, i, j) {
    let ganancia = 0;
    // let vx = [0, 0];
    let q=[];
    let mejor_valor=0;

    if (i == j) {

        return matriz[i][j] = accionesTotales * B;
    }
    // if (matriz[i][j] != -1) {
    //     return matriz[i][j];
    // }
    

    q.push(0*arrayO[i][0] + costoSolucion(matriz, accionesTotales, arrayO, i+1,j));
    for (var k = arrayO[i][2]; k <= arrayO[i][1] - 1; k++) {
        q.push(k*arrayO[i][0] + costoSolucion(matriz, accionesTotales-k, arrayO, i+1,j));
    }
    console.log("hoh");
    mejor_valor=Math.max(...q);
    matriz[i]=mejor_valor;
    return mejor_valor;

}
console.log(Dinamica(A, B, n, arreglito));





