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
                    const meetingFooter = document.querySelector("#presence_table_footer")
                    const presence_length = data["presence_list"].length
                    let student_count = 0
                    let student_presence = 0
                    meetingInfo.replaceChildren()
                    while ( student_count < presence_length) {
                        switch (data["presence_list"][student_presence]["presence"]) {
                            case 0:
                                meetingInfo.innerHTML +=
                                "<td>" + data["presence_list"][student_presence]["first name"] + " " + data["presence_list"][student_presence]["last name"] + "</td>" +
                                "<td class='no_presence'>" + "Afwezig" + "</td>"
                                student_count++;
                                break;
                            case 1:
                                meetingInfo.innerHTML +=
                                "<td>" + data["presence_list"][student_presence]["first name"] + " " + data["presence_list"][student_presence]["last name"] + "</td>" +
                                "<td class='yes_presence'>" + "aanwezig" + "</td>"
                                student_count++
                                student_presence++;
                                break;
                            case 2:
                                meetingInfo.innerHTML +=
                                "<td>" + data["presence_list"][student_presence]["first name"] + " " + data["presence_list"][student_presence]["last name"] + "</td>" +
                                "<td class='maybe_presence'>" + "afgemeld" + "</td>"
                                student_count++;
                                break;
                            default:
                                meetingInfo.innerHTML +=
                                "<td>" + data["presence_list"][student_presence]["first name"] + " " + data["presence_list"][student_presence]["last name"] + "</td>" +
                                "<td>" + "error" + "</td>"
                                student_count++;
                        }
                    }
                    meetingFooter.replaceChildren()
                    meetingFooter.innerHTML = "<td>" + "</td>" + "<td>" + student_presence + "/" + student_count + " " + "aanwezig" + "</td>"


                } else {
                    console.log(data.length)
                    const meetingInfo = document.querySelector("#presence_table")
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
