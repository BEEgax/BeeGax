var dataDiv;
var mainDiv;
var data = {};

var startDate;
var endDate;

async function getData() {
  const url = `http://localhost:8000/api/measurement/1/${startDate}/${endDate}`; //Server URL
  const response = await fetch(url, {
    method: "GET",
    mode: "same-origin",
  }).then((response) => response.json());
  return await response;
}

function createListElement(value) {
  let liElement = document.createElement("li");
  liElement.innerHTML = JSON.stringify(value);
  return liElement;
}

function formatTime(unixTime) {
  // Formats the unix time input into readable timeformat

  let date = new Date(unixTime * 1000);

  let hours = date.getHours();

  let minutes = "0" + date.getMinutes();

  let seconds = "0" + date.getSeconds();

  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}

function onlyUnique(value, index, self) {
  // Checks if the id is uniqe
  return self.indexOf(value) === index;
}

async function drawCharts() {
  const first_input = document.getElementById("from-date");
  const second_input = document.getElementById("to-date");

  startDate = new Date(first_input.value).valueOf().toString();
  endDate = new Date(second_input.value).valueOf().toString();

  startDate = startDate.substring(0, 10);
  endDate = endDate.substring(0, 10);

  data = await getData();

  let weigthValues = data.data.filter((x) => x.value_type == 0);
  let humidityValues = data.data.filter((x) => x.value_type == 2);
  let tempValues = data.data.filter((x) => x.value_type == 1);

  let xValuesHumidity = humidityValues.map((x) => formatTime(x.date));
  let xValuesWeigth = weigthValues.map((x) => formatTime(x.date));
  let xValuesTemp = tempValues.map((x) => formatTime(x.date));

  let yValuesHumidity = humidityValues.map((x) => x.value);
  let yValuesWeigth = weigthValues.map((x) => x.value);
  let yValuesTemp = tempValues.map((x) => x.value);

  drawChartWeight(xValuesWeigth, yValuesWeigth);
  drawChartHumidity(xValuesHumidity, yValuesHumidity);
  drawChartTemp(xValuesTemp, yValuesTemp);
}

function updateTableValues() {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  date =
    yesterday.getFullYear() +
    "-" +
    (yesterday.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    yesterday.getDate().toString().padStart(2, "0");
  time =
    yesterday.getHours().toString().padStart(2, "0") +
    ":" +
    yesterday.getMinutes().toString().padStart(2, "0");

  dateTime = date + "T" + time;

  let fromDate = document.getElementById("from-date");
  fromDate.value = dateTime.toString();
  let today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  let time =
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0");

  let dateTime = date + "T" + time;

  let toDate = document.getElementById("to-date");
  toDate.value = dateTime.toString();
}

async function main() {
  mainDiv = document.getElementById("main");
  updateTableValues();
}

window.onload = main;
