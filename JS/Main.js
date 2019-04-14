var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";

function getNames(URL, x) {
  var netURL = URL;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", netURL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      for (i in myArr.elementer) {
        console.log(i);
      }
    }
  }
  xhr.send();
}
//getNames(Sysselsatte_url)

function getIDs(URL) {
  document.getElementById('Detaljer_output').innerHTML = Detaljer_input.value;
  var inp = Detaljer_input.value;
  var netURL = URL;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", netURL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      var x = myArr.elementer;
        for (i in x) {
          if (i===inp) {
            console.log(x)
            console.log(x.i)
          }
          else {
            console.log("woops")
          }
        }
    }
  }
  xhr.send();
}
getIDs(Befolkning_url)


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

              //Funksjon for å hente informasjon fra Wildboy
function Fetch() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", Befolkning_url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      console.log(myArr);

      /*for (i in myArr.elementer)  {
        x = myArr.elementer[i];
        console.log(x)
      }*/
    }
  }
  xhr.send();
}
//Fetch();

function Sammenlign() {
  document.getElementById('Kommune_output').innerHTML = Sammenlign1_input.value;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", Befolkning_url);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      console.log(myArr);

    }
  }
  xhr.send();
}

//Button funksjoner som viser/gjemmer divs

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
