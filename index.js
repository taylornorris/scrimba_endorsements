import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://scrimba-endorsements-d8292-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputFieldEl = document.getElementById("input")
const btnEl = document.getElementById("button")
const endorsementsListEl = document.getElementById("unordered-list")

btnEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value 
    push(endorsementsInDB, inputValue)
    clearInputFieldEl()
})

function clearInputFieldEl() { 
    inputFieldEl.value = ""
}


onValue(endorsementsInDB, function(snapshot) { // (listen for changes "onValue") to directory and (grab current data "snapshot") // 
    if (snapshot.exists()) { // check if directory contains data // 
        let itemsArray = Object.entries(snapshot.val()) // if data present, store key value pair strings as arrays //
        clearEndorsementListEl() // clear list so we don't duplicate //

        for (let i = 0; i < itemsArray.length; i++) { // loop the data array //
            let currentItem = itemsArray[i] // store arrays in variable //
            addItemToListEl(currentItem) // pass arrays into function which adds to HTML //
        }
    } else {
        endorsementsListEl.innerHTML = `<p style="color:white; text-align:center">No endorsements yet!</p>`
    }
})

function clearEndorsementListEl() {
    endorsementsListEl.innerHTML = ""
}

function addItemToListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    endorsementsListEl.append(newEl)
}