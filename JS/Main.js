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
  //this.onload = onload();

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
function f_sammenlign (utdanning_master, befolkning_master, sysselsatte_master) {

};
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


      console.log(befolkning_master[kommunenummer].informasjon.Menn["2017"]+ "her funker det heilt fint");
      // under her skriver du over det forrige kommunenummeret som du brukte i befolkning_master.
      //Du lager på en måte et nytt kommunenummer som egentlig hører til befolkning, men itte du bruker det under her,
      //"hører det til" sysselsatte.
      for (kommunenummer in sysselsatte_master) {
        if (input === sysselsatte_master[kommunenummer].kommunenummer){
      row.insertCell().innerText = JSON.stringify(sysselsatte_master[kommunenummer].sysselsetting[kommunenummer])+"%";
    }
  }

      row.insertCell().innerText = u_kvinner+" prosent av kvinner og "+u_menn+" prosent av menn";
      console.log(befolkning_master[kommunenummer].informasjon.Menn["2017"]+ "her bruker du informasjonen fra sysselseeting i befolkning, derfor blir det feil");
      console.log(befolkning_master[kommunenummer].informasjon.Menn["2017"] + " er dette riktig tall fra befolkning_master (Menn)?");
      row.insertCell().innerText = Math.round(befolkning_master[kommunenummer].informasjon.Kvinner["2017"]*u_kvinner/100)+" kvinner og "+Math.round(befolkning_master[kommunenummer].informasjon.Menn["2017"]/100*u_menn)+" menn";


      //HISTORISK UTVIKLING AV BEFOLKNING DESKTOP VERSJON
      for (kommunenummer in befolkning_master) {
      if (input === befolkning_master[kommunenummer].kommunenummer){
        console.log(befolkning_master[kommunenummer].informasjon.Menn["2017"]+ "her funker det fint igjen, fordi du har en ny for-løkke i befolkning, aka kommunenummeret blir overskrevet igjen");
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
      row.insertCell().innerText = "Antall prosent kvinner med høyere utdanning:"
      for (var i = 2007; i <= 2017; i++) {
         var antall_kvinner = uni_kort_kvinner2[i]+uni_lang_kvinner2[i]+fagskole_kvinner2[i];
         row.insertCell().innerText = antall_kvinner + "%";
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall prosent menn med høyere utdanning:"
      for (var i = 2007; i <= 2017; i++) {
         var antall_menn = uni_kort_menn2[i]+uni_lang_menn2[i]+fagskole_menn2[i];
         row.insertCell().innerText = antall_menn + "%";
      }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall kvinner med høyere utdanning:"
      var antall_kvinner = [];
      for (var i = 2007; i <= 2017; i++) {
         antall_kvinner.push(befolkning_master[kommunenummer].informasjon.Menn[i]);
       }
      for (var j = 0; j <= 10; j++) {
          total_antall = u_kvinner2[j];
          row.insertCell().innerText = Math.round(total_antall * antall_kvinner[j] /100);
        }

      row = tabellHistorisk_utdanning .insertRow();
      row.insertCell().innerText = "Antall menn med høyere utdanning:"
      var antall_menn = [];
      for (var i = 2007; i <= 2017; i++) {
         antall_menn.push(befolkning_master[kommunenummer].informasjon.Menn[i]);
       }

      for (var j = 0; j <= 10; j++) {
          total_antall = u_menn2[j];
          row.insertCell().innerText = Math.round(total_antall * antall_menn[j] /100);
        }

        console.log(befolkning_master[kommunenummer].informasjon.Menn["2017"] + " eller er dette riktig tall fra befolkning_master (Menn)?");
        console.log(befolkning_master[kommunenummer].informasjon.Menn["2017"]);
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
      document.getElementById("detaljer_oversikt_MOBIL").appendChild(tabellHTML);
      document.getElementById("kommunenavn").appendChild(kommuneNavn);
      document.getElementById("navn_historisk_MOBIL").appendChild(utvikling_navn);
      document.getElementById("historisk_utvikling_MOBIL").appendChild(tabellHistorisk);
      document.getElementById("navn_historisk_syssel_MOBIL").appendChild(utvikling_navn_syssel);
      document.getElementById("historisk_sysselsatte_MOBIL").appendChild(tabellHistorisk_sysselsatte);
      document.getElementById("navn_historisk_utdanning_MOBIL").appendChild(utvikling_navn_utdanning);
      document.getElementById("historisk_utdanning_MOBIL").appendChild(tabellHistorisk_utdanning);
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

   let høyestVekstMenn = [];
   let høyestVekstKvinner = [];

   //Lager vinner-ayyars, første kommune
   for (kommune in sysselsatte_master) {
     if (sysselsatte_master[kommune].kommunenummer===input1) {
       for (år in sysselsatte_master[kommune].informasjon.Kvinner){
         let verdi = sysselsatte_master[kommune].informasjon.Kvinner[år-1] - sysselsatte_master[kommune].informasjon.Kvinner[år];
         kvinner1.push(verdi);
         let verdi2 = sysselsatte_master[kommune].informasjon.Menn[år-1] - sysselsatte_master[kommune].informasjon.Menn[år];
         menn1.push(verdi2);
       }
     }//andre kommune
     if (sysselsatte_master[kommune].kommunenummer===input2) {
       for (år in sysselsatte_master[kommune].informasjon.Kvinner){
         let verdi = sysselsatte_master[kommune].informasjon.Kvinner[år-1] - sysselsatte_master[kommune].informasjon.Kvinner[år];
         kvinner2.push(verdi);
         let verdi2 = sysselsatte_master[kommune].informasjon.Menn[år-1] - sysselsatte_master[kommune].informasjon.Menn[år];
         menn2.push(verdi2);
       }
     }
    }
    for (i in  kvinner1){
      if ( kvinner1[i]>kvinner2[i]) {
        høyestVekstKvinner.push(1);
        }
      if ( kvinner1[i]<kvinner2[i]) {
        høyestVekstKvinner.push(0);
        }
      if ( kvinner1[i]===kvinner2[i]){
        høyestVekstKvinner.push("like");
      }
    }
    for (y in  menn1){
      if (menn1[y]>menn2[y]) {
        høyestVekstMenn.push(1);
        }
      if (menn1[y]<menn2[y]) {
        høyestVekstMenn.push(0);
        }
      if (menn1[y]===menn2[y]){
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

         if (høyestVekstMenn[count]===1){
           celle_menn1.classList.add("highest")
         }
         if (høyestVekstMenn[count]==="like"){
           celle_menn1.classList.add("like")
         }
         if (høyestVekstKvinner[count]===1){
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
         console.log(høyestVekstMenn);
         if (høyestVekstMenn[count]===0){
           celle_menn2.classList.add("highest")
         }
         if (høyestVekstKvinner[count]===0){
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

  document.getElementById("kommune1").appendChild(k1_table);
  document.getElementById("kommune1_navn").appendChild(kommune1_navn);
  document.getElementById("kommune2").appendChild(k2_table);
  document.getElementById("kommune2_navn").appendChild(kommune2_navn);
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
      f_sammenlign(utdanning_master,befolkning_master,sysselsatte_master);
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
