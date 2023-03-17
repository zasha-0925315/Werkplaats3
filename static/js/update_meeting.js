const question = document.querySelector('#question')
const questionButton = document.querySelector('#button10')
const AnswersButton = document.querySelector('#show_answers')
const table = document.querySelector('#question_header')
const tb = document.querySelector('#tbody_answers')
const url = window.location.pathname.split('/')
const urlId = url[2]


table.style.display = 'None'
tb.style.display = 'None'
const messageQuestion = document.querySelector('#message_question')

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

function checkVraag() {
    message = 'Vul een vraag in ..' + '<br>'
    document.querySelector('#message_question').innerHTML = message;
};


function appearTable() {
    table.style.display = '';
    tb.style.display = '';
}

function disappearTable() {
    table.style.display = 'None';
    tb.style.display = 'None';
}

questionButton.addEventListener('click', function () {
    if (question.value !== '') {
        get_question();
        if (messageQuestion) {
            messageQuestion.remove();
            console.log(message)
        }
    } else {
        checkVraag();
    }
});

AnswersButton.addEventListener('click', function () {
    if (table.style.display === 'none') {
        appearTable();
    } else {
        disappearTable();
    }
});

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



document.addEventListener('DOMContentLoaded', get_answers());

