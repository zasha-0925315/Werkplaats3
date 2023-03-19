const studentId = document.querySelector("#studentid")
const question = document.querySelector("#vraag1")
const checkinButton = document.querySelector("#button_checkin")
const answerBox = document.querySelector('#answer_box')
const checkinText = document.querySelector('#checkin_text')
const urlyx = window.location.pathname.split('/')
const urlId = urlyx[2]
const url = '/api/checkin/' + urlId

// fetch meeting //
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
        console.log(meetinginfo)
        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {
            checkDate(meetinginfo)
        }
    }

    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}

function checkDate(meetinginfo) {
    let Vardate = (meetinginfo[0]["date"] + " " + meetinginfo[0]["start_time"]);
    let currentTime = new Date().getTime();
    let timeleft = new Date(Vardate) - currentTime;
    if (timeleft < 0) {
        answerBox.style.display = 'None'
        checkinButton.style.display = 'None'
        checkinText.innerHTML = '<h1>' + 'Check in is gesloten' + '</h1>'

    }
}


// error message if student does not input the right info //
function displayMessage() {
    message = 'Ongeldige Studentenid'
    document.querySelector('#message').innerHTML = message;
    document.querySelector('#message').style.color = 'red';
}

// fetch question from meeting // 
function fetchQuestion() {
    fetch('/checkin/' + urlId, {
        method: 'POST',
        body: JSON.stringify({
            'result': question.value,
            'student id': studentId.value,
            'meeting': urlId
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
}

/* checks if student has put in 7 characters..
displays an error message if the student has not. */

checkinButton.addEventListener('click', function () {
    let newTime = new Date().toLocaleTimeString('nl-nl')
    if (studentId.value.length === 7) {
        fetch('/checkin/' + urlId, {
            method: 'PATCH',
            body: JSON.stringify({
                'presence': 1,
                'meeting': urlId,
                'student': studentId.value,
                'checkin time': newTime
            }),
            headers: {
                'Content-type': 'application/json'
            }
        }) // if json information is processed then this redirects user to the href link //
            .then(response => {
                if (response.ok) {
                    window.location.href = '/checkedin';
                }
            })
            .catch(error => {
                console.log(error);
            });
        //  checks for whether there was a question submitted by a teacher in meeting //
        if (question.value !== "") {
            fetchQuestion()
        }
    }
    else {
        displayMessage()
    }
});

get_meeting()


let interval_id = setInterval(get_meeting, 1000)

document.addEventListener('DOMContentLoaded', checkDate)