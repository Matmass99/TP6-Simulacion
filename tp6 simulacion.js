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
    PTOR = [];
    PTP = 0;
    cantidadRepartidores = 0;
}

function asignar_Tiempos(cantidadRepartidores){
  for (var i=0; i<cantidadRepartidores; i++){
    TC.push(0);
    STO.push(0);  
    PTOR.push(0);
 
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
  var R = random();
  return -(Math.log(R/26)/(26));
  
}
function random(){
  var R = Math.random();
  return R;
}

function getIP() {
  var R = random();
  return  -(Math.log(R/14)/(14));
  //var ds = -(Math.log(R/25)/(25));
  
}

function getTRP() {
  var R = random();
  return -(Math.log(R/24)/(24));
  
}

function calculos(){
  for(var i=0;i<cantidadRepartidores;i++){
    PPCP = (ARR/NT) * 100;
    PTE = STE / NT;
    PTOR[i] = (STO[i]/NT) * 100
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



function calcularSTO(i){
 
  STO[i] = STO[i] + (T - TC[i]);
}

function calcularSTE(i){

  STE = STE + (TC[i]-T);
}

function calcularSTP(i){

  STP = STP + (TC[i] - T);
}

function calcularTC(i){

    TC[i] = TC[i] + TE + TRP;
}

function calcularTCSinEspera(i){

  TC[i] = T + TE + TRP;
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
    TRP = getTRP(); 
    if(T>=TC[i]){
      calcularSTO(i);
      calcularTCSinEspera(i);

    } else {
        if(TC[i] - T >= 60){
          var R = Math.random();
          if(R <= 0.75){
            ARR = ARR + 1;
          }
        }else{
          calcularSTE(i);
          calcularTC(i);
        }
      }
    NT = NT + 1;
    calcularSTP(i);
    if (T >=TF){
    repetir= false;
    calculos();
    mostrarResultados();
    }
  }
}
main(2, 50000);