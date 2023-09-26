import escape from 'lodash.escape';

// Get the list of meetings
async function getMeeting() {
    try {
        const response = await fetch('../api/class/json');
        const data = await response.json();
        const meetingArray = data["meeting_info"]

        meetingArray.sort((a, b) => {
            if (a.date < b.date) {
                return -1
            }
        })

        selectTeacher(meetingArray)

    }
    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}
// select the <select>
const teacherSelectBox = document.querySelector("#Select-Teacher")

// add an eventlistenter to the change of the <select>
function selectTeacher(meetingArray) {
    teacherSelectBox.addEventListener("change", function () {
        createTable(meetingArray)
    });
}

// create the table
function createTable(meetingArray) {
    if (meetingArray.length > 0) {
        const tbody = document.querySelector("#docent-body")
        let currentDate = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf("T"));
        let dateFiltered = meetingArray.filter(filterDate)
        let planningLength = 0
        let maxLength = 3
        let arrayLength = dateFiltered.length

        console.log(teacherSelectBox.value)
        tbody.replaceChildren()

        while (planningLength < arrayLength && planningLength < maxLength) {
            if (dateFiltered[planningLength]["teacher"].includes(teacherSelectBox.value)) {
                console.log(dateFiltered[planningLength]["teacher"])
                tbody.innerHTML += escape(
                    "<td><strong> " + dateFiltered[planningLength]["name"] + "</strong></td>" + " " +
                    "<td><small>" + dateFiltered[planningLength]["date"] + "</small></td>" + " " +
                    "<td><small>" + dateFiltered[planningLength]["start_time"] + "</small></td>" + " " +
                    "<td><small>" + dateFiltered[planningLength]["end_time"] + "</small></td>")
            }
            planningLength++
        }
        if (tbody.innerHTML === "") {
            tbody.innerHTML = "<td>Geen aankomende bijeenkomsten</td>"
        }
        function filterDate(meetingArray) {
            return meetingArray["date"] >= currentDate
        }
    } else {
        console.log("kio")
    }
}

// activate the getMeeting function when the DOM is loaded
document.addEventListener('DOMContentLoaded', getMeeting())

