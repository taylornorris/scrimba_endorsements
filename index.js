
// connect app & functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://scrimba-endorsements-d8292-default-rtdb.firebaseio.com/"
}

// initialize data structure
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

// hook up html
const inputFieldEl = document.getElementById("endoresement-input")
const fromInputFieldEl = document.getElementById("from-input")
const toInputFieldEl = document.getElementById("to-input")
const btnEl = document.getElementById("button")
const endorsementsListEl = document.getElementById("unordered-list")

// button intructions
btnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value 
    let fromValue = fromInputFieldEl.value
    let toValue = toInputFieldEl.value
    let valueArray = [toValue, inputValue, fromValue] // creating value as array to store multiple data entries in one key

    push(endorsementsInDB, valueArray) // send array to new key entry in DB

    clearInputFieldEl()
    clearFromInputFieldEl()
    clearToInputFieldEl()
})

// clear input fields, used in button instructions
function clearInputFieldEl() { 
    inputFieldEl.value = ""
}

function clearFromInputFieldEl() { 
    fromInputFieldEl.value = ""
}

function clearToInputFieldEl() { 
    toInputFieldEl.value = ""
}

// fetching new data from DB
onValue(endorsementsInDB, function(snapshot) { // (listen for changes "onValue") to directory and (grab current data "snapshot") 
    if (snapshot.exists()) { // check if directory contains data
        let itemsArray = Object.entries(snapshot.val()).reverse() // reverse key order & store key value pair strings as arrays 
        clearEndorsementListEl() // clear list so we don't duplicate 

        for (let i = 0; i < itemsArray.length; i++) { // loop the data array
            let currentItem = itemsArray[i] // store arrays in variable
            addItemToListEl(currentItem) // pass arrays into function which adds to HTML
        }
    } else {
        endorsementsListEl.innerHTML = `<p style="color:white; text-align:center">No endorsements yet!</p>`
    }
})

// used in onValue to avoid duplicates
function clearEndorsementListEl() {
    endorsementsListEl.innerHTML = ""
}

// creates and appends new li element 
function addItemToListEl(item) {
    let toValue = item[1][0]
    let messageValue = item[1][1]
    let fromValue = item[1][2]
    
    let newEl = document.createElement("li")
    newEl.innerHTML = `
        <p class="bold">To: ${toValue}<p>
        <p>${messageValue}</p>
        <p class="bold">From: ${fromValue}</p>
    `
    endorsementsListEl.append(newEl)
}