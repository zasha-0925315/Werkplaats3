const studentId = document.querySelector("#studentid")
const question = document.querySelector("#vraag1")
const button = document.querySelector("#button_checkin")
const url = window.location.pathname.split('/')
const urlId = url[2]

function displayMessage() {
    message = 'ongeldige studentenid'
    document.querySelector('#message').innerHTML = message;
}

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


button.addEventListener('click', function () {
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
        })
        if (question.value !== "") {
            fetchQuestion()
        }

    }
    else {
        displayMessage()
    }
});

