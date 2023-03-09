const url = '../api/class/json'

const get_meeting = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {
            console.log('peepoclap')
        }
    }

    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}

// Timer JS functions for QRgen.html //
Vardate = new Date('04-27-2023 12:00:00');
let countDownDate = new Date(Vardate).getTime();

// Run myfunc every second
let myfunc = setInterval(function () {

    let currentTime = new Date().getTime();
    let timeleft = countDownDate - currentTime;

    // Calculating the days, hours, minutes and seconds left
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    document.getElementById("days").innerHTML = days + "d"
    document.getElementById("hours").innerHTML = ":" + hours
    document.getElementById("mins").innerHTML = ":" + minutes
    document.getElementById("secs").innerHTML = ":" + seconds

    // Display the message when countdown is over
    if (timeleft < 0) {
        clearInterval(myfunc);
        document.getElementById("days").innerHTML = ""
        document.getElementById("hours").innerHTML = ""
        document.getElementById("mins").innerHTML = ""
        document.getElementById("secs").innerHTML = ""
        document.getElementById("end").innerHTML = "Check-in is gesloten";
    }
}, 1000);

// This makes the elements #timer-border and Checkin-Sluit invisible/ nonexistant.
qrgen = document.querySelector("#qr-gen")
qrcode = document.querySelector("#qr")
qrtext = document.querySelector("#QR-Text").innerHTML;

let timer = document.querySelector('#timer-border');
timer.style.display = 'None'

let checkin = document.querySelector("#Checkin-sluit")
checkin.style.display = 'None'

/* Clicking on the QR button will return the style.display back to before.
We put an if condition as we want the timer to only appear if the text field has any value */
let input = document.querySelector('#text1')
let generatebutton = document.querySelector('#qr-gen')
generatebutton.addEventListener("click", function () {
    if (input.value !== '') {
        timer.style.display = '';
        checkin.style.display = '';
        input.style.display = 'None';
        qrgen.style.display = 'None';
        document.querySelector("#QR-Text").innerHTML = qrtext.replace("QR Code", "Welkom Bij HR!")
    }
});

// For check-in Button //
checkin.addEventListener("click", function () {
    checkin.style.display = 'None';
    qrcode.style.display = 'None';
    timer.style.width = "500px";
    timer.style.height = "100px";
    timer.style.font = "30px";
    timer.innerHTML = 'Check-in is gesloten!';
    timer.style.fontSize = "42px";
});
get_meeting()

let interval_id = setInterval(get_meeting, 5000)