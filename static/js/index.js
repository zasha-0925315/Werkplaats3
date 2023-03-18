const urlyx = window.location.pathname.split("/")
urlId = urlyx[2]
const url = '/api/checkin/' + urlId
console.log(urlId)

const qrCode = document.querySelector('#qr')
const Checkin_close = document.querySelector('#Close_Checkin')
const qrText = document.querySelector("#QR_Text")

const get_meeting = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const meetinginfo = data["meeting_info"]
        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {
            DateGetter(meetinginfo)
        }
    }

    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}

// Timer JS functions for QRgen.html //
function DateGetter(meetinginfo) {
    let Vardate = (meetinginfo[0]["date"] + " " + meetinginfo[0]["start_time"]);
    let myfunc = setInterval(function () {
        let currentTime = new Date().getTime();
        let timeleft = new Date(Vardate) - currentTime;
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
            document.getElementById("end").innerHTML = '<h1>' + "Check-in is gesloten"; + '</h1>'
            timer.style.width = '500px'
            qrCode.style.display = 'None'
            Checkin_close.style.display = 'None'
        }
    }, 1000);
}
// Run myfunc every second


// This makes the elements #timer_border and Checkin-Sluit invisible/ nonexistant.



let timer = document.querySelector('#timer_border');
timer.style.display = 'None'

let checkin = document.querySelector("#Checkin-sluit")
checkin.style.display = 'None'

/* Clicking on the QR button will return the style.display back to before.
We put an if condition as we want the timer to only appear if the text field has any value */
let generatebutton = document.querySelector('#qr-gen')

generatebutton.addEventListener("click", function () {
    qrText.style.display = 'none';
    timer.style.display = '';
    checkin.style.display = '';
    generatebutton.style.display = 'None';

    // document.querySelector("#QR-Text").innerHTML = qrtext.replace("QR Code", "Welkom Bij HR!")
}
);

// For check-in Button //
checkin.addEventListener("click", function () {
    checkin.style.display = 'None';
    qrCode.style.display = 'None';
    timer.style.width = "500px";
    timer.style.height = "100px";
    timer.style.font = "30px";
    timer.innerHTML = 'Check-in is gesloten!';
    timer.style.fontSize = "42px";
});
get_meeting()

mid = document.querySelector('meetingid')

function insertmid() {
    document.querySelector('meetingid').innerHTML = urlId;
    console.log(urlId)
}

mid.addEventListener('DOMContentLoaded', insertmid)

let interval_id = setInterval(get_meeting, 5000)