// räknaren

// globala variabler

var num1 = "";
var num2 = "";
var operator;
var flag = 0; // trackar ifall operator knappen har blivit klickad och bollar mellan true/false
var display = document.getElementById("display");
var equalTo = 0; // används för reseta diplay för ny räkning


// setNumber(value) functionen

function setValue(number) {
  if(equalTo === 1){ // kollar om lika-med knappen är klickad
    clearButton();
  }

  if(flag === 0){
    num1+= number; // sätter sifran som är klickad i var num1
    display.innerHTML+= number; // sifran som är klickad visas i displayen
  } else {
    // om flag är 1
    num2+= number;
    display.innerHTML+= number; // sifran som är klickad visas i displayen

  }
  if(num1.length > 10 || num2.length > 10) {
    display.innerHTML = "För mycket sifror för denna räknaren";
  }
}


// oppClick(nummer'kod') function

function oppClick(numericCode) {
  operator = numericCode; // erhåller sifror från 1-4 beroende vilken man klickar på
  var oppString = "";
  flag = 1;

    if(operator === 4){
      display.innerHTML+= "/";
      oppString = "/";
    }else if (operator === 3){
      display.innerHTML+= "*";
      oppString = "*";
    }else if (operator === 2){
      display.innerHTML+= "-";
      oppString = "-";
    } else {
      display.innerHTML+= "+";
      oppString = "+";
    }
    if(flag === 1){
      display.innerHTML = num1 + oppString; // fixar så att man inte kan klicka flera gånger på operator
    }
    if(flag === 1 && num1 === ""){ // gör så att man inte kan starta räknaren med en opperator
      clearButton();
    }
    if(equalTo === 1){ // ifall man klickar på operator efter man har klickat på lika-med knappen...rensar displayen osv
      clearButton();
    }
}


// equalClick function

function equalClick(){
  equalTo = 1;
  num1 = parseFloat(num1); // converterat till nummer
  num2 = parseFloat(num2); // converterat till nummer

  var result = "";
  var roundedResult = ""; // omvandlar till fyra decimaler

  switch(true) {
    case(operator === 1):
    result = num1 + num2;
    break;

    case(operator === 2):
    result = num1 - num2;
    break;

    case(operator === 3):
    result = num1 * num2;
    break;

    case(operator === 4):
    result = num1 / num2;
    break;
  }
  roundedResult = result.toFixed(4);
  display.innerHTML = roundedResult;

  if(roundedResult === "NaN"){
    display.innerHTML = "Det går inte att räkna ut";
  }
}

// clearButton funktion

function clearButton(){ // tömer allt

  num1 = "";
  num2 = "";
  flag = 0;
  display.innerHTML = ""
  equalTo = 0;
}


// backSpace funktion

function backspace(){
  var temp1 = "";
  var temp2 = "";
  if(equalTo === 1){
    clearButton();
  }

  if(flag === 0){
    temp1 = num1.substring(0, num1.length-1); // delitar sista talet i display
    display.innerHTML = temp1;
    num1 = temp1; // för at kunna delita fler tal
  }
  if(flag === 1){ // delitar när man har operator i displayen
    display.innerHTML = num1;
    flag = 0;
  }

  if(num2 !== ""){
    temp2 = num2.substring(0, num2.length-1);
    display.innerHTML = num1 + operator + num2;
    num2 = temp2;
    flag = 1;

  setOppString();
  }
}


// setDecimal funktion

function setDecimal(){
  if(flag === 0){
    if(num1 === ""){
      num1 = "0.";
      display.innerHTML = num1;
    }
    if(num1.indexOf('.') === -1){
      num1 += ".";
      display.innerHTML = num1;
    }
  }
  if(flag === 1){
    if(num2 === ""){
      num2 = "0.";
      display.innerHTML = num2;
    }
    if(num2.indexOf('.') === -1){
      num2 += ".";
      display.innerHTML = num1 + operator + num2;

      setOppString();
    }
  }

}

function setOppString(){
  if(operator === 1) { // lägger in detta för att kunna hitta operator för display.innerHTML
    display.innerHTML = num1 + "+" + num2;
  } else if (operator === 2) {
  display.innerHTML = num1 + "-" + num2;
  } else if (operator === 3) {
  display.innerHTML = num1 + "*" + num2;
  } else if (operator === 4) {
  display.innerHTML = num1 + "/" + num2;
  }
}
