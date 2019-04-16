var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");

          //Logger navn på alle kommunene
function getNames(URL) {
  var netURL = URL;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", netURL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      for (kommunenavn in myArr.elementer) {
        var informasjon = myArr.elementer[kommunenavn];
        console.log (kommunenavn, informasjon);
      }
    }
  }
  xhr.send();
}
getNames(Sysselsatte_url)


          //Logger kommunenummer
function getIDs(URL, inp) {
  document.getElementById('Detaljer_output').innerHTML = Detaljer_input.value;
  var netURL = URL;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", netURL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
        for (i in myArr.elementer) {
          var x = myArr.elementer[i].kommunenummer;
          if (inp===x){
            console.log("Yes")
          }
          else{console.log("no")}
        }
    }
  }
  xhr.send();
}
//getIDs(Befolkning_url, "2021")

        //Henter informasjon om kommunen brukeren har skrevet inn (kommunenr)
function getInfo(URL) {
  var netURL = URL;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", netURL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      for (i in myArr.elementer.Berg.Menn) {
        console.log(i)
      }
    }
  }
  xhr.send();
}
//getInfo("http://wildboy.uib.no/~tpe056/folk/100145.json")

function load (){

}

function Sammenlign(URL) {
  document.getElementById('Kommune_output').innerHTML = Sammenlign1_input.value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", URL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      console.log(myArr);

    }
  }
  xhr.send();
}



//Button funksjoner som viser/gjemmer divs
function show(button) {

  while (button === true) {
    console.log("du printer ut");
  }

  if (button === 1) {
    console.log("du trykket på knapp 1");

    intro.style.display = "block";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
  };

  if (button === 2) {
    console.log("du trykket på knapp 1");

    intro.style.display = "none";
    oversikt.style.display = "block";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
  };

  if (button === 3) {
    console.log("du trykket på knapp 1");

    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "block";
    sammenligning.style.display = "none";
  };

  if (button === 4) {
    console.log("du trykket på knapp 1");

    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "block";
  };
};



$(document).ready(function(){
  $("button").click(function(){
    $("Detaljer_div").toggle();
  });
});
//Løsnigen for den eine oblig oppgaven han viste på tavla
/*
function createButton(nettID) {
  var button = document.createElement("input");
  button.type = "button";
  button.value = nettID;
  button.onclick = function () {
    var netURL = "http:wildboy.uib/balbaasd" + nettID + ".json";
    var xhr = ("GET",netURL);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        displayNetworkInfo(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }
  return button;
}
*/
//window.onload = Fetch;
/*
function Sammenlign_Fetch () {
  var xhr = new XMLHttpRequest();
  xhr.oprn("GET", )
  xhr.onreadystatechange = function ()  {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var Sammenlign_array = (JSON.parse(this.responseText));
      console.log()
    }
  }
}
*/
