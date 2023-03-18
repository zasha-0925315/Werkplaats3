const studentId = document.querySelector("#studentid")
const question = document.querySelector("#vraag1")
const button = document.querySelector("#button_checkin")
const url = window.location.pathname.split('/')
const urlId = url[2]

// error message if student does not input the right info //
function displayMessage() {
    message = 'Ongeldige studentenid'
    document.querySelector('#message').innerHTML = message;
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

