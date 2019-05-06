function f_oversikt (utdanning_master, befolkning_master, sysselsatte_master) {
  var table = document.getElementById("Oversikt_table");
  let newRow = table.insertRow(-1);
  let newCell = newRow.insertCell(0);
  let newText = document.createTextNode('INPUT');

  for (kommune in sysselsatte_master){
    let navn = sysselsatte_master[kommune].navn;
    let kommunenummer = sysselsatte_master[kommune].kommunenummer;
    let info_Begge = sysselsatte_master[kommune].informasjon["Begge kjønn"];
    let count = 2018;                         //Må få til at den leter etter siste oppdaterte år, ikke statisk 2018;
    console.log("Kommune", navn, "Kommunenummer", kommunenummer, "I ", count, "var det ", info_Begge[count], "til sammen");
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

    var tabellHTML = '<table class="Sammenligning_div">';
    var tabellHTML2 = '<table class="Sammenligning_div">';
    var tabellHTML3 = '<table class="Sammenligning_div">';
    var tabellHTML4 = '<table class="Sammenligning_div">';

    for (kommune in sysselsatte_master){
      if (input1 === sysselsatte_master[kommune].kommunenummer){
        tabellHTML += '<tr>';
        tabellHTML2 += '<td>';
        tabellHTML2 += "Sysselsatte Kvinner i " + sysselsatte_master[kommune].navn;;
        tabellHTML2 += '</td>';
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
          tabellHTML += sysselsatte_master[kommune].informasjon.Menn[year];
          tabellHTML += '</td>';
          tabellHTML += '<td>';
          tabellHTML += year;
          tabellHTML += '</td>';
          tabellHTML += '</tr>';
        }
        for (year in sysselsatte_master[kommune].informasjon.Kvinner) {
          tabellHTML2 += '<tr>';
          tabellHTML2 += '<td>';
          tabellHTML2 += sysselsatte_master[kommune].informasjon.Kvinner[year];
          tabellHTML2 += '</td>';
          tabellHTML2 += '</tr>';
        }
      }

      if (input2 === sysselsatte_master[kommune].kommunenummer){
      tabellHTML3 += '<tr>';
      tabellHTML3 += '<td>';
      tabellHTML3 += "Sysselsatte Kvinner i " + sysselsatte_master[kommune].navn;;
      tabellHTML3 += '</td>';
      tabellHTML3 += '<td>';
      tabellHTML3 += "Sysselsatte Menn i "+ sysselsatte_master[kommune].navn;
      tabellHTML3 += '</td>';
      tabellHTML3 += '<td>';
      tabellHTML3 += "Årstall : ";
      tabellHTML3 += '</td>';
      tabellHTML3 += '</tr>';

      for (year in sysselsatte_master[kommune].informasjon.Menn) {
        tabellHTML3 += '<tr>';
        tabellHTML3 += '<td>';
        tabellHTML3 += sysselsatte_master[kommune].informasjon.Menn[year];
        tabellHTML3 += '</td>';
        tabellHTML3 += '<td>';
        tabellHTML3 += year;
        tabellHTML3 += '</td>';
        tabellHTML3 += '</tr>';
      }
      for (year in sysselsatte_master[kommune].informasjon.Kvinner) {
        tabellHTML4 += '<tr>';
        tabellHTML4 += '<td>';
        tabellHTML4 += sysselsatte_master[kommune].informasjon.Kvinner[year];
        tabellHTML4 += '</td>';
        tabellHTML4 += '</tr>';
      }
    }
  }
      tabellHTML += '</table>';
      document.getElementById("Sk2menn").innerHTML = tabellHTML;
      tabellHTML2 += '</table>';
      document.getElementById("Sk1menn").innerHTML = tabellHTML2;
      tabellHTML3 += '</table>';
      tabellHTML4 += '</table>';
      document.getElementById("Sk2kvinner").innerHTML = tabellHTML3;
      document.getElementById("Sk1kvinner").innerHTML = tabellHTML4;
}}






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
