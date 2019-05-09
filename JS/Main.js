var Beskrivelser_url = "http://wildboy.uib.no/~tpe056/folk/";
var Befolkning_url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
var Sysselsatte_url = "http://wildboy.uib.no/~tpe056/folk/100145.json";
var Utdanning_url = "http://wildboy.uib.no/~tpe056/folk/85432.json";
var intro = document.getElementById("Introduksjon_div");
var oversikt = document.getElementById("Oversikt_div");
var detaljer = document.getElementById("Detaljer_div");
var sammenligning = document.getElementById("Sammenligning_div");
var loading = document.getElementById('loading_div')
var b4 = document.getElementById("button4");
var b3 = document.getElementById("button3");
var b2 = document.getElementById("button2");
var b1 = document.getElementById("button1");



function Loadingmessage() {
  loading.innerText = "Vennligst vent, laster data...";
}
Loadingmessage();
function removeLoadingMessage() {
  loading.style.display = "none";
}

class Data {
  constructor(URL) {
    this.URL = URL;
    this.onload = null;
  }

  getIDs() {
    let nummerliste = [];
    for (let i in this.data) {
      nummerliste.push(this.data[i].kommunenummer)
    }
    return (nummerliste)
  }

  getNames() {
    var navnliste = [];
    for (kommunenavn in this.data) {
      navnliste.push(kommunenavn)
    }
    return (navnliste);
  }

  getInfo(kommunenummer) {

    for (let kommuneNavn in this.data) {
      let info = this.data[kommuneNavn];
      if (info.kommunenummer === kommunenummer) {
        return info;
      }
    }
  }

  // Legger til kommunenavnet blant resten av informasjonen til hver kommune
  appendNames() {
    for (let name in this.data) {
      this.data[name].kommunenavn = name;
    }
  }

  load() {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      let myArr = JSON.parse(xhr.responseText);
      this.data = myArr.elementer;

      this.appendNames();

      if (this.onload) {
        this.onload();
      }
    }
    xhr.open('GET', this.URL);
    xhr.send();
  }
}

function befolkning_total(data) {
  var total = [];
  var total_menn = [];
  var total_kvinner = [];
  var menn = data.Menn;
  var kvinner = data.Kvinner

  for (årstall in menn) {
    var antall = menn[årstall];
  }
  total_menn.push(antall)

  for (årstall in kvinner) {
    var antall = kvinner[årstall];
  }
  total_kvinner.push(antall)

  for (var i = 0; i < total_menn.length; i++) {
    total_menn[i]
  }

  for (var i = 0; i < total_kvinner.length; i++) {
    total.push(total_kvinner[i] + total_menn[i]);
  }
  return total
}

//Puss her ///////////////////////////////////////////////////////////////////////////////////////
function sysselSetting(data) {
  var siste_maaling = [];

  var info = data["Begge kjønn"];
  for (årstall in info) {
    var antall = info[årstall];
  }
  siste_maaling.push(antall);
  // NOTE: Hva gjør denne for-loopen?
  for (var i = 0; i < siste_maaling.length; i++) {
    siste_maaling[i]
  }
  // NOTE: Her returnerer du en array med ETT tall. Hvorfor
  return siste_maaling;
}

let befolkning = new Data(Befolkning_url);
let utdanning = new Data(Utdanning_url);
let sysselsatte = new Data(Sysselsatte_url);

let gjenstående = 3;

function callback() {
  gjenstående -= 1;
  if (gjenstående === 0) {
    setTimeout (function () {
      removeLoadingMessage();
      enableNavigationButtons();
      f_oversikt(befolkning);
      ;},1000);
  }
}

function enableNavigationButtons() {
  b1.style.display="inline";
  b2.style.display="inline";
  b3.style.display="inline";
  b4.style.display="inline";
}


befolkning.onload = utdanning.onload = sysselsatte.onload = callback;

befolkning.load();
utdanning.load();
sysselsatte.load();

function f_oversikt() {
  var overskrift = '<h3>'
  overskrift += 'Oversikt over alle kommuner i Norge';
  overskrift += '</h3>';

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

  let ids = befolkning.getIDs();

  for (let index in ids) {
    let id = ids[index];
    let info = befolkning.getInfo(id);
    tabellHTML += '<tr>';
    tabellHTML += '<td>';
    tabellHTML += info.kommunenavn;
    tabellHTML += '</td>';
    tabellHTML += '<td>';
    tabellHTML += id;
    tabellHTML += '</td>';
    tabellHTML += '<td>';
    let total = befolkning_total(info);
    tabellHTML += total[total.length - 1];
    tabellHTML += '</td>';
    tabellHTML += '</tr>';
  }
  tabellHTML += '</table>';
  document.getElementById("Oversikt_div").innerHTML += overskrift;
  document.getElementById("Oversikt_div").innerHTML += tabellHTML;

}

function setContents(elementId, childNode) {
  let element = document.getElementById(elementId);
  element.innerHTML = '';
  element.appendChild(childNode);
}

function detaljerClick() {
  let input = document.getElementById("Detaljer_input").value;

  let utdanningsInfo = utdanning.getInfo(input);
  let befolkningsInfo = befolkning.getInfo(input);
  let sysselsatteInfo = sysselsatte.getInfo(input);

  let uni_kort_menn = utdanningsInfo["03a"].Menn[2017];
  let uni_kort_kvinner = utdanningsInfo["03a"].Kvinner[2017];
  let uni_lang_menn = utdanningsInfo["04a"].Menn[2017];
  let uni_lang_kvinner = utdanningsInfo["04a"].Kvinner[2017];
  let fagskole_menn = utdanningsInfo["11"].Menn[2017];
  let fagskole_kvinner = utdanningsInfo["11"].Kvinner[2017];
  let u_kvinner = uni_kort_kvinner + uni_lang_kvinner + fagskole_kvinner;
  let u_menn = uni_kort_menn + uni_lang_menn + fagskole_menn;


  var kommuneNavn = document.createElement('h2');
  kommuneNavn.innerText = befolkningsInfo.kommunenavn + " kommune";
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
  row.insertCell().innerText = befolkningsInfo.kommunenavn;
  row.insertCell().innerText = befolkningsInfo.kommunenummer;

  let total = befolkning_total(befolkningsInfo);
  row.insertCell().innerText = total[total.length - 1];

  let sysselsetting = sysselSetting(sysselsatteInfo)
  row.insertCell().innerText = JSON.stringify(sysselsetting[0]) + "%";

  row.insertCell().innerText = u_kvinner + " prosent av kvinner og " + u_menn + " prosent av menn";
  row.insertCell().innerText = Math.round(befolkningsInfo.Kvinner["2017"] * u_kvinner / 100) + " kvinner og " + Math.round(befolkningsInfo.Menn["2017"] / 100 * u_menn) + " menn";


  //HISTORISK UTVIKLING AV BEFOLKNING
  var utvikling_navn = document.createElement('h3');
  utvikling_navn.innerText = "Historisk utvikling av befolkning i " + befolkningsInfo.kommunenavn + " kommune";
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
    var antall_kvinner = befolkningsInfo.Kvinner;
    row.insertCell().innerText = antall_kvinner[i];
  }

  row = tabellHistorisk.insertRow();
  row.insertCell().innerText = "Antall menn:"
  for (var i = 2007; i < 2019; i++) {
    var antall_menn = befolkningsInfo.Menn;
    row.insertCell().innerText = antall_menn[i];
  }

  //HISTORISK UTVIKLING AV SYSSELSETTING

  var utvikling_navn_syssel = document.createElement('h3');
  utvikling_navn_syssel.innerText = "Historisk utvikling av sysselsetting i " + sysselsatteInfo.kommunenavn + " kommune";
  var tabellHistorisk_sysselsatte = document.createElement('table');
  tabellHistorisk_sysselsatte.id = "historisk_sysselsatte";


  var row = tabellHistorisk_sysselsatte.insertRow();
  row.insertCell().innerText = "År:"
  for (var i = 2007; i < 2019; i++) {
    row.insertCell().innerText = i;
  }

  row = tabellHistorisk_sysselsatte.insertRow();
  row.insertCell().innerText = "Antall kvinner:"
  for (var i = 2007; i < 2019; i++) {
    var antall_kvinner = sysselsatteInfo.Kvinner;
    row.insertCell().innerText = antall_kvinner[i];
  }

  row = tabellHistorisk_sysselsatte.insertRow();
  row.insertCell().innerText = "Antall menn:"
  for (var i = 2007; i < 2019; i++) {
    var antall_menn = sysselsatteInfo.Menn;
    row.insertCell().innerText = antall_menn[i];
  }

  //HISTORISK UTVIKLING AV UTDANNING

  let uni_kort_menn2 = utdanningsInfo["03a"].Menn;
  let uni_kort_kvinner2 = utdanningsInfo["03a"].Kvinner;
  let uni_lang_menn2 = utdanningsInfo["04a"].Menn;
  let uni_lang_kvinner2 = utdanningsInfo["04a"].Kvinner;
  let fagskole_menn2 = utdanningsInfo["11"].Menn;
  let fagskole_kvinner2 = utdanningsInfo["11"].Kvinner;

  let u_kvinner2 = [];
  for (var i = 2007; i <= 2017; i++) {
    u_kvinner2.push(uni_kort_kvinner2[i] + uni_lang_kvinner2[i] + fagskole_kvinner2[i]);
  }

  let u_menn2 = [];
  for (var i = 2007; i <= 2017; i++) {
    u_menn2.push(uni_kort_menn2[i] + uni_lang_menn2[i] + fagskole_menn2[i]);
  }

  var utvikling_navn_utdanning = document.createElement('h3');
  utvikling_navn_utdanning.innerText = "Historisk utvikling av utdanning i " + befolkningsInfo.kommunenavn + " kommune";
  var tabellHistorisk_utdanning = document.createElement('table');
  tabellHistorisk_utdanning.id = "historisk_sysselsatte";

  var row = tabellHistorisk_utdanning.insertRow();
  row.insertCell().innerText = "År:"
  for (var i = 2007; i <= 2017; i++) {
    row.insertCell().innerText = i;
  }

  row = tabellHistorisk_utdanning.insertRow();
  row.insertCell().innerText = "Antall prosent kvinner med høyere utdanning:"
  for (var i = 2007; i <= 2017; i++) {
    var antall_kvinner = Math.round(uni_kort_kvinner2[i] + uni_lang_kvinner2[i] + fagskole_kvinner2[i]);
    row.insertCell().innerText = antall_kvinner + "%";
  }

  row = tabellHistorisk_utdanning.insertRow();
  row.insertCell().innerText = "Antall prosent menn med høyere utdanning:"
  for (var i = 2007; i <= 2017; i++) {
    var antall_menn = Math.round(uni_kort_menn2[i] + uni_lang_menn2[i] + fagskole_menn2[i]);
    row.insertCell().innerText = antall_menn + "%";
  }

  row = tabellHistorisk_utdanning.insertRow();
  row.insertCell().innerText = "Antall kvinner med høyere utdanning:"
  var antall_kvinner = [];
  for (var i = 2007; i <= 2017; i++) {
    antall_kvinner.push(befolkningsInfo.Kvinner[i]);
  }
  for (var j = 0; j <= 10; j++) {
    total_antall = u_kvinner2[j];
    row.insertCell().innerText = Math.round(total_antall * antall_kvinner[j] / 100);
  }

  row = tabellHistorisk_utdanning.insertRow();
  row.insertCell().innerText = "Antall menn med høyere utdanning:"
  var antall_menn = [];
  for (var i = 2007; i <= 2017; i++) {
    antall_menn.push(befolkningsInfo.Menn[i]);
  }

  for (var j = 0; j <= 10; j++) {
    total_antall = u_menn2[j];
    row.insertCell().innerText = Math.round(total_antall * antall_menn[j] / 100);
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

function sammenlign_click() {
  let input1 = document.getElementById("Sammenlign1_input").value;
  let input2 = document.getElementById("Sammenlign2_input").value;
  var k1_table = document.createElement('table');
  var k2_table = document.createElement('table');

  var kvinner1 = [];
  var kvinner2 = [];
  var menn1 = [];
  var menn2 = [];

  let høyestVekstMenn = [null];
  let høyestVekstKvinner = [null];

  let info1 = sysselsatte.getInfo(input1);
  let info2 = sysselsatte.getInfo(input2);

  //Lager vinner-ayyars, første kommune
  {
    let forrigeVerdiKvinner = undefined;
    let forrigeVerdiMenn = undefined;

    for (år in info1.Kvinner) {
      let verdiKvinner = info1.Kvinner[år];
      if (forrigeVerdiKvinner !== undefined) {
        kvinner1.push(verdiKvinner - forrigeVerdiKvinner);
      }
      forrigeVerdiKvinner = verdiKvinner;

      let verdiMenn = info1.Menn[år];
      if (forrigeVerdiMenn !== undefined) {
        menn1.push(verdiMenn - forrigeVerdiMenn);
      }
      forrigeVerdiMenn = verdiMenn;
    }
  }

  //andre kommune
  let forrigeVerdiKvinner = undefined;
  let forrigeVerdiMenn = undefined;
  for (år in info2.Kvinner) {
    let verdiKvinner = info2.Kvinner[år];
    if (forrigeVerdiKvinner !== undefined) {
      kvinner2.push(verdiKvinner - forrigeVerdiKvinner);
    }
    forrigeVerdiKvinner = verdiKvinner;

    let verdiMenn = info2.Menn[år];
    if (forrigeVerdiMenn !== undefined) {
      menn2.push(verdiMenn - forrigeVerdiMenn);
    }
    forrigeVerdiMenn = verdiMenn;
  }

  // Noter hvem som har høyest vekst per år
  for (i in kvinner1) {
    if (kvinner1[i] > kvinner2[i]) {
      høyestVekstKvinner.push(0);
    } else if (kvinner1[i] < kvinner2[i]) {
      høyestVekstKvinner.push(1);
    } else {
      høyestVekstKvinner.push("like");
    }
  }
  for (y in menn1) {
    if (menn1[y] > menn2[y]) {
      høyestVekstMenn.push(0);
    } else if (menn1[y] < menn2[y]) {
      høyestVekstMenn.push(1);
    } else {
      høyestVekstMenn.push("like");
    }
  }

  //Lager tabeller
  //Tabell1
  {
    var kommune1_navn = document.createElement('h2');
    kommune1_navn.innerText = info1.kommunenavn;
    k1_table.id = "k1_table";

    var row = k1_table.insertRow();
    row.insertCell().innerText = "År";
    row.insertCell().innerText = "Menn";
    row.insertCell().innerText = "Kvinner";
    let count = 0;

    for (år in info1.Menn) {

      var row = k1_table.insertRow();
      let celle_år = row.insertCell();
      let celle_menn1 = row.insertCell();
      let celle_kvinner1 = row.insertCell();

      celle_menn1.innerText = info1.Menn[år];
      celle_kvinner1.innerText = info1.Kvinner[år];
      celle_år.innerText = år;

      if (høyestVekstMenn[count] === 0) {
        celle_menn1.classList.add("highest")
      }
      if (høyestVekstMenn[count] === "like") {
        celle_menn1.classList.add("like")
      }
      if (høyestVekstKvinner[count] === 0) {
        celle_kvinner1.classList.add("highest")
      }
      if (høyestVekstKvinner[count] === "like") {
        celle_kvinner1.classList.add("like")
      }

      count = count + 1;
    }
  }

  //Tabell2
  var kommune2_navn = document.createElement('h2');
  kommune2_navn.innerText = info2.kommunenavn;
  k2_table.id = "k2_table";
  var row = k2_table.insertRow();
  row.insertCell().innerText = "År";
  row.insertCell().innerText = "Menn";
  row.insertCell().innerText = "Kvinner";
  let count = 0;
  for (år in info2.Menn) {

    var row = k2_table.insertRow();
    let celle_år = row.insertCell();
    let celle_menn2 = row.insertCell();
    let celle_kvinner2 = row.insertCell();

    celle_menn2.innerText = info2.Menn[år];
    celle_kvinner2.innerText = info2.Kvinner[år];
    celle_år.innerText = år;
    //  console.log(høyestVekstMenn);
    if (høyestVekstMenn[count] === 1) {
      celle_menn2.classList.add("highest")
    }
    if (høyestVekstKvinner[count] === 1) {
      celle_kvinner2.classList.add("highest")
    }
    if (høyestVekstMenn[count] === "like") {
      celle_menn2.classList.add("like")
    }
    if (høyestVekstKvinner[count] === "like") {
      celle_kvinner2.classList.add("like")
    }
    count = count + 1;

  }

  setContents("kommune1", k1_table);
  setContents("kommune1_navn", kommune1_navn);
  setContents("kommune2", k2_table);
  setContents("kommune2_navn", kommune2_navn);
}

//Button funksjoner som viser/gjemmer divs
function show(button) {

  if (button === 1) {

    intro.style.display = "block";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
    // footer.style.display = "block";
  };

  if (button === 2) {

    intro.style.display = "none";
    oversikt.style.display = "block";
    detaljer.style.display = "none";
    sammenligning.style.display = "none";
    // footer.style.display = "block";

  };

  if (button === 3) {

    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "block";
    sammenligning.style.display = "none";
    // footer.style.display = "block";

  };

  if (button === 4) {

    intro.style.display = "none";
    oversikt.style.display = "none";
    detaljer.style.display = "none";
    sammenligning.style.display = "block";
    // footer.style.display = "block";

    };
};
