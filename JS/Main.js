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
  this.høyereUtdanning_total = høyereUtdanning_total(array);

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

    for (kommune in sysselsetting) {

    if (input_detaljer === sysselsetting[kommune].kommunenummer) {

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
<<<<<<< HEAD
}
}


  function høyereUtdanning_total(kjønn) {

    var total = [];
    var total_menn = [];
    var total_kvinner = [];
    for (kategorier in kjønn) {
      if (kategorier === "04a") {


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
  }
}
    return total
  }

=======
>>>>>>> 3ac7334a76a603bc6b82b7487f3b9ab9938a8d84
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

  load(Sysselsatte_url, function(array) {
    let sysselsatte_master = [];
    for (x in array) {
      let kommune = new Konstruktor(array, x)
      sysselsatte_master.push(kommune);}


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
      tabellHTML += "Kommunenavn:  ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Kommunenummer:  ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Total befolkning:  ";
      tabellHTML += '</td>';
      tabellHTML += '<td>';
      tabellHTML += "Sysselsetting:  ";
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
      tabellHTML += sysselsatte_master[kommunenummer].høyereUtdanning_total[kommunenummer];
      tabellHTML += '</td>';
      tabellHTML += '</tr>';

      tabellHTML += '</table>';
      document.getElementById("detaljer_oversikt").innerHTML = tabellHTML;
      document.getElementById("kommunenavn").innerHTML = kommuneNavn;
    }

  }

  var input_detaljer = document.getElementById("Detaljer_input");

  var siste_maaling = [];

  for (kommune in sysselsatte_master) {

    if (input_detaljer === sysselsatte_master[kommune].kommunenummer) {

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
    var table1 = document.getElementById("Sk1menn");
    var table2 = document.getElementById("Sk1kvinner");
    var table3 = document.getElementById("Sk2menn");
    var table4 = document.getElementById("Sk2kvinner");

    var tabellHTML = '<table class="Sammenligning_div">';
    var tabellHTML2 = '<table class="Sammenligning_div">';
    for (kommune in sysselsatte_master){
      if (input1 === sysselsatte_master[kommune].kommunenummer){
        tabellHTML += '<tr>';
        tabellHTML += '<td>';
        tabellHTML += "Sysselsatte Kvinner i " + sysselsatte_master[kommune].navn;;
        tabellHTML += '</td>';
        tabellHTML += '<td>';
        tabellHTML += "Sysselsatte Menn i "+ sysselsatte_master[kommune].navn;
        tabellHTML += '</td>';
        tabellHTML += '<td>';
        tabellHTML += "Årstall : ";
        tabellHTML += '</td>';
        tabellHTML += '</tr>';

        for (year in sysselsatte_master[kommune].informasjon.Menn) {
          tabellHTML += '<tr>';
          tabellHTML += '<td>';
          tabellHTML += '</td>';
          tabellHTML += '<td>';
          tabellHTML += sysselsatte_master[kommune].informasjon.Menn[year];
          tabellHTML += '</td>';
          tabellHTML += '<td>';
          tabellHTML += year;
          tabellHTML += '</td>';
          tabellHTML += '</tr>';
        }
        for (year in sysselsatte_master[kommune].informasjon.Kvinner) {
          tabellHTML += '<tr>';
          tabellHTML += '<td>';
          tabellHTML += sysselsatte_master[kommune].informasjon.Kvinner[year];
          tabellHTML += '</td>';
          tabellHTML += '</tr>';
        }
      }

      if (input2 === sysselsatte_master[kommune].kommunenummer){
      tabellHTML2 += '<tr>';
      tabellHTML2 += '<td>';
      tabellHTML2 += "Sysselsatte Kvinner i " + sysselsatte_master[kommune].navn;;
      tabellHTML2 += '</td>';
      tabellHTML2 += '<td>';
      tabellHTML2 += "Sysselsatte Menn i "+ sysselsatte_master[kommune].navn;
      tabellHTML2 += '</td>';
      tabellHTML2 += '<td>';
      tabellHTML2 += "Årstall : ";
      tabellHTML2 += '</td>';
      tabellHTML2 += '</tr>';

      for (year in sysselsatte_master[kommune].informasjon.Menn) {
        tabellHTML2 += '<tr>';
        tabellHTML2 += '<td>';
        tabellHTML2 += '</td>';
        tabellHTML2 += '<td>';
        tabellHTML2 += sysselsatte_master[kommune].informasjon.Menn[year];
        tabellHTML2 += '</td>';
        tabellHTML2 += '<td>';
        tabellHTML2 += year;
        tabellHTML2 += '</td>';
        tabellHTML2 += '</tr>';
      }
      for (year in sysselsatte_master[kommune].informasjon.Kvinner) {
        tabellHTML2 += '<tr>';
        tabellHTML2 += '<td>';
        tabellHTML2 += sysselsatte_master[kommune].informasjon.Kvinner[year];
        tabellHTML2 += '</td>';
        tabellHTML2 += '</tr>';
      }
    }
  }
    tabellHTML2 += '</table>';
    document.getElementById("Sk2menn").innerHTML = tabellHTML2;
    tabellHTML += '</table>';
    document.getElementById("Sk1menn").innerHTML = tabellHTML;
    console.log(tabellHTML);
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
