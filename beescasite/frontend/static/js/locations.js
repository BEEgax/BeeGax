const URL = "http://167.235.150.74:8000/api/hive/";
var current_hive = 0;
var hives;

function hiveCounterUp() {
    if (!hives) return;
    current_hive++;
    current_hive %= hives.length;
    changeLabel(current_hive);
}

function hiveCounterDown() {
    if (!hives) return;
    current_hive--;
    current_hive = current_hive < 0 ? hives.length - 1 : current_hive;
    changeLabel(current_hive);
}

async function changeLabel(index) {
    if (!hives) return;
    var label = document.getElementById('hive_name_label');
    label.innerHTML = hives[index].name;
    createEmbededLink();
}

async function createEmbededLink() {
    const coords = hives[current_hive].location
    var googleLink = "https://www.google.com/maps/@" + coords + ",20z"
    
    var embededLink = GoogleMapsURLToEmbedURL(googleLink);

    const iframe = document.getElementById("googleMapsThings");
    iframe.src = embededLink;
}

function GoogleMapsURLToEmbedURL(GoogleMapsURL) {
    var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(GoogleMapsURL);
    if (coords != null) {
        var coordsArray = coords[1].split(',');
        return "http://maps.google.com/maps?q=" + coordsArray[1] + "," + coordsArray[0] + "&z=15&output=embed";
        // return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" + coordsArray[1] + "!3d" + coordsArray[0] + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098";
    }
}

async function main() {
    hives = (await fetch(URL).then((response) => response.json())).data;
    changeLabel(0);
}

window.onload = main;