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
        if (response.error) {
            console.log("ouwh error")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code or something")
        } else {
            if (data["meeting_info"].length > 0) {
                const table = document.getElementById("Docent-Table")
                const tbody = document.querySelector("#docent-body")
                planning_length = 0
                tbody.replaceChildren()
                while (planning_length < 2) {
                    tbody.innerHTML += " <td> " + data["meeting_info"][0]["name"] + " " + data["meeting_info"][0]["date"] + "</td>";
                    tbody++
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