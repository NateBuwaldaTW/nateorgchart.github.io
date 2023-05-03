google.charts.setOnLoadCallback(drawChart);

const filterState = [];
const fileState = { 'data' : [] };

const filterInput = document.querySelector('#chart-for');
const fileInput = document.querySelector('#csv-file');
const reloadButton = document.querySelector('#reload-chart');
const chartDiv = document.getElementById('chart-div');

const reader = new FileReader();

filterInput.addEventListener('change', () => {
  setFilterState(filterState, filterInput.value);
});

fileInput.addEventListener('change', () => {
  parseCsv(fileInput.files[0], reader, fileState);
  drawChart(fileState.data, filterState, chartDiv);
});

reloadButton.addEventListener('click', () => {
  reloadChart(fileState.data, filterState, chartDiv);
});

function setFilterState(state, value) {
  state.pop();
  state.push(value);
}

function parseCsv(file, reader, fileState) {
  reader.onload = () => {
    Papa.parse(file, {
      complete: function (results) {
        fileState.data = results.data;
      }
    })
  };

  reader.onerror = err => console.log(err);
  reader.readAsText(file);
}

function drawChart(fileData, filters, chartElement) {
  if (fileData && fileData.length > 0) {
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'Tooltip');

    let rows = [];

    fileData.forEach((item, index) => {
      let name, title, supervisor = '';
      name = item[0] + ' ' + item[1];
      title = item[2];
      supervisor = item[4];

      let supervisorFilters = [];

      if (filters && filters[0]) {
        supervisorFilters.push(filters[0]);
      }

      let includeRow =  supervisorFilters.length === 0
        || supervisorFilters.includes(name)
        || supervisorFilters.includes(supervisor);

      if (index !== 0 && includeRow) {
        let row = {
          'v': name,
          'f': '<div style="width:200px;">' + name + '</div><div style="color:red; font-style:italic">' + title + '</div>'
        }
        rows.push([row, supervisor, '']);
      }
    });

    data.addRows(rows);

    let orgChart = new google.visualization.OrgChart(chartElement);
    orgChart.draw(data, { 'allowHtml' : true })
  }
}

function reloadChart(fileData, filters, chartElement) {
  if (fileData && fileData.length > 0) {
    drawChart(fileData, filters, chartElement);
  }
}
