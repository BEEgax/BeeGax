const URL = "http://167.235.150.74:8000/api/hive";

class HiveValues {
    constructor(element, data, name, location, apikey) {
        this.name = name;
        this.location = location;
        this.apikey = apikey;
    }
}

function createPopups(){
    document.addEventListener("DOMContentLoaded", function () {
        var popupContainer = document.getElementById("addbeehive_popup_container");

        var popup = document.createElement("div");
        for (var i = 1; i <= 8; i++) {
            popup.classList.add("addbehive_popup");
            popup.innerHTML = `
                    <p>Edit Beehive ${i}</p>
                    <form>
                        <label for="hivename_${i}">Hive Name:</label>
                        <input type="text" id="hivename_${i}" name="hivename_${i}">
                        <br><br>
                        <label for="location_${i}">Location:</label>
                        <input type="text" id="location_${i}" name="location_${i}">
                        <br><br>
                        <label for="api_key_${i}">API Key:</label>
                        <input type="text" id="api_key_${i}" name="api_key_${i}">
                        <br><br>
                        <input type="button" onclick="closePopup(${i})" value="Close"></input>
                        <input type="button" onclick="savePopup(${i})" value="Save"></input>
                    </form>
                `;
            popupContainer.appendChild(popup);
        }
    });
}

function openPopup(index) {
    let popup = document.getElementsByClassName("addbehive_popup")[index - 1];
    console.log(popup);
    popup.classList.add("open-addbehive_popup");
}

function closePopup(index) {
    let popup = document.getElementsByClassName("addbehive_popup")[index - 1];
    popup.classList.remove("open-addbehive_popup");
}


async function savePopup(index) {
    const buttonList = [];

    const hname = document.getElementById("hivename_" + index.toString()).value;
    const hlocation = document.getElementById("location_" + index.toString()).value;
    const hapikey = document.getElementById("api_key_" + index.toString()).value;

    let buttonElement = new HiveValues(hname, hlocation, hapikey);
    buttonList.push(buttonElement);

    document.getElementById("button" + index.toString()).textContent = name;

    const hive_obj = { name : hname, location : hlocation, hardware_api_key : hapikey };

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hive_obj)
    });

    closePopup();
}

function bindingButtons() {
    for (let i = 0; i < 7; i++) {
        var hivebtn = new HiveValues(document.getElementById("button" + (i + 1).toString()), "init");
        buttonList.push(hivebtn);
    }
}

function writingToButtons(){
    // look through every hive in the database and if some fields are filled 
    // write them to the html
    console.log("onload function")
    createPopups();

    let existing_hives = fetch(URL)
    console.log(existing_hives)

    for (var i = 0; i < 8; i++){
        if (existing_hives.hive_grid_name != ""){
            // insert
        }
    }
}

window.onload = writingToButtons();

// https://stackoverflow.com/questions/16483560/how-to-implement-dom-data-binding-in-javascript 

// on load daten vom server holen und die dann anzeigen 

// nach hinzufügen von hives das dann an den sevrer pushen

// list of (max) 8 elements. each element is an object wih (name, location, apikey)
// in a for loop binding all buttons to the elements // if object exists 