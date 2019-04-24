var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");

//async, await ny teknologi

          //Logger navn på alle kommunene
function load(URL, cb) {
  var netURL = URL;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", netURL);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      var myArr = (JSON.parse(this.responseText));
      var array = myArr.elementer;
      for (kommunenavn in myArr.elementer) {
        var informasjon = myArr.elementer[kommunenavn];
      }
      getIds(myArr);
      getNames(array);
      getInfo(array, "Halden")
    }
  }
  xhr.send();
}


function getNames(array) {
  var mylist = [];
  for (kommunenavn in array)
  {mylist.push(kommunenavn)}
  data(mylist);
}

//load(Befolkning_url, getNames);
//load(Befolkning_url, getIds);
load(Sysselsatte_url, getInfo);
load(Utdanning_url, getInfo);

function data(mylist) {
    //console.log(mylist);
}

          //Logger kommunenummer
function getIds(array) {
    for (i in array.elementer){
      var kommunenummer = array.elementer[i].kommunenummer;
    //console.log(kommunenummer)
    return(kommunenummer);
  }
}

//Henter informasjon om kommunen brukeren har skrevet inn (kommunenr)
function getInfo(array, input) {
    //document.getElementById('Detaljer_output').innerHTML = input;
    for (i in array) {
      if (i===input)  {
        var kom_info = array[i];
        var menn = (JSON.stringify(kom_info.Menn));
        var kvinner = (JSON.stringify(kom_info.Kvinner));
        console.log(kvinner);
        //console.log(kom_info)
        var info = (JSON.stringify(kom_info));
      }
    }document.getElementById("Table").innerHTML = kvinner;
  }

function Sammenlign(URL) {
  document.getElementById('Kommune_output').innerHTML = Sammenlign1_input.value;
      console.log(myArr);
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
