const get_meeting = async () => {
    try {
        const  response = await fetch('https://ffxivcollect.com/api/mounts/186', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        if (response.error) {
            console.log("oopsie")
        } else if (!response.ok) {
            console.log("Some non-200 HTTP response code")
        } else {

            if (data["name"].length > 0) {
                const meetingInfo = document.querySelector("#test_div")
                meetingInfo.replaceChildren()
                meetingInfo.innerHTML += data["name"] + data["id"]
            } else {
                console.log(data.length)
                const meetingInfo = document.querySelector("#test_div")
                meetingInfo.replaceChildren()
                meetingInfo.innerHTML = "nope"
            }
        }
    } catch (e) {
        console.log("Some error with fetching JSON from meeting server: " + e)
    } finally {
        setTimeout(get_meeting, 500000)
    }
}
