const get_meeting = async () => {
    try {
        const response = await fetch('../api/class/json');
        const data = await response.json();
        const meeting_array = data["meeting_info"]

        meeting_array.sort((a, b) => {
            if (a.date < b.date) {
                return -1
            }
        })

        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {


            if (meeting_array.length > 0) {
                const tbody = document.querySelector("#docent-body")
                let planning_length = 0
                let max_length = 3
                let array_length = meeting_array.length
                let currentDate = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf("T"));
                console.log("c:"+currentDate)
                console.log(meeting_array)
                tbody.replaceChildren()
                while (planning_length < array_length && planning_length < max_length) {
                    if (meeting_array[planning_length]["date"] <= currentDate) {
                        meeting_array.splice(planning_length, 1)
                        console.log(meeting_array)
                    }
                    console.log("t:"+meeting_array[planning_length]["date"])
                    tbody.innerHTML += " <td><strong> " + meeting_array[planning_length]["name"] + "</strong> <small>" + meeting_array[planning_length]["date"] + "</small></td>";
                    planning_length++
                }
            }
        }
    }
    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}


document.querySelector("#Select-Teacher").addEventListener("change", function () {
    if (this.value == "MEYEF") {
        console.log("MEYEF");
    } else if (this.value == "KNUFI") {
        console.log("KNUFI");
    } else {
        console.log('dog')
    }
});

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
