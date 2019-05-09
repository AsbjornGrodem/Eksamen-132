var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url =  "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");
var footer = document.getElementById("footer")

//Jeg har endret noe mer

function Konstruktor(array, input) {
  this.navn = input;
  this.nummerliste = getIds(array);
  this.kommunenummer = getNumber(array);
  this.navneliste = getNames(array);
  this.informasjon = getInfo(array);
  this.total_befolkning = befolkning_total(array);
  this.sysselsetting = sysselSetting(array);
  this.onload = function () {
    if (typeof this.onload ==='function')
    this.onload();
  };


function getIds(array) {
  let nummerliste = [];
  for (i in array) {
    nummerliste.push(array[i].kommunenummer)
  }
  this.nummerliste = nummerliste;
  return (nummerliste);
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

  var overskrift = '<h2>'
  overskrift += 'Oversikt over alle kommuner i Norge';
  overskrift += '</h2>';

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
    document.getElementById("Oversikt_div").innerHTML += overskrift;
  document.getElementById("Oversikt_div").innerHTML += tabellHTML;

}
function setContents(elementId, childNode) {
  console.log(elementId);
  let element = document.getElementById(elementId);
  element.innerHTML = '';
  element.appendChild(childNode);
}
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

      for (kommunenummer2 in sysselsatte_master) {
        if (input === sysselsatte_master[kommunenummer2].kommunenummer){
      row.insertCell().innerText = JSON.stringify(sysselsatte_master[kommunenummer2].sysselsetting[kommunenummer2])+"%";
    }
  }

      row.insertCell().innerText = u_kvinner+" prosent av kvinner og "+u_menn+" prosent av menn";
      row.insertCell().innerText = Math.round(befolkning_master[kommunenummer].informasjon.Kvinner["2017"]*u_kvinner/100)+" kvinner og "+Math.round(befolkning_master[kommunenummer].informasjon.Menn["2017"]/100*u_menn)+" menn";


      //HISTORISK UTVIKLING AV BEFOLKNING DESKTOP VERSJON
      for (kommunenummer in befolkning_master) {
      if (input === befolkning_master[kommunenummer].kommunenummer){
      var utvikling_navn = document.createElement('h3');
      utvikling_navn.innerText = "Historisk utvikling av befolkning i " + befolkning_master[kommunenummer].navn + " kommune";
      var tabellHistorisk = document.createElement('table');
      tabellHistorisk.id = "historisk_utvikling";

      var row = tabellHistorisk.insertRow();
      row.insertCell().innerText = "År:"
      for (var i = 2007; i < 2019; i++) {
        row.insertCell().innerText = i;
      }

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
    }
  }

      //HISTORISK UTVIKLING AV SYSSELSETTING DESKTOP VERSJON

      for (kommunenummer in sysselsatte_master) {
      if (input === sysselsatte_master[kommunenummer].kommunenummer){
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
    }
  }

      //HISTORISK UTVIKLING AV UTDANNING DESKTOP VERSJON

      for (kommunenummer in utdanning_master) {
      if (input === utdanning_master[kommunenummer].kommunenummer){
        let uni_kort_menn2 = utdanning_master[kommunenummer].informasjon["03a"].Menn;
        let uni_kort_kvinner2 = utdanning_master[kommunenummer].informasjon["03a"].Kvinner;
        let uni_lang_menn2 = utdanning_master[kommunenummer].informasjon["04a"].Menn;
        let uni_lang_kvinner2 = utdanning_master[kommunenummer].informasjon["04a"].Kvinner;
        let fagskole_menn2 = utdanning_master[kommunenummer].informasjon["11"].Menn;
        let fagskole_kvinner2 = utdanning_master[kommunenummer].informasjon["11"].Kvinner;

        let u_kvinner2 = [];
        for (var i = 2007; i <= 2017; i++) {
          u_kvinner2.push(uni_kort_kvinner2[i]+uni_lang_kvinner2[i]+fagskole_kvinner2[i]);
      }

        let u_menn2 = [];
        for (var i = 2007; i <= 2017; i++) {
          u_menn2.push(uni_kort_menn2[i]+uni_lang_menn2[i]+fagskole_menn2[i]);
      }

      var utvikling_navn_utdanning = document.createElement('h3');
      utvikling_navn_utdanning.innerText = "Historisk utvikling av utdanning i " + befolkning_master[kommunenummer].navn + " kommune";
      var tabellHistorisk_utdanning = document.createElement('table');
      tabellHistorisk_utdanning .id = "historisk_sysselsatte";

      var row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "År:"
      for (var i = 2007; i <= 2017; i++) {
        row.insertCell().innerText = i;
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Kvinner med høyere utdanning:"
      for (var i = 2007; i <= 2017; i++) {
         var antall_kvinner = Math.round(uni_kort_kvinner2[i]+uni_lang_kvinner2[i]+fagskole_kvinner2[i]);
         row.insertCell().innerText = antall_kvinner + "%";
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Menn med høyere utdanning:"
      for (var i = 2007; i <= 2017; i++) {
         var antall_menn = Math.round(uni_kort_menn2[i]+uni_lang_menn2[i]+fagskole_menn2[i]);
         row.insertCell().innerText = antall_menn + "%";
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall kvinner :"
      var antall_kvinner = [];
      for (var i = 2007; i <= 2017; i++) {
         antall_kvinner.push(befolkning_master[kommunenummer].informasjon.Kvinner[i]);
       }
      for (var j = 0; j <= 10; j++) {
          total_antall = u_kvinner2[j];
          row.insertCell().innerText = Math.round(total_antall * antall_kvinner[j] /100);
        }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall menn :"
      var antall_menn = [];
      for (var i = 2007; i <= 2017; i++) {
         antall_menn.push(befolkning_master[kommunenummer].informasjon.Menn[i]);
       }

      for (var j = 0; j <= 10; j++) {
          total_antall = u_menn2[j];
          row.insertCell().innerText = Math.round(total_antall * antall_menn[j] /100);
        }
    }
  }
      setContents("detaljer_oversikt", tabellHTML);
      setContents("kommunenavn", kommuneNavn);
      setContents("navn_historisk", utvikling_navn);
      setContents("historisk_utvikling", tabellHistorisk);
      setContents("navn_historisk_syssel", utvikling_navn_syssel);
      setContents("historisk_sysselsatte", tabellHistorisk_sysselsatte);
      setContents("navn_historisk_utdanning", utvikling_navn_utdanning);
      setContents("historisk_utdanning", tabellHistorisk_utdanning);
    }
  }


//MOBIL VERSJON


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

      var tabellHTML = document.createElement('table');
      tabellHTML.id = "detaljer_oversikt_MOBIL";
      tabellHTML.innerHTML = "";



        var row = tabellHTML.insertRow();
        row.insertCell().innerText = "Kommunenavn: ";
        row.insertCell().innerText = befolkning_master[kommunenummer].navn;
        row = tabellHTML.insertRow();
        row.insertCell().innerText = "Kommunenummer: ";
        row.insertCell().innerText = befolkning_master[kommunenummer].kommunenummer;
        row = tabellHTML.insertRow();
        row.insertCell().innerText = "Total befolkning: ";
        row.insertCell().innerText = befolkning_master[kommunenummer].total_befolkning[kommunenummer];
        row = tabellHTML.insertRow();
        row.insertCell().innerText = "Sysselsatt";
        for (kommunenummer in sysselsatte_master) {
          if (input === sysselsatte_master[kommunenummer].kommunenummer){
        row.insertCell().innerText = JSON.stringify(sysselsatte_master[kommunenummer].sysselsetting[kommunenummer])+"%";
      }
    }
        row = tabellHTML.insertRow();
        row.insertCell().innerText = "Høyere utdanning (fra 2017) ";
        row.insertCell().innerText = u_kvinner+" prosent av kvinner og "+u_menn+" prosent av menn";
        row = tabellHTML.insertRow();
        row.insertCell().innerText = "Høyere utdanning (fra 2017) ";
        row.insertCell().innerText = Math.round(befolkning_master[kommunenummer].informasjon.Kvinner["2017"]*u_kvinner/100)+" kvinner og "+Math.round(befolkning_master[kommunenummer].informasjon.Menn["2017"]/100*u_menn)+" menn";


      //HISTORISK UTVIKLING AV BEFOLKNING MOBIL VERSJON
      for (kommunenummer in befolkning_master) {
      if (input === befolkning_master[kommunenummer].kommunenummer){
      var utvikling_navn = document.createElement('h3');
      utvikling_navn.innerText = "Historisk utvikling av befolkning i " + befolkning_master[kommunenummer].navn + " kommune";
      var tabellHistorisk = document.createElement('table');
      tabellHistorisk.id = "historisk_utvikling";


      var row = tabellHistorisk.insertRow();
      row.insertCell().innerText = "År:"
      row.insertCell().innerText = "Antall kvinner:"
      row.insertCell().innerText = "Antall menn:"

      for (var i = 2007; i <= 2018; i++) {
        row = tabellHistorisk.insertRow();
        row.insertCell().innerText = i;
        var antall_kvinner = befolkning_master[kommunenummer].informasjon.Kvinner;
        row.insertCell().innerText = antall_kvinner[i];
        var antall_menn = befolkning_master[kommunenummer].informasjon.Menn;
        row.insertCell().innerText = antall_menn[i];
      }
    }
  }
      //HISTORISK UTVIKLING AV SYSSELSETTING MOBIL VERSJON

      for (kommunenummer in sysselsatte_master) {
      if (input === sysselsatte_master[kommunenummer].kommunenummer){
      var utvikling_navn_syssel = document.createElement('h3');
      utvikling_navn_syssel.innerText = "Historisk utvikling av sysselsetting i " + sysselsatte_master[kommunenummer].navn + " kommune";
      var tabellHistorisk_sysselsatte = document.createElement('table');
      tabellHistorisk_sysselsatte .id = "historisk_sysselsatte";


      var row = tabellHistorisk_sysselsatte.insertRow();
      row.insertCell().innerText = "År:"
      row.insertCell().innerText = "Antall kvinner:"
      row.insertCell().innerText = "Antall menn:"

      for (var i = 2007; i <= 2018; i++) {
        row = tabellHistorisk_sysselsatte.insertRow();
        row.insertCell().innerText = i;
        var antall_kvinner = sysselsatte_master[kommunenummer].informasjon.Kvinner;
        row.insertCell().innerText = antall_kvinner[i];
        var antall_menn = sysselsatte_master[kommunenummer].informasjon.Menn;
        row.insertCell().innerText = antall_menn[i];
      }
    }
  }
      //HISTORISK UTVIKLING AV UTDANNING MOBIL VERSJON

      for (kommunenummer in utdanning_master) {
      if (input === utdanning_master[kommunenummer].kommunenummer){
      var utvikling_navn_utdanning = document.createElement('h3');
      utvikling_navn_utdanning.innerText = "Historisk utvikling av utdanning i " + befolkning_master[kommunenummer].navn + " kommune";
      var tabellHistorisk_utdanning = document.createElement('table');
      tabellHistorisk_utdanning .id = "historisk_sysselsatte";

      var row = tabellHistorisk_utdanning.insertRow();
      row.insertCell().innerText = "År:"
      row.insertCell().innerText = "Antall kvinner:"
      row.insertCell().innerText = "Antall menn:"

      for (var i = 1980; i <= 2017; i++) {
        row = tabellHistorisk_utdanning.insertRow();
        row.insertCell().innerText = i;
        var antall_kvinner = utdanning_master[kommunenummer].informasjon["04a"].Kvinner;
        row.insertCell().innerText = antall_kvinner[i];
        var antall_menn = utdanning_master[kommunenummer].informasjon["04a"].Menn;
        row.insertCell().innerText = antall_menn[i];
      }
    }
  }
      setContents("detaljer_oversikt_MOBIL", tabellHTML);
      setContents("kommunenavn", kommuneNavn);
      setContents("navn_historisk_MOBIL", utvikling_navn);
      setContents("historisk_utvikling_MOBIL", tabellHistorisk);
      setContents("navn_historisk_syssel_MOBIL", utvikling_navn_syssel);
      setContents("historisk_sysselsatte_MOBIL", tabellHistorisk_sysselsatte);
      setContents("navn_historisk_utdanning_MOBIL", utvikling_navn_utdanning);
      setContents("historisk_utdanning_MOBIL", tabellHistorisk_utdanning);
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

   var idmenn1 = [];
   var idkvinner1 = [];
   var idmenn2 = [];
   var idkvinner2 = [];
   var kvinner1 = [];
   var kvinner2 = [];
   var menn1 = [];
   var menn2 = [];

   // Første året er veksten udefinert, så ingen har høyest vekst her.
   let høyestVekstMenn = [null];
   let høyestVekstKvinner = [null];

   //Lager vinner-ayyars, første kommune
   for (kommune in sysselsatte_master) {
     if (sysselsatte_master[kommune].kommunenummer===input1) {
       let forrigeVerdiKvinner = undefined;
       let forrigeVerdiMenn = undefined;

       for (år in sysselsatte_master[kommune].informasjon.Kvinner) {
         let verdiKvinner = sysselsatte_master[kommune].informasjon.Kvinner[år];
         if (forrigeVerdiKvinner !== undefined) {
           kvinner1.push(verdiKvinner - forrigeVerdiKvinner);
         }
         forrigeVerdiKvinner = verdiKvinner;

         let verdiMenn = sysselsatte_master[kommune].informasjon.Menn[år];
         if (forrigeVerdiMenn !== undefined) {
           menn1.push(verdiMenn - forrigeVerdiMenn);
         }
         forrigeVerdiMenn = verdiMenn;
       }
     }//andre kommune
     if (sysselsatte_master[kommune].kommunenummer === input2) {
       let forrigeVerdiKvinner = undefined;
       let forrigeVerdiMenn = undefined;
       for (år in sysselsatte_master[kommune].informasjon.Kvinner) {
         let verdiKvinner = sysselsatte_master[kommune].informasjon.Kvinner[år];
         if (forrigeVerdiKvinner !== undefined) {
           kvinner2.push(verdiKvinner - forrigeVerdiKvinner);
         }
         forrigeVerdiKvinner = verdiKvinner;

         let verdiMenn = sysselsatte_master[kommune].informasjon.Menn[år];
         if (forrigeVerdiMenn !== undefined) {
           menn2.push(verdiMenn - forrigeVerdiMenn);
         }
         forrigeVerdiMenn = verdiMenn;
       }
     }
    }
    for (i in  kvinner1){
      if ( kvinner1[i]>kvinner2[i]) {
        høyestVekstKvinner.push(0);
        }
      else if ( kvinner1[i]<kvinner2[i]) {
        høyestVekstKvinner.push(1);
        }
      else {
        høyestVekstKvinner.push("like");
      }
    }
    for (y in  menn1){
      if (menn1[y]>menn2[y]) {
        høyestVekstMenn.push(0);
        }
      else if (menn1[y]<menn2[y]) {
        høyestVekstMenn.push(1);
        }
      else {
        høyestVekstMenn.push("like");
      }
    }

    //Lager tabeller
   for (kommune in sysselsatte_master) {
      //Tabell1
    if (sysselsatte_master[kommune].kommunenummer===input1) {
       var kommune1_navn = document.createElement('h2');
       kommune1_navn.innerText = sysselsatte_master[kommune].navn;
       k1_table.id = "k1_table";

       var row = k1_table.insertRow();
       row.insertCell().innerText = "År";
       row.insertCell().innerText = "Menn";
       row.insertCell().innerText = "Kvinner";
       let count = 0;

       for (år in sysselsatte_master[kommune].informasjon.Menn) {

         var row = k1_table.insertRow();
         let celle_år = row.insertCell();
         let celle_menn1 = row.insertCell();
         let celle_kvinner1 = row.insertCell();

         celle_menn1.innerText = sysselsatte_master[kommune].informasjon.Menn[år];
         celle_kvinner1.innerText = sysselsatte_master[kommune].informasjon.Kvinner[år];
         celle_år.innerText = år;

         if (høyestVekstMenn[count]===0){
           celle_menn1.classList.add("highest")
         }
         if (høyestVekstMenn[count]==="like"){
           celle_menn1.classList.add("like")
         }
         if (høyestVekstKvinner[count]===0){
           celle_kvinner1.classList.add("highest")
         }
         if (høyestVekstKvinner[count]==="like"){
           celle_kvinner1.classList.add("like")
         }

         count = count+1;
       }
      }

    //Tabell2
    if (sysselsatte_master[kommune].kommunenummer===input2) {
       var kommune2_navn = document.createElement('h2');
       kommune2_navn.innerText = sysselsatte_master[kommune].navn;
       k2_table.id = "k2_table";
       var row = k2_table.insertRow();
       row.insertCell().innerText = "År";
       row.insertCell().innerText = "Menn";
       row.insertCell().innerText = "Kvinner";
       let count = 0;
       for (år in sysselsatte_master[kommune].informasjon.Menn) {

         var row = k2_table.insertRow();
         let celle_år = row.insertCell();
         let celle_menn2 = row.insertCell();
         let celle_kvinner2 = row.insertCell();

         celle_menn2.innerText = sysselsatte_master[kommune].informasjon.Menn[år];
         celle_kvinner2.innerText = sysselsatte_master[kommune].informasjon.Kvinner[år];
         celle_år.innerText = år;
        //  console.log(høyestVekstMenn);
         if (høyestVekstMenn[count]===1){
           celle_menn2.classList.add("highest")
         }
         if (høyestVekstKvinner[count]===1){
           celle_kvinner2.classList.add("highest")
         }
         if (høyestVekstMenn[count]==="like"){
           celle_menn2.classList.add("like")
         }
         if (høyestVekstKvinner[count]==="like"){
           celle_kvinner2.classList.add("like")
         }
         count = count+1;

       }
     }
  }

  setContents("kommune1", k1_table);
  setContents("kommune1_navn", kommune1_navn);
  setContents("kommune2", k2_table);
  setContents("kommune2_navn", kommune2_navn);
  })
}
function detaljerClick() {
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
          f_detaljer(utdanning_master, befolkning_master, sysselsatte_master);
      })
    })
  })
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
      f_oversikt (befolkning_master)
    })
  })
})

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
    footer.style.display = "block";
  };

  if (button === 2) {


    intro.style.display = "none";
    oversikt.style.display = "block";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
    footer.style.display = "block";

  };

  if (button === 3) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "block";
    sammenligning.style.display = "none";
    footer.style.display = "block";

  };

  if (button === 4) {


    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "block";
    footer.style.display = "block";

  };
};
