function onBodyLoad() {
    ws = new WebSocket('ws://147.228.173.52:8881/websocket')     // ws is a global variable (index.html)
    ws.onopen = onSocketOpen
    ws.onmessage = onSocketMessage
    ws.onclose = onSocketClose
    document.getElementById('testDate').value = new Date().toDateInputValue();
    getPatientId();
    document.getElementById("patientIdentification").style.display = "block";
    document.getElementById("numbersRepeating").style.display = "none"
    document.getElementById("lakePicture").style.display = "none"
    document.getElementById("numbersRemembering").style.display = "none"

}

function onSocketOpen() {
    console.log("WS client: Websocket opened.")
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


function getPatientId(){
    //TODO - vyresit ukladani a nacitani dat
    document.getElementById("patientId").value = 5;
}


function onSocketMessage(message) {
    var data
    try {
        data = JSON.parse(message.data)    
    } catch(e) {
        data = message.data
    }
    console.log("WS message:", data)    
}

function onSocketClose() {
    console.log("WS client: Websocket closed.")
}

function patientIdentification() {

    var params = {
        topic: "patientIdentification",
        testDate: document.getElementById("testDate").value,
        place: document.getElementById("place").value,
        patientCategory: document.getElementById("patientCategory").value,
        patientId: document.getElementById("patientId").value,
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        abedeco: document.getElementById("abadeco").value

    }
    console.log("Sending ID data to DM: ", params)

    document.getElementById("patientIdentification").style.display = "none";
    document.getElementById("lakePicture").style.display = "block"
    
    ws.send(JSON.stringify(params))
}

function lakePicture() {
    var params = {
        topic: "lakePicture"
    }
    console.log("lakePicture done, showing numbersRemembering")

    document.getElementById("lakePicture").style.display = "none"
    document.getElementById("numbersRemembering").style.display = "block"
    
    ws.send(JSON.stringify(params))
}

function numbersRemebering() {
    var params = {
        topic: "numbersRemembering"
    }
    console.log("numbersRemembering done, showing END")

    document.getElementById("numbersRemembering").style.display = "none"
    document.getElementById("END").style.display = "none"
    
    ws.send(JSON.stringify(params))
}

function startTimer() {
    switch (test_idx){
        case 0:
            duration = 60;
            countdown_name = 'countdown_0';
            break;
        case 1:
            duration = 30;
            countdown_name = 'countdown_1';
            break;
    }
            
    display = document.querySelector('#'+ countdown_name);
    var timer = duration, seconds;

let countdown = setInterval(function () {
    seconds = parseInt(timer % 60, 10);

    //seconds = seconds < 10 ? "0" + seconds : seconds;
    timer = timer < 10 ? "0" + timer : timer;
    //display.textContent = seconds + "s";
    display.textContent = timer + "s";

    if (--timer < 0) {
        proceed_to_next_test();
        clearInterval(countdown)
         
    }
}, 1000);
}