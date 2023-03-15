const meetingName = document.querySelector("#meeting_name")
const meetingDate = document.querySelector("#meeting_date")
const meetingStartTime = document.querySelector("#meeting_start_time")
const meetingEndTime = document.querySelector("#meeting_end_time")
const meetingLocation = document.querySelector("#meeting_location")

const teacherSelect = document.querySelector("#teacher_select")
const teacherTable = document.querySelector("#teacher_list")
let teacherList = []

const classSelect = document.querySelector("#class_select")
const classTable = document.querySelector("#class_list")
let classList = []

const message = document.querySelector("#message")

classSelect.addEventListener("change", function (){
    if (classList.indexOf(classSelect.value) === -1){
        classList.push(classSelect.value)
        const classification = "remove_class"
        addList(classList, classTable, classification)
    }
})

teacherSelect.addEventListener("change", function (){
    if (teacherList.indexOf(teacherSelect.value) === -1){
        teacherList.push(teacherSelect.value)
        const classification = "remove_teacher"
        addList(teacherList, teacherTable, classification)
    }
})

function addList(list, table, classification) {
    table.replaceChildren()
    let i = 0
    while (i < list.length) {
        table.innerHTML += "<td>" + list[i] + "</td><td class=" + classification + " data-i=" + i + ">x</td>"
        i++
    }
    removeItem(list, table, classification)
}

function removeItem(list, table, classification){
    document.querySelectorAll("." + classification).forEach(item => {
        let index = item.dataset.i

        item.addEventListener("click", function (){
            list.splice(index, 1)
            addList(list, table, classification)
        }, false)
    })
}

function log(){
    if (meetingDate.value !== "" &&
    meetingStartTime.value !== "" &&
    meetingEndTime.value !== "" &&
    meetingLocation.value !== "" &&
    teacherList.length !== 0 &&
    classList.length !== 0){
        fetch('/meeting/new', {
            method : 'POST',
            body : JSON.stringify( {
                'name' : meetingName.value,
                'date' : meetingDate.value,
                'start time' : meetingStartTime.value,
                'end time' : meetingEndTime.value,
                'location' : meetingLocation.value,
                'teacher' : teacherList,
                'class' : classList
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        message.innerHTML = "Meeting aangemaakt"
        window.location.href = "/meeting";
        alert("Meeting aangemaakt")
    }else{
        console.log("vul alles in")
      message.innerHTML = "Vul alles in"
    }


}
