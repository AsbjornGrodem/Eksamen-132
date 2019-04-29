var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var x = document.getElementById("Introduksjon_div");
var x = document.getElementById("Oversikt_div");
var x = document.getElementById("Detaljer_div");
var x = document.getElementById("Sammenligning_div");

              //Funksjon for å hente informasjon fra Wildboy
function Fetch() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", Befolkning_url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      console.log(myArr.elementer.Halden.Menn);

      /*for (i in myArr.elementer)  {
        x = myArr.elementer[i];
        console.log(x)
      }*/
    }
  }
  xhr.send();
}
window.onload = Fetch;

$(document).ready(function(){
  $("button").click(function(){
    $("Detaljer_div").toggle();
  });
});

function show(button) {

  if button === 1 {
    console.log("du trykket på knapp 1");
  };

};

  /*if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
*/
/*
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
*/
