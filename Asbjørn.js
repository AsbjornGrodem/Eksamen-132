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
