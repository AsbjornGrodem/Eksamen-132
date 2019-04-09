var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";


function Introduksjon_show() {
  var x = document.getElementById("Introduksjon_div");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function Oversikt_show() {
  var x = document.getElementById("Oversikt_div");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function Detaljer_show() {
  var x = document.getElementById("Detaljer_div");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function Sammenlign_show() {
  var x = document.getElementById("Sammenligning_div");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

}
