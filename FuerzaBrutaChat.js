let A = 1000
let arreglito = [[500, 600, 400],[450, 400, 100],[400, 400, 100],
[200, 200, 50],[100, 1000, 0]]//[500, 600, 400], [450, 400, 100], [100, 1000, 0]]

let n = arreglito.length - 1

function fuerzaBruta(accionesTotales, compradores, arrayO) {
  let x = []
  let precioGobierno = arrayO[arrayO.length-1][0];
  let combinaciontotal=[]

  for (let i = 0; i < Math.pow(2, arrayO.length - 1); i++) {
    let combinaciontransi=[]
    let opcion = 0

    for (let j = 0; j < arrayO.length - 1; j++) {
      if (i & (1 << j)) {
        opcion += arrayO[j][1];
        combinaciontransi[j] = arrayO[j][1];
      } else {
        combinaciontransi[j] = 0;
      }

      if (opcion > accionesTotales) {
        break;
      }
    }

    if (opcion <= accionesTotales) {
      const faltante = accionesTotales - opcion;
      combinaciontransi[arrayO.length - 1] = faltante >= 0 ? faltante : 0;

      const ganancia = combinaciontransi.reduce((acc, curr, idx) => {
        return acc + curr * arrayO[idx][0];
      }, 0);

      x.push(ganancia);
      combinaciontotal.push(combinaciontransi);
    }
  }

  const mejorGanancia = Math.max(...x);
  console.log(combinaciontotal);
  return x;
}

console.log(fuerzaBruta(A, n, arreglito));