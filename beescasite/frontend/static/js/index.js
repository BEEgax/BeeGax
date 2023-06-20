const URL = "http://167.235.150.74:8000/api/hive";

var dataDiv;
var mainDiv;

var hives;
var data = {};

var startDate;
var endDate;

var current_hive = 0;

async function getHives() {
  const result = await fetch(URL).then((response) => response.json());
  hives = result.data;
  changeLabel();
  buttonClicked();
}

async function hiveCounterUp() {
  if (!hives) return;
  current_hive++;
  current_hive %= hives.length;
  changeLabel();
  buttonClicked();
}

function hiveCounterDown() {
  if (!hives) return;
  current_hive--;
  current_hive = current_hive < 0 ? hives.length - 1 : current_hive;
  changeLabel();  
  buttonClicked();
}

async function changeLabel() {
  var label = document.getElementById('hive_name_label');
  label.innerHTML = hives[current_hive].name;
}

async function getData() {
  const id = hives[current_hive].id;
  const url = `http://167.235.150.74:8000/api/measurement/${id}/${startDate}/${endDate}`;
  const response = await fetch(url, {
    method: "GET",
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

  const date = new Date(unixTime * 1000);

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return (formattedDate)
}

function getTimeSpan() {
  var first_input = document.getElementById("from");
  var second_input = document.getElementById("myLocalDate");

  startDate = new Date(first_input.value).valueOf().toString();
  endDate = new Date(second_input.value).valueOf().toString();

  startDate = startDate.substring(0, 10);
  endDate = endDate.substring(0, 10);
}

function updateTableValues() {
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");
  var time =
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0");
  var dateTime = date + "T" + time;

  var toDate = document.getElementById("myLocalDate");
  toDate.value = dateTime;

  document.getElementById("myLocalDate").value = dateTime.toString();
}

async function buttonClicked() {
  // Updates new value inputs
  getTimeSpan();
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

async function main() {
  mainDiv = document.getElementById("main");
  getHives();
  updateTableValues();
}

window.onload = main;
