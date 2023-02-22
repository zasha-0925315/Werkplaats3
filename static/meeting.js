const get_meeting = async () => {
    try {
        const  response = await fetch('https://xivapi.com/character/27782546', {
            method: 'GET',
            // body: "some body",
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
            console.log("Some non-200 HTTP responmse code")
        } else {
            if (data.length > 0) {
                const meetingInfo = document.querySelector("#test_div")
                meetingInfo.replaceChildren()
                data.forEach(function (item) {
                    meetingInfo.innerHTML +="<dt>" + item["name"] + "</dt><dd>" + item["location"] + "</dd>"
                })
            } else {
                const parsejson = JSON.parse(data)
                console.log(parsejson["Minions"])
                const meetingInfo = document.querySelector("#test_div")
                meetingInfo.replaceChildren()
                meetingInfo.innerHTML = parsejson
            }
        }
    } catch (e) {
        console.log("Some error with fetching JSON from meeting server: " + e)
    } finally {
        setTimeout(get_meeting, 500000)
    }
}
