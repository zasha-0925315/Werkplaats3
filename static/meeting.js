    const get_meeting = async () => {
        try {
            const url = window.location.pathname.split('/')
            const urlId = url[2]
            const  response = await fetch('../api/'+ urlId, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.error) {
                console.log("oopsie")
            } else if (!response.ok) {
                console.log("Some non-200 HTTP response code")
            } else {

                if (data["presence_list"].length > 0) {
                    const meetingInfo = document.querySelector("#presence_table")
                    const presence_length = data["presence_list"].length
                    let n = 0
                    meetingInfo.replaceChildren()
                    while ( n < presence_length) {
                        if (data["presence_list"][n]["presence"] === 1) {
                            meetingInfo.innerHTML +=
                            "<td>" + data["presence_list"][n]["first name"] + " " + data["presence_list"][n]["last name"] + "</td>" +
                            "<td class='yes_presence'>" + "aanwezig" + "</td>"
                            n++
                        } else {
                            meetingInfo.innerHTML +=
                            "<td>" + data["presence_list"][n]["first name"] + " " + data["presence_list"][n]["last name"] + "</td>" +
                            "<td class='no_presence'>" + "afwezig" + "</td>"
                            n++
                        }

                    }

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
            setTimeout(get_meeting, 5000)
        }
    }
document.addEventListener('DOMContentLoaded', get_meeting)
