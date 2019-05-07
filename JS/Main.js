var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");
var sammenlign_table = document.getElementById("S_table");

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

  function sysselSetting(sysselsetting) {

  var siste_maaling = [];

  for(kommune in sysselsetting){
    var menn = sysselsetting[kommune]["Begge kjønn"];
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
function f_sammenlign (utdanning_master, befolkning_master, sysselsatte_master) {

};
/*function f_detaljer (utdanning_master, befolkning_master, sysselsatte_master) {

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
    }
  }
  tabellHTML += '<td>';
  for (kommunenummer in sysselsatte_master) {
    if (input === sysselsatte_master[kommunenummer].kommunenummer) {
      var objekt = sysselsatte_master[kommunenummer].informasjon["Begge kjønn"]["2018"];
      tabellHTML += JSON.stringify(objekt);
      tabellHTML += '</td>';
    }
  }
  for (kommunenummer in utdanning_master) {
    if (input === utdanning_master[kommunenummer].kommunenummer) {
      var utdanning = utdanning_master[kommunenummer].informasjon;
      var utdanning_menn = utdanning_master[kommunenummer].informasjon["04a"].Menn["2017"];
      var utdanning_kvinner = utdanning_master[kommunenummer].informasjon["04a"].Kvinner["2017"];
      var total_utdanning = utdanning_menn + utdanning_kvinner;
      var total_befolkning = befolkning_master[kommunenummer].total_befolkning[kommunenummer]
      var total_befolkning_utdanning = total_befolkning * total_utdanning / 100;

      tabellHTML += '<td>';
      tabellHTML += "Prosent: "
      tabellHTML += JSON.stringify(total_utdanning) + "%";
      tabellHTML += '<br>'
      tabellHTML += "Total: "
      tabellHTML +=  Math.trunc(total_befolkning_utdanning);
      tabellHTML += '</td>';
      tabellHTML += '</tr>';
      tabellHTML += '</table>';
      tabellHTML += '<br>';
    }
  }


    for (kommunenummer in befolkning_master){

      if (input === befolkning_master[kommunenummer].kommunenummer) {
        var utvikling_navn = '<h2>'
        utvikling_navn += "Historisk utvikling i " + befolkning_master[kommunenummer].navn;
        utvikling_navn += " kommune"
        utvikling_navn += '</h2>'
        var tabellHistorisk = '<table id="Historisk_tabell">'
        tabellHistorisk += '<tr>';
        tabellHistorisk += '<td>';
        tabellHistorisk += "År: ";
        tabellHistorisk += '</td>';
        tabellHistorisk += '<td>';
        tabellHistorisk += "Antall: ";
        tabellHistorisk += '</td>';
        tabellHistorisk += '</tr>';

        for (var i = 2007; i < 2019; i++) {
          var årstall = Object.keys(befolkning_master[kommunenummer].informasjon.Kvinner);
          var antall = befolkning_master[kommunenummer].informasjon.Kvinner;

          tabellHistorisk += '<tr>';
          tabellHistorisk += '<td>';
          tabellHistorisk += årstall[i]
          tabellHistorisk += '</td>';
          tabellHistorisk += '<td>';
          tabellHistorisk += antall[i];
          tabellHistorisk += '</td>';
          tabellHistorisk += '</tr>';
        }
        tabellHistorisk += '</table>';

        //tabellHistorisk += JSON.stringify(befolkning_master[kommunenummer].informasjon.Kvinner);
      }
    }
    document.getElementById("detaljer_oversikt").innerHTML = tabellHTML;
    document.getElementById("kommunenavn").innerHTML = kommuneNavn;
    document.getElementById("navn_historisk").innerHTML = utvikling_navn;
    document.getElementById("historisk_utvikling").innerHTML = tabellHistorisk;

}
*/
function f_detaljer (utdanning_master, befolkning_master, sysselsatte_master) {
  let input = document.getElementById("Detaljer_input").value;
  for (kommunenummer in befolkning_master){
    if (input === befolkning_master[kommunenummer].kommunenummer){
      let uni_kort_menn = utdanning_master[kommunenummer].informasjon["03a"].Menn[2017];
      let uni_kort_kvinner = utdanning_master[kommunenummer].informasjon["03a"].Kvinner[2017];
      let uni_lang_menn = utdanning_master[kommunenummer].informasjon["04a"].Menn[2017];
      let uni_lang_kvinner = utdanning_master[kommunenummer].informasjon["04a"].Kvinner[2017];
      let fagskole_menn = utdanning_master[kommunenummer].informasjon["11"].Menn[2017];
      let fagskole_kvinner = utdanning_master[kommunenummer].informasjon["11"].Kvinner[2017];
      let u_kvinner = uni_kort_kvinner+uni_lang_kvinner+fagskole_kvinner;
      let u_menn = uni_kort_menn+uni_lang_menn+fagskole_menn;


      var kommuneNavn = document.createElement('h2');
      kommuneNavn.innerText = befolkning_master[kommunenummer].navn + " kommune";
      var tabellHTML = document.createElement('table');
      tabellHTML.id = "detaljer_oversikt";
      tabellHTML.innerHTML = "";

      var row = tabellHTML.insertRow();
      row.insertCell().innerText = "Kommunenavn: ";
      row.insertCell().innerText = "Kommunenummer: ";
      row.insertCell().innerText = "Total befolkning: ";
      row.insertCell().innerText = "Sysselsatt";
      row.insertCell().innerText = "Høyere utdanning (fra 2017) ";
      row.insertCell().innerText = "Høyere utdanning (fra 2017) ";

      row = tabellHTML.insertRow();
      row.insertCell().innerText = befolkning_master[kommunenummer].navn;
      row.insertCell().innerText = befolkning_master[kommunenummer].kommunenummer;
      row.insertCell().innerText = befolkning_master[kommunenummer].total_befolkning[kommunenummer];
      row.insertCell().innerText = JSON.stringify(sysselsatte_master[kommunenummer].sysselsetting[kommunenummer])+"%";
      row.insertCell().innerText = u_kvinner+" prosent av kvinner og "+u_menn+" prosent av menn";
      row.insertCell().innerText = Math.round(befolkning_master[kommunenummer].informasjon.Kvinner["2017"]*u_kvinner/100)+" kvinner og "+Math.round(befolkning_master[kommunenummer].informasjon.Menn["2017"]/100*u_menn)+" menn";


      //HISTORISK UTVIKLING AV BEFOLKNING DESKTOP VERSJON
      var utvikling_navn = document.createElement('h3');
      utvikling_navn.innerText = "Historisk utvikling av befolkning i " + befolkning_master[kommunenummer].navn + " kommune";
      var tabellHistorisk = document.createElement('table');
      tabellHistorisk.innerHTML = "";
      tabellHistorisk.id = "historisk_utvikling";

      var row = tabellHistorisk.insertRow();
      row.insertCell().innerText = "År:"
      for (var i = 2007; i < 2019; i++) {
        row.insertCell().innerText = i;

      row = tabellHistorisk.insertRow();
      row.insertCell().innerText = "Antall kvinner:"
      for (var i = 2007; i < 2019; i++) {
         var antall_kvinner = befolkning_master[kommunenummer].informasjon.Kvinner;
         row.insertCell().innerText = antall_kvinner[i];
      }

      row = tabellHistorisk.insertRow();
      row.insertCell().innerText = "Antall menn:"
      for (var i = 2007; i < 2019; i++) {
         var antall_menn = befolkning_master[kommunenummer].informasjon.Menn;
         row.insertCell().innerText = antall_menn[i];
      }

      //HISTORISK UTVIKLING AV SYSSELSETTING DESKTOP VERSJON
      var utvikling_navn_syssel = document.createElement('h3');
      utvikling_navn_syssel.innerText = "Historisk utvikling av sysselsetting i " + sysselsatte_master[kommunenummer].navn + " kommune";
      var tabellHistorisk_sysselsatte = document.createElement('table');
      tabellHistorisk_sysselsatte .id = "historisk_sysselsatte";

      var row = tabellHistorisk_sysselsatte .insertRow();
      row.insertCell().innerText = "År:"
      for (var i = 2007; i < 2019; i++) {
        row.insertCell().innerText = i;
      }

      row = tabellHistorisk_sysselsatte .insertRow();
      row.insertCell().innerText = "Antall kvinner:"
      for (var i = 2007; i < 2019; i++) {
         var antall_kvinner = sysselsatte_master[kommunenummer].informasjon.Kvinner;
         row.insertCell().innerText = antall_kvinner[i];
      }

      row = tabellHistorisk_sysselsatte .insertRow();
      row.insertCell().innerText = "Antall menn:"
      for (var i = 2007; i < 2019; i++) {
         var antall_menn = sysselsatte_master[kommunenummer].informasjon.Menn;
         row.insertCell().innerText = antall_menn[i];
      }

      //HISTORISK UTVIKLING AV UTDANNING DESKTOP VERSJON
      var utvikling_navn_utdanning = document.createElement('h3');
      utvikling_navn_utdanning.innerText = "Historisk utvikling av utdanning i " + befolkning_master[kommunenummer].navn + " kommune";
      var tabellHistorisk_utdanning = document.createElement('table');
      tabellHistorisk_utdanning .id = "historisk_sysselsatte";

      var row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "År:"
      for (var i = 1980; i <= 2017; i++) {
        row.insertCell().innerText = i;
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall kvinner på Universitets og høyskolenivå (LANG):"
      for (var i = 1980; i <= 2017; i++) {
         var antall_kvinner = utdanning_master[kommunenummer].informasjon["04a"].Kvinner;
         row.insertCell().innerText = antall_kvinner[i];
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall menn på Universitets og høyskolenivå (LANG):"
      for (var i = 1980; i <= 2017; i++) {
         var antall_menn = utdanning_master[kommunenummer].informasjon["04a"].Menn;
         row.insertCell().innerText = antall_menn[i];
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall kvinner på Universitets og høyskolenivå (KORT):"
      for (var i = 1980; i <= 2017; i++) {
         var antall_kvinner = utdanning_master[kommunenummer].informasjon["03a"].Kvinner;
         row.insertCell().innerText = antall_kvinner[i];
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall menn på Universitets og høyskolenivå (KORT):"
      for (var i = 1980; i <= 2017; i++) {
         var antall_menn = utdanning_master[kommunenummer].informasjon["03a"].Menn;
         row.insertCell().innerText = antall_menn[i];
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall kvinner på Fagskole:"
      for (var i = 1980; i <= 2017; i++) {
         var antall_kvinner = utdanning_master[kommunenummer].informasjon["11"].Kvinner;
         row.insertCell().innerText = antall_kvinner[i];
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall menn på Fagskole:"
      for (var i = 1980; i <= 2017; i++) {
         var antall_menn = utdanning_master[kommunenummer].informasjon["11"].Menn;
         row.insertCell().innerText = antall_menn[i];
      }
    }
      document.getElementById("detaljer_oversikt").appendChild(tabellHTML);
      document.getElementById("kommunenavn").appendChild(kommuneNavn);
      document.getElementById("navn_historisk").appendChild(utvikling_navn);
      document.getElementById("historisk_utvikling").appendChild(tabellHistorisk);
      document.getElementById("navn_historisk_syssel").appendChild(utvikling_navn_syssel);
      document.getElementById("historisk_sysselsatte").appendChild(tabellHistorisk_sysselsatte);
      document.getElementById("navn_historisk_utdanning").appendChild(utvikling_navn_utdanning);
      document.getElementById("historisk_utdanning").appendChild(tabellHistorisk_utdanning);
    }
  }
}
function sammenlign_click() {
 //Load lager master-array som vi looper gjennom for å finne inputs
 load(Sysselsatte_url, function(array) {
   let sysselsatte_master = [];
   for (x in array) {
     let kommune = new Konstruktor(array, x)
     sysselsatte_master.push(kommune);
   }
   let input1 = document.getElementById("Sammenlign1_input").value;
   let input2 = document.getElementById("Sammenlign2_input").value;
   var k1_table = document.createElement('table');
   var k2_table = document.createElement('table');
   k1_table.innerHTML = "";
   k2_table.innerHTML = "";
   let high = [];
   for (kommune in sysselsatte_master) {
    if (sysselsatte_master[kommune].kommunenummer==="0101") {
       var kommune1_navn = document.createElement('h2');
       kommune1_navn.innerText = sysselsatte_master[kommune].navn;
       k1_table.id = "k1_table";

       var row = k1_table.insertRow();
       row.insertCell().innerText = "År";
       row.insertCell().innerText = "Menn";
       row.insertCell().innerText = "Kvinner";

       for (år in sysselsatte_master[kommune].informasjon.Menn) {
         var row = k1_table.insertRow();
         row.insertCell().innerText = år;
         row.insertCell().innerText = sysselsatte_master[kommune].informasjon.Menn[år];
         row.insertCell().innerText = sysselsatte_master[kommune].informasjon.Kvinner[år];

         high.push(år);
      }
    }
    if (sysselsatte_master[kommune].kommunenummer==="0104") {
       var kommune2_navn = document.createElement('h2');
       kommune2_navn.innerText = sysselsatte_master[kommune].navn;
       k2_table.id = "k2_table";
       var row = k2_table.insertRow();
       row.insertCell().innerText = "År";
       row.insertCell().innerText = "Menn";
       row.insertCell().innerText = "Kvinner";

       for (år in sysselsatte_master[kommune].informasjon.Menn) {
         var row = k2_table.insertRow();
         row.insertCell().innerText = år;
         row.insertCell().innerText = sysselsatte_master[kommune].informasjon.Menn[år];
         row.insertCell().innerText = sysselsatte_master[kommune].informasjon.Kvinner[år];

         high.push(år);
       }
     }

      var vekst = document.createElement('listen');
      vekst.append(high);
      vekst.classList.add('highest');

  }
  document.getElementById("kommune1").appendChild(k1_table);
  document.getElementById("kommune1_navn").appendChild(kommune1_navn);
  document.getElementById("kommune1_navn").appendChild(vekst);
  document.getElementById("kommune2").appendChild(k2_table);
  document.getElementById("kommune2_navn").appendChild(kommune2_navn);
  document.getElementById("kommune2_navn").appendChild(vekst);
  })
}

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
    sammenlign_table.style.display = "none";
  };

  if (button === 2) {


    intro.style.display = "none";
    oversikt.style.display = "block";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
    sammenlign_table.style.display = "none";
  };

  if (button === 3) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "block";
    sammenligning.style.display = "none";
    sammenlign_table.style.display = "none";
  };

  if (button === 4) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "block";
    sammenlign_table.style.display = "block";
  };
};

































































//
