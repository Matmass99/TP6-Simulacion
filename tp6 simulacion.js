var T;
var TPLL;
var TF;
var NT;
var ARR;
var STE;
var STO;
var STP;
var TC;
var PPCP;
var PTE;
var PTOR;
var PTP;
var cantidadRepartidores;
var TE;
var TRP;
var IP;

function init_variables(tiempo_fin){
    T = 0;
    TF = tiempo_fin;
    TPLL = 0;
    NT = 0;
    ARR = 0;
    STE = 0;
    STO = [];
    STP = 0;
    TC = [];
    PPCP = 0;
    PTE = 0;
    PTOR = 0;
    PTP = 0;
    cantidadRepartidores = 0;
}

function asignar_Tiempos(cantidadRepartidores){
  for (var i=0; i<cantidadRepartidores; i++){
    TC.push(0);
    STO.push(0);  
  }
}

function buscarMenorTC(){
  var j=1;
  for (i=1;i<cantidadRepartidores;i++){
    if(TC[j]>TC[i]){
      j=i;
    }
  }
  return j;
}


function getTE() {
  var R = Math.random();
  var f = ln(-R+1)/(-0,0026);
  return f;
}

function getIP() {
  var R = Math.random();
  //var fs = ln(-R+1)/(-0,0014);
  //var ds = ln(-R+1)/(-0,0025);
  //return f;
}

function getTPR() {
  var R = Math.random();
  var f = ln(-R+1)/(-0,0024);
  return f
}

function calculos(){
  for(var i=0;i<cantidadRepartidores;i++){
    PPCP = (ARR/NT) * 100;
    PTE = STE / NT;
    PTOR = (STO[i]/NT) * 100
    PTP = (STP / NT) * 100
  };

}

function mostrarResultados(){
  for(var i=0;i<cantidadRepartidores;i++){
    console.log("Repartidor N°"+ i);
    console.log("PPCP = "+ PPCP);
    console.log("PTE = "+ PTE);
    console.log("PTOR = "+ PTOR[i]);
    console.log("PTP = "+ PTP);
  }
}



function calcularSTO(){
  for (i=0;i<cantidadRepartidores;i++){
    STO[i] = STO[i] + (T - TC[i]);
  }
}

function calcularSTE(){
  for (i=0;i<cantidadRepartidores;i++){
    STE = STE + (TC[i]-T);
  }
}

function calcularSTP(){
  for (i=0;i<cantidadRepartidores;i++){
    STP = STP + (TC[i]-T);
  } 
  
}

function calcularTC(){
    for (i=0;i<cantidadRepartidores;i++){
      //TC[i] = TC[i] + TE + TRP;
      TC[i] = TC[i] + TE ;
    }
}

function calcularTCSinEspera(){
  for (i=0;i<cantidadRepartidores;i++){
    //TC[i] = TC[i] + TE + TRP;
    TC[i] = T + TE ;
  }
}

function main(numRepartidores, final){
  init_variables(final);
  cantidadRepartidores= numRepartidores;
  asignar_Tiempos(cantidadRepartidores);
  var repetir = true;
  while (repetir){
    T = TPLL;
    IP = getIP();
    TPLL = T + IP;
    TE = getTE();
    var i = buscarMenorTC();
    //TPR = getTPR(); 
    if(T>=TC[i]){
      calcularSTO();
      calcularTCSinEspera();
    } else {
        if(TC[i] - T >= 60){
          var R = Math.random();
          if(R <= 0.75){
            ARR = ARR + 1;
          }
          else {
            calcularSTE();
            calcularTC();
          }
        
        }
        else{
            calcularSTE();
            calcularTC();
        }
      }
    NT = NT + 1;
    calcularSTP();
    if (T >=TF){
    repetir= false;
    calculos();
    mostrarResultados();
    }
  }
}
main(10, 50000);
