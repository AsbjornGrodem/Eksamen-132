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
  this.total_befolkning = befolkning_total(array);

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

/*  var table = document.getElementById("Oversikt_table");
  let newRow = table.insertRow(-1);
  let newCell = newRow.insertCell(0);
  let newText = document.createTextNode('INPUT');

  for (kommune in sysselsatte_master){
    let navn = sysselsatte_master[kommune].navn;
    let kommunenummer = sysselsatte_master[kommune].kommunenummer;
    let info = sysselsatte_master[kommune].informasjon.Menn;

    console.log(navn, kommunenummer);
  }
}


*/

function f_sammenlign (utdanning_master, befolkning_master, sysselsatte_master) {

};

function f_detaljer (utdanning_master, befolkning_master, sysselsatte_mast) {

  let input = document.getElementById("Detaljer_input").value;
  for (kommunenummer in befolkning_master){
    if (input === befolkning_master[kommunenummer].kommunenummer){
      var tabellHTML = '<table id="Detaljer_output">'
      tabellHTML += '<tr>';
      tabellHTML += '<td>';
      tabellHTML += "Kommunenavn: ";
      tabellHTML += befolkning_master[kommunenummer].navn;
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Kommunenummer: ";
      tabellHTML += befolkning_master[kommunenummer].kommunenummer;
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Sysselsetting og høyere utdanning ";
      tabellHTML += '</td>';
      tabellHTML += '</tr>';

      document.getElementById("Detaljer_output").innerHTML = tabellHTML;

    }
  }
}

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
      /*f_detaljer (utdanning_master, befolkning_master, sysselsatte_master);*/
      f_oversikt (befolkning_master)
      function buttonClicked() {
        f_detaljer (utdanning_master, befolkning_master, sysselsatte_master);
      }
    })
  })
})



//f_oversikt();
//f_detaljer();
//f_sammenlign();


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

  while (button === true) {
    console.log("du printer ut");
  }

  if (button === 1) {


    intro.style.display = "block";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
    table_Menn_div.style.display = "none";
    table_Kvinner_div.style.display = "none";
    table_Begge_div.style.display = "none";
  };

  if (button === 2) {


    intro.style.display = "none";
    oversikt.style.display = "block";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
    table_Menn_div.style.display = "none";
    table_Kvinner_div.style.display = "none";
    table_Begge_div.style.display = "none";
  };

  if (button === 3) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "block";
    sammenligning.style.display = "none";
    table_Menn_div.style.display = "none";
    table_Kvinner_div.style.display = "none";
    table_Begge_div.style.display = "none";
  };

  if (button === 4) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "block";
    table_Menn_div.style.display = "none";
    table_Kvinner_div.style.display = "none";
    table_Begge_div.style.display = "none";
  };
};
