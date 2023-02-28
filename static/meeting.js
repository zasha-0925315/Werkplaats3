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
                console.log(data["presence_list"])

                meetingInfo.replaceChildren()
                while ( student_count < presence_length) {
                    let student_name = "<td>" + data["presence_list"][student_count]["first name"] + " " + data["presence_list"][student_count]["last name"] + "</td>"
                    let student_afwezig = "<td class='no_presence'>" + "Afwezig" + "</td>"
                    let student_aanwezig = "<td class='yes_presence'>" + "aanwezig" + "</td>"
                    let student_afgemeld = "<td class='maybe_presence'>" + "afgemeld" + "</td>"
                    let student_error = "<td>" + "error" + "</td>"
                    let presence_options = "<td class='presence_options'>" +
                        "<button onclick=set_presence()></button>" +
                                                    "<input type='hidden' name='meeting_id' value=" + data["presence_list"][student_count]["meeting"] + ">" +
                                                    "<input type='hidden' name='meeting_id' value=" + data["presence_list"][student_count]["student"] + ">" +
                                                    "<input type='submit' class='button_presence_no' name='button_presence_no' value='-'>" +
                                                    "<input type='submit' class='button_presence_yes' name='button_presence_yes' value='+'>" +
                                                    "<input type='submit' class='button_presence_maybe' name='button_presence_maybe' value='/'>" +
                                            "</td>"
                    switch (data["presence_list"][student_count]["presence"]) {
                        case 0:
                            meetingInfo.innerHTML += student_name + student_afwezig + presence_options
                            break
                        case 1:
                            meetingInfo.innerHTML += student_name + student_aanwezig + presence_options
                            student_presence++
                            break
                        case 2:
                            meetingInfo.innerHTML += student_name + student_afgemeld + presence_options
                            break
                        default:
                            meetingInfo.innerHTML += student_name + student_error + presence_options
                    }
                    student_count++
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

        function set_presence(student) {
            fetch('/meeting/' + urlId, {
                headers: {
                    'Content-type': 'application/json'
                },
                method : 'PATCH',
                body : JSON.stringify( {
                    'presence' : data["presence_list"][student]["presence"],
                    'meeting' : data["presence_list"][student]["meeting"],
                    'student' : data["presence_list"][student]["student"]
                })
            }).then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (response) {
                            console.log(response)
                        });
                } else {
                    throw Error('Oops')
                }
            }).catch(function (error) {
                console.log(error)
            })
        }

    } catch (e) {
        console.log("Some error with fetching JSON from meeting server: " + e)
    } finally {
        setTimeout(get_meeting, 50000000)
    }
}
document.addEventListener('DOMContentLoaded', get_meeting)
