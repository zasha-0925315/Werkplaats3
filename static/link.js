let max = 3

const get_meeting = async () => {
    try {
        const url = window.location.pathname.split('/')
        const urlId = [1]
        const response = await fetch('../api/class/' + urlId, {
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
            if (data["meeting_info"].length > 0, data["meeting_info"].length < 3) {
                const table = document.getElementById("Docent-Table")
                const tbody = document.querySelector("tbody")
                table.innerHTML += data["meeting_info"][0]["name"] + " " + data["meeting_info"][0]["date"]
                if (data["meeting_info" === 3]) {
                    return;
                }
            }

        }
    } catch (e) {
        console.log("Some error with fetching JSON from Meetings server: " + e)
    }
}

get_meeting()

let interval_id = setInterval(get_meeting, 5000)