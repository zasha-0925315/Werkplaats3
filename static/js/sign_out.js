const studentId = document.querySelector("#student_id")
const reason = document.querySelector("#reason")
const signOutButton = document.querySelector("#sign_out_button")
const message = document.querySelector("#message")
const url = window.location.pathname.split('/')
const urlId = url[2]

signOutButton.addEventListener("click", function (){
  if (studentId.value.length === 7) {
    fetch('/sign_out/' + urlId, {
      method : 'PATCH',
      body : JSON.stringify( {
        'presence' : 2,
        'meeting' : urlId,
        'student' : studentId.value,
        'reason' : reason.value
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    message.innerHTML = "<p style='color: green'>Afgemeld</p>"
  }else{
    message.innerHTML = "<p style='color: red'>Foute id</p>"
  }


}, false)
