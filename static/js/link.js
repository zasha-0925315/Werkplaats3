const get_meeting = async () => {
    try {
        const response = await fetch('../api/class/json');
        const data = await response.json();
        const meetingArray = data["meeting_info"]

        meetingArray.sort((a, b) => {
            if (a.date < b.date) {
                return -1
            }
        })
        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {
            selectTeacher(meetingArray)
        }
    }
    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}

function filterTeacher(meetingArray, teacher){
    return meetingArray["teacher"] === teacher
}

function selectTeacher(meetingArray){
    document.querySelector("#Select-Teacher").addEventListener("change", function () {
        let teacherArray = String(meetingArray["teacher"])
            .replaceAll(" ", "")
            .replaceAll("'", "")
            .replace("[", "")
            .replace("]", "")
            .split(",")

        let filteredTeacher = meetingArray.filter(meetingArray["teacher"] = this.value.replace("[", ""))
        console.log(teacherArray)
        return teacherArray = this.value
    });
}

function creatTable(meetingArray){
    if (meetingArray.length > 0) {
        const tbody = document.querySelector("#docent-body")
        let currentDate = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf("T"));
        let dateFiltered = meetingArray.filter(filterDate)
        let planningLength = 0
        let maxLength = 3
        let arrayLength = dateFiltered.length


        tbody.replaceChildren()

        while (planningLength < arrayLength && planningLength < maxLength) {
                meetingArray.splice(planningLength, 1)
              tbody.innerHTML +=
                "<td><strong> " + dateFiltered[planningLength]["name"] + "</strong></td>" + " " +
                "<td><small>" + dateFiltered[planningLength]["date"] + "</small></td>" + " " +
                "<td><small>" + dateFiltered[planningLength]["start_time"] + "</small></td>" + " " +
                "<td><small>" + dateFiltered[planningLength]["end_time"] + "</small></td>"

            planningLength++
        }
        function filterDate(meetingArray) {
            return meetingArray["date"] >= currentDate
        }
    }
}





function dropMenu() {
    document.getElementById('menu').style.display = 'initial'
}

// window.onclick = function (event) {
//     if (!event.target.matches('.Select-Planning-button')) {
//         let dropdowns = document.getElementsByClassName("menu");
//         let i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.style.display = 'initial') {
//                 (openDropdown.style.display = 'none')
//             }
//         }
//     }
// }

// lijst = document.querySelector('#Select-Teacher')
// lijst.addEventListener("change", docentLijst()); {

// };


get_meeting()

let interval_id = setInterval(get_meeting, 5000)
