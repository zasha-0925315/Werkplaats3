const question = document.querySelector('#question')
const questionButton = document.querySelector('#button10')
const AnswersButton = document.querySelector('#show_answers')
const table = document.querySelector('#question_header')
const tb = document.querySelector('#tbody_answers')
const messageQuestion = document.querySelector('#message_question')
const urlyx = window.location.pathname.split('/')
const urlId = urlyx[2]
const url = '/api/checkin/' + urlId



// hide the antwoord table first.. //
table.style.display = 'None'
tb.style.display = 'None'

// fetch meeting from api //
const get_meetingq = async () => {
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
            makeQuestion(meetinginfo)
        }
    }

    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}

// checks the meetinginfo from the fetch, if the meeting has yet to happen it will display the normal screen, otherwise it shows the text below //
function makeQuestion(meetinginfo) {
    let Vardate = (meetinginfo[0]["date"] + " " + meetinginfo[0]["start_time"]);
    let currentTime = new Date().getTime();
    let timeleft = new Date(Vardate) - currentTime;
    if (timeleft > 0) {
        questionButton.addEventListener('click', function () {
            if (question.value !== '') {
                get_question(), changeTitle();
                if (messageQuestion) {
                    messageQuestion.remove();
                    console.log(message)
                }
            } else {
                checkVraag();
            }
        });
    } else {
        questionButton.addEventListener('click', function () {
            if (question.value !== '') {
                // if (messageQuestion) {
                //     messageQuestion.remove();
                noVraag();
                console.log(noVraag)
                // }
            }
        })
    }
}





// Sends the question in JSON format to the database //
async function get_question() {
    fetch('../api/question', {
        method: 'PATCH',
        body: JSON.stringify({
            'meeting id': urlId,
            'question': question.value
        }),
        headers: {
            'Content-type': 'application/JSON'
        }
    })
}

// changes Vraag Header Text to the value inputted in the input field //
function changeTitle() {
    question_title = question.value
    localStorage.setItem('QuestionTitle', question_title)
    document.querySelector('#question_title').innerHTML = question_title
}

// loads the title from localStorage, at the bottom of the js file we load it again //
// function loadTitle() {
//     const questionTitle = localStorage.getItem('QuestionTitle')
//     if (questionTitle) {
//         document.querySelector('#question_title').innerHTML = questionTitle;

//     }
// }
// error message //
function checkVraag() {
    message = 'Vul een vraag in ..' + '<br>'
    document.querySelector('#message_question').innerHTML = message;
};

function noVraag() {
    message = 'Meeting is voorbij' + '<br>'
    document.querySelector('#message_question').innerHTML = message;
}

// makes the Antwoord , result table appear //
function appearTable() {
    table.style.display = '';
    tb.style.display = '';
}
// makes the Antwoord, result table disappear //
function disappearTable() {
    table.style.display = 'None';
    tb.style.display = 'None';
}
// if 'maak vraag' question has value then it will trigger the JSON function and change the title. if there is no value it will trigger a message that warns the user
//
function yesQuestion() {
    if (question.value !== '') {
        get_question(), changeTitle();
        if (messageQuestion) {
            messageQuestion.remove();
            console.log(message)

        }
    } else {
        checkVraag();
    }
};

function nopeQuestion() {
    console.log("hhhh?")

}
// toggles ON/OFF the answer table in meetingid.html //
AnswersButton.addEventListener('click', function () {
    if (table.style.display === 'none') {
        appearTable();
    } else {
        disappearTable();
    }
});

// Pulls the answers from the database every 5 seconds in AJAX //
async function get_answers() {
    try {
        const response = await fetch('../api/answers/' + urlId,);
        const answers = await response.json();
        console.log(answers)
        fillAnswers(answers['answer_info'])

    } catch (error) {
        console.log(error)

    } finally {
        setTimeout(get_answers, 5000)
    }
}

// Adds the answers if they are present in the database //
function fillAnswers(answers) {
    const table = document.querySelector('#question_table');
    const tb = document.querySelector('#tbody_answers');

    tb.replaceChildren()
    table.appendChild(tb);

    for (const answer of answers) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + answer[2] + "</td>"
        console.log(answer)
        tb.appendChild(tr);
    }
};

// loads the answers only if the DOM is loaded //
// loadTitle();
get_meetingq()

document.addEventListener('DOMContentLoaded', get_answers());
