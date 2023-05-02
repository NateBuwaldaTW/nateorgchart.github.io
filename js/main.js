google.charts.setOnLoadCallback(drawChart);

const filterInput = document.querySelector('#chart-for');
const fileInput = document.querySelector('#csv-file');
const reloadButton = document.querySelector('#reload-chart');

filterInput.addEventListener('change', () => {
  console.log('filterInput changed');
});

fileInput.addEventListener('change', () => {
  console.log('fileInput changed');
});

reloadButton.addEventListener('click', () => {
  console.log('reloadButton clicked')
});

function parseCsv() {

}

function drawChart() {

}
