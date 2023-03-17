const studentId = document.querySelector("#studentid")
const question = document.querySelector("#vraag1")
const button = document.querySelector("#button2")
const url = window.location.pathname.split('/')
const urlId = url[2]


button.addEventListener('click', function () {
    let getTimeNow = new Date().getTime();
    console.log(getTimeNow)
    // if (studentId.value.length === 7) {
    //     fetch('/checkin/' + urlId, {
    //         method: 'PATCH',
    //         body: JSON.stringify({
    //             'presence': 1,
    //             'meeting': urlId,
    //             'student': studentId.value,
    //             'checkin time': getTimeNow
    //         })   
    //     })
    // }
});