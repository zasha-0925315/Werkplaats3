const url = '../api/class/json'

const get_meeting = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)
        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {
            let futureDate = new Date(data["meeting_info"][0]["date"])
            let currentDate = new Date();
            console.log(futureDate)
            if (data["meeting_info"].length > 0) {
                const tbody = document.querySelector("#docent-body")
                let planning_length = 0
                let meeting_info = data["meeting_info"].length
                tbody.replaceChildren()
                while (planning_length < meeting_info) {
                    tbody.innerHTML += " <td> " + data["meeting_info"][planning_length]["name"] + " " + data["meeting_info"][planning_length]["date"] + "</td>";
                    planning_length++
                }
            }
        }
    }


    catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}


get_meeting()

let interval_id = setInterval(get_meeting, 5000)