const question = document.querySelector('#question')
const button = document.querySelector('#button10')
const url = window.location.pathname.split('/')
const urlId = url[2]

console.log(urlId)

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

button.addEventListener('click', function () {
    if (question.value !== '') {
        get_question()
    }
});
