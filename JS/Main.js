var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");

//async, await ny teknologi

function Konstruktør(URL, input, array, nummerliste, navnliste, kommunenr) {

        function load(URL) {
          var netURL = URL;
          var xhr = new XMLHttpRequest();
          xhr.open("GET", netURL);
          xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
              var myArr = (JSON.parse(this.responseText));
              let array = myArr.elementer;
              for (kommunenavn in myArr.elementer) {
                var informasjon = myArr.elementer[kommunenavn];
              }
              //document.getElementById('Detaljer_output').innerHTML = input;
              //Konstruktør(array, "Halden")
              getIds(array, input);
              getInfo(array, input);
              getNames(array);
            }
          }
          xhr.send();
        }
        load(URL);

      function getIds(array, kommunenr) {
        let nummerliste = [];
            for (i in array){
              if (i === input) {
                var kommunenr = array[i].kommunenummer;
                console.log(kommunenr);
              this.kommunenummer = kommunenr;
              nummerliste.push(array[i].kommunenummer)
            }
            else {nummerliste.push(array[i].kommunenummer);}
          }
          console.log(nummerliste);
          return (nummerliste);
        }

      function getNames(array, navnliste) {
        var navnliste = [];
        for (kommunenavn in array)
        {navnliste.push(kommunenavn)}
        console.log(navnliste);
        return (navnliste);
      }

      function getInfo(array, input) {
          //document.getElementById('Detaljer_output').innerHTML = input;
          var table_Menn = document.getElementById("Table_Menn");
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

      getIds(array, kommunenr);
      getInfo(array, input);
      getNames(array, navnliste);
      this.URL = URL;
      this.navnliste = navnliste;
      this.kommunenr = kommunenr;
      this.nummerliste = nummerliste;
    }
//Konstruktør(Befolkning_url, "Halden");

var test = new Konstruktør(Befolkning_url, "Halden")
console.log(test)


////////////////////////////////////////////////////////////////////////////////////////

//load(Befolkning_url, getNames);
//load(Befolkning_url, getIds);
//load(Befolkning_url, getInfo);



          //Logger kommunenummer

//Henter informasjon om kommunen brukeren har skrevet inn (kommunenr)
function getInfo(array, input) {
    var table_Menn = document.getElementById("Table_Menn");
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
