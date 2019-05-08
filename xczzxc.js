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
    var table = document.getElementById("S_table");
    table.innerHTML = '';
    let kommune1 = sysselsatte_master.find(function(kommune) {
      return kommune.kommunenummer === input1;
    });
    if (kommune1 === undefined) {
      let text = document.createElement('span');
      text.innerText = 'Ugyldig kommunenummer: ' + input1;
      table.appendChild(text);
      return;
    }
    let kommune2 = sysselsatte_master.find(function(kommune) {
      return kommune.kommunenummer === input2;
    });
    if (kommune2 === undefined) {
      let text = document.createElement('span');
      text.innerText = 'Ugyldig kommunenummer: ' + input2;
      table.appendChild(text);
      return;
    }
    let kommuner = [
      kommune1,
      kommune2,
    ];
    let newDiv = function() {
      return document.createElement('div');
    }
    hr = newDiv();
    hr.classList.add('row');
    hr.classList.add('header');
    let emptyCell = newDiv();
    emptyCell.classList.add('cell');
    hr.appendChild(emptyCell);
    for (let kommune of kommuner) {
      let title = newDiv();
      title.innerText = kommune.navn;
      title.classList.add('cell');
      title.classList.add('title-cell');
      hr.appendChild(title);
    }
    table.appendChild(hr);
    hr2 = newDiv();
    hr2.classList.add('row');
    hr2.classList.add('header');
    emptyCell = newDiv();
    emptyCell.classList.add('cell');
    hr2.append(emptyCell);
    for (let i = 0; i < 2; ++i) {
      for (let title of ['Menn', 'Kvinner']) {
        let cell = newDiv();
        cell.innerText = title;
        cell.classList.add('cell');
        hr2.appendChild(cell);
      }
    }
    table.appendChild(hr2);

    for (let year in kommune1.informasjon.Menn) {
      let row = newDiv();
      row.classList.add('row');

      let maxValue = {
        'Menn': -Infinity,
        'Kvinner': -Infinity,
      };
      let maxValueCell = {};

      let yearCell = newDiv();
      yearCell.innerText = year;
      yearCell.classList.add('cell');
      row.appendChild(yearCell);

      for (let kommune of kommuner) {
        for (let gender of ['Menn', 'Kvinner']) {
          let cell = newDiv();
          let value = kommune.informasjon[gender][year];
          cell.innerText = value;
          cell.classList.add('cell');
          row.appendChild(cell);

          value = Number(value);
          if (value > maxValue[gender]) {
            maxValue[gender] = value;
            maxValueCell[gender] = cell;
          }
        }
      }
      table.appendChild(row);
      for (let cell of Object.values(maxValueCell)) {
        cell.classList.add('highest');
      }
    }
  })
}
