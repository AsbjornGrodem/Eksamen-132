var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");


//Jeg har endret noe mer

function Konstruktor(array, input) {
  this.navn = input;
  this.nummerliste = getIds(array);
  this.kommunenummer = getNumber(array);
  this.navneliste = getNames(array);
  this.informasjon = getInfo(array);
  this.total_befolkning = befolkning_total(array);
  this.sysselsetting = sysselSetting(array);

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
    for (kommune in array) {
      if (kommune === i){
        let informasjon = array[kommune];
        return (informasjon)
      }
    }
  }
  function befolkning_total(kjønn) {

    var total = [];
    var total_menn = [];
    var total_kvinner = [];
    for (kommune in kjønn) {
      var menn = kjønn[kommune].Menn;
      var kvinner = kjønn[kommune].Kvinner
      for(årstall in menn){
        var antall = menn[årstall];
      }
      total_menn.push(antall)

      for(årstall in kvinner) {
        var antall = kvinner[årstall];
      }
      total_kvinner.push(antall)
    }

    for (var i = 0; i < total_menn.length; i++) {
      total_menn[i]
    }

    for (var i = 0; i < total_kvinner.length; i++) {
      total.push(total_kvinner[i] + total_menn[i]);
    }
    return total
  }
  function sysselSetting(sysselsetting) {

    var siste_maaling = [];

    for(kommune in sysselsetting){
      var menn = sysselsetting[kommune].Menn;
       for (årstall in menn) {
         var antall = menn[årstall];
       }
       siste_maaling.push(antall);
       for (var i = 0; i < siste_maaling.length; i++) {
         siste_maaling[i]
       }
    }

    return siste_maaling;
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
function f_oversikt (oversikt) {

  var tabellHTML = '<table class="total_oversikt">';
  tabellHTML += '<tr>';
  tabellHTML += '<td>';
  tabellHTML += "Kommunenavn: ";
  tabellHTML += '</td>';
  tabellHTML += '<td>';
  tabellHTML += "Kommunenummer: ";
  tabellHTML += '</td>';
  tabellHTML += '<td>';
  tabellHTML += "Total Befolkning: ";
  tabellHTML += '</td>';
  tabellHTML += '</tr>';

  for(i = 0; i <= 422; i++) {
    tabellHTML += '<tr>';
    tabellHTML += '<td>';
    tabellHTML += oversikt[i].navn;
    tabellHTML += '</td>';
    tabellHTML += '<td>';
    tabellHTML += oversikt[i].kommunenummer;
    tabellHTML += '</td>';
    tabellHTML += '<td>';
    tabellHTML += oversikt[i].total_befolkning[i];
    tabellHTML += '</td>';
    tabellHTML += '</tr>';
  }
  tabellHTML += '</table>';
  document.getElementById("Oversikt_div").innerHTML = tabellHTML;
}
function f_sammenlign (utdanning_master, befolkning_master, sysselsatte_master) {

};
function f_detaljer (utdanning_master, befolkning_master, sysselsatte_master) {

  let input = document.getElementById("Detaljer_input").value;
  for (kommunenummer in befolkning_master){
    if (input === befolkning_master[kommunenummer].kommunenummer){
      var kommuneNavn = '<h2>'
      kommuneNavn += befolkning_master[kommunenummer].navn;
      kommuneNavn += " kommune"
      kommuneNavn += '</h2>'
      var tabellHTML = '<table id="Detaljer_output">'

      tabellHTML += '<tr>';
      tabellHTML += '<td>';
      tabellHTML += "Kommunenavn: ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Kommunenummer: ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Total befolkning: ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Sysselsetting og høyere utdanning: ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Høyere utdanning: ";
      tabellHTML += '</td>';
      tabellHTML += '</tr>';
      tabellHTML += '<tr>';
      tabellHTML += '<td>';
      tabellHTML += befolkning_master[kommunenummer].navn;
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += befolkning_master[kommunenummer].kommunenummer;
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += befolkning_master[kommunenummer].total_befolkning[kommunenummer];
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += JSON.stringify(sysselsatte_master[kommunenummer].sysselsetting[kommunenummer]);
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "uskjent";
      tabellHTML += '</td>';
      tabellHTML += '</tr>';

      tabellHTML += '</table>';
      document.getElementById("detaljer_oversikt").innerHTML = tabellHTML;
      document.getElementById("kommunenavn").innerHTML = kommuneNavn;
    }

  }

}

function sammenlign_click() {
  //Load lager master-array som vi looper gjennom for å finne inputs
  load(Sysselsatte_url, function(array) {
    let sysselsatte_master = [];
    for (x in array) {
      let kommune = new Konstruktor(array, x)
      sysselsatte_master.push(kommune);}
    let input1 = document.getElementById("Sammenlign1_input").value;
    let input2 = document.getElementById("Sammenlign2_input").value;
    var table1 = document.getElementById("S_table1");
    var table2 = document.getElementById("S_table2");
    var table3 = document.getElementById("S_table3");
    var table4 = document.getElementById("S_table4");

  //var cell3 = row.insertCell(2);
  //  var cell4 = row.insertCell(3);

    for (kommune in sysselsatte_master) {
      if (sysselsatte_master[kommune].kommunenummer==="0101") {
        var table_menn = sysselsatte_master[kommune].informasjon.Menn;
          for (årstall in table_menn) {
            var verdi = table_menn[årstall];
            var row = table1.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = årstall;
            cell2.innerHTML = verdi;
          }
      var row = table1.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "ÅR";
      cell2.innerHTML = "Antall sysselsatte menn i "+ sysselsatte_master[kommune].navn;
        var table_kvinner = sysselsatte_master[kommune].informasjon.Kvinner;
            for (årstall in table_kvinner) {
              console.log(årstall);
              var verdi = table_kvinner[årstall];
              var row = table2.insertRow(0);
              var cell1 = row.insertCell(0);
              //var cell2 = row.insertCell(1);
              cell1.innerHTML = verdi;
              //cell2.innerHTML = årstalli;
            }
            var row = table2.insertRow(0);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = "Antall sysselsatte kvinner i " + sysselsatte_master[kommune].navn;
            //cell2.innerHTML = "antall kvinner";*/
      }
    }
  })
}

sammenlign_click();


function buttonClick(test) {

  load(Befolkning_url, function (array1) {
    let befolkning_master = [];
    for (x in array1) {
      let kommune = new Konstruktor(array1, x)
      befolkning_master.push(kommune);}
    load(Utdanning_url, function(array2) {
      let utdanning_master = [];
      for (x in array2) {
        let kommune = new Konstruktor(array2, x)
        utdanning_master.push(kommune);}

      load(Sysselsatte_url, function(array3) {
        let sysselsatte_master = [];
        for (x in array3) {
          let kommune = new Konstruktor(array3, x)
          sysselsatte_master.push(kommune);}
        f_sammenlign(utdanning_master,befolkning_master,sysselsatte_master);
        if (test === 1) {
          f_detaljer(utdanning_master, befolkning_master, sysselsatte_master);
        }

        f_oversikt (befolkning_master)

      })
    })

  })
}

//Button funksjoner som viser/gjemmer divs
function show(button) {

  while (button === true) {
    console.log("du printer ut");
  }

  if (button === 1) {


    intro.style.display = "block";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";

  };

  if (button === 2) {


    intro.style.display = "none";
    oversikt.style.display = "block";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";

  };

  if (button === 3) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "block";
    sammenligning.style.display = "none";

  };

  if (button === 4) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "block";

  };
};
