function f_detaljer (utdanning_master, befolkning_master, sysselsatte_master) {
  let input = document.getElementById("Detaljer_input").value;
  for (kommunenummer in befolkning_master){
    if (input === befolkning_master[kommunenummer].kommunenummer){
      var kommuneNavn = document.createElement('h2');
      kommuneNavn.innerText = befolkning_master[kommunenummer].navn + " kommune";
      var tabellHTML = document.createElement('table');
      tabellHTML.id = "Detaljer_output";

      var row = tabellHTML.insertRow();
      row.insertCell().innerText = "Kommunenavn: ";
      row.insertCell().innerText = "Kommunenummer: ";
      row.insertCell().innerText = "Total befolkning: ";
      row.insertCell().innerText = "Sysselsetting og høyere utdanning: ";
      row.insertCell().innerText = "Høyere utdanning: ";

      row = tabellHTML.insertRow();
      row.insertCell().innerText = befolkning_master[kommunenummer].navn;
      row.insertCell().innerText = befolkning_master[kommunenummer].kommunenummer;
      row.insertCell().innerText = befolkning_master[kommunenummer].total_befolkning[kommunenummer];
      row.insertCell().innerText = JSON.stringify(sysselsatte_master[kommunenummer].sysselsetting[kommunenummer]);
      row.insertCell().innerText = "uskjent";

      document.getElementById("detaljer_oversikt").appendChild(tabellHTML);
      document.getElementById("kommunenavn").appendChild(kommuneNavn);
    }

  }

}
