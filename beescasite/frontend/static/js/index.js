var dataDiv;
var mainDiv;
var data = {};

var startDate;
var endDate;

async function getData() {
  console.log(startDate);
  console.log(endDate);
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

function myFunction() {
  var first_input = document.getElementById("from");
  var second_input = document.getElementById("myLocalDate");

  startDate = new Date(first_input.value).valueOf().toString();
  endDate = new Date(second_input.value).valueOf().toString();

  startDate = startDate.substring(0, 10);
  endDate = endDate.substring(0, 10);

  console.log(startDate);
  console.log(endDate);
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

  data = await getData();
  console.log(data);

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
  updateTableValues();
}

window.onload = main;
