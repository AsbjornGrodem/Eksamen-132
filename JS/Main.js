var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");

//async, await ny teknologi

function Konstruktor(array, input) {
  this.navn = input;
  this.nummerliste = getIds(array);
  this.kommunenummer = getNumber(array);
  this.navneliste = getNames(array);
  this.informasjon = getInfo(array);

  function getIds(array) {
    let nummerliste = [];
    for (i in array) {
      if (i === input) {
        var kommunenr = array[i].kommunenummer;
        nummerliste.push(array[i].kommunenummer)
      } else {
        nummerliste.push(array[i].kommunenummer);
      }
    }
    this.nummerliste = nummerliste;
    return (nummerliste)
  }
  function getNumber(array) {
    for (i in array) {
      if (i === input) {
        var kommunenummer = array[i].kommunenummer;
        return (kommunenummer)
      }
    }
  }
  function getNames(array) {
    var navnliste = [];
    for (kommunenavn in array) {
      navnliste.push(kommunenavn)
    }
    return (navnliste);
  }
  function getInfo(array, input) {
  //document.getElementById('Detaljer_output').innerHTML = input;
  var table_Menn = document.createElement("Table_Menn");
  var table_Kvinner = document.getElementById("Table_Kvinner");
  var table_Begge = document.getElementById("Table_Begge");

  for (kommune in array) {
    if (kommune === i){
      let informasjon = array[kommune];
      return (informasjon)
      }
    }
  }
}

function load(URL, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let myArr = JSON.parse(this.responseText);
        let array = myArr.elementer;

        callback(array);
    }
    xhr.open('GET', URL, true);
    xhr.send();
}

load(Utdanning_url, function(array) {
    let master = [];
    for (x in array) {
      let kommune = new Konstruktor(array, x)
      master.push(kommune)
    }
    for (kommune in master) {
      console.log(master[kommune])
    }return (master);
  });
load(Sysselsatte_url, function (array) {
})


/*



//      Dette kan brukes for å pushe tabeller osv
for (kommune in array) {
  if (kommune===input)  {
    var array_Menn = array[kommune].Menn;
    var array_Kvinner = array[kommune].Kvinner;
    var array_Begge = array[kommune].Begge;//////////////////Hvordan komme til en verdi som er to navn
      for (årstall in array_Menn) {
        var verdi = array_Menn[årstall];
        var row = table_Menn.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = årstall;
        cell2.innerHTML = verdi;
      }
      for (årstall in array_Kvinner) {
        var verdi = array_Kvinner[årstall];
        var row = table_Kvinner.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = årstall;
        cell2.innerHTML = verdi;
      }
      for (årstall in array_Begge) {
        var verdi = array_Begge[årstall];
        var row = table_Begge_div.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = årstall;
        cell2.innerHTML = verdi;

      }
    }
  }
}
*/

//Button funksjoner som viser/gjemmer divs
function show(button) {
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
}
