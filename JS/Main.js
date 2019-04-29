var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");

//async, await ny teknologi

function Konstruktør(URL, input, array, nummerliste, navnliste, kommunenummer, navn) {

  function load(URL) {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.status)
          }
        }
      }
      xhr.open('get', URL, true)
      xhr.send();
    })
  }

//heihei
  load(URL).then(response => {
    let array = response.elementer;
  this.URL = URL;
  this.navneliste = getNames(array);
  this.nummerliste = getIds(array);
  this.navn = input;
  this.array = array;
  this.kommunenummer = getNumber(array)
  getInfo();
});

  function getIds(array) {
    let nummerliste = [];
    for (i in array) {
      if (i === input) {
        console.log(i)
        var kommunenr = array[i].kommunenummer;
        nummerliste.push(array[i].kommunenummer)
        console.log(kommunenr);
      } else {
        nummerliste.push(array[i].kommunenummer);
      }
    }return (nummerliste)
  }

  function getNumber(array) {
    for (i in array) {
      if (i === input) {
        var kommunenummer = array[i].kommunenummer;
        return (kommunenummer)
      }
    }
  }

  function getNames(array, navnliste) {
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
        if (kommune===input)  {
          var array_Menn = array[kommune].Menn;
          var array_Kvinner = array[kommune].Kvinner;
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
              cell2.innerHTML = verdi;}
            }
          }
  }

}


var test = new Konstruktør(Befolkning_url, "Lindesnes")
console.log(test)
console.log(test.URL)

function newKonst() {
  var inp = document.getElementById("Infoinp");
  var konst = new Konstruktør(Befolkning_url, inp);
  console.log(konst)
  console.log(inp);
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
