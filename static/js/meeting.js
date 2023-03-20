const get_meeting = async () => {
    try {
        const url = window.location.pathname.split('/')
        const urlId = url[2]
        const response = await fetch('../api/' + urlId);
        const data = await response.json();

        console.log(data)
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
                while (student_count < presence_length) {

                    let afgemeld_reason = data["presence_list"][student_count]["afgemeld reason"]
                    if (afgemeld_reason === null) {
                        afgemeld_reason = "Geen reden"
                    }

                    let student_check_in_time = "<td>" + data["presence_list"][student_count]["check-in time"] + "</td>"
                    if (data["presence_list"][student_count]["check-in time"] === null) {
                        student_check_in_time = "<td></td>"
                    }

                    let student_name = "<td>" + data["presence_list"][student_count]["first name"] + " " + data["presence_list"][student_count]["last name"] + "</td>"
                    let student_class = "<td>" + data["presence_list"][student_count]["class"] + "</td>"
                    let student_afwezig = "<td class='no_presence'>Afwezig</td>"
                    let student_aanwezig = "<td class='yes_presence'>Aanwezig</td>"
                    let student_afgemeld = "<td class='maybe_presence'>Afgemeld</td>"
                    let student_error = "<td>" + "error" + "</td>"

                    let presence_options =
                        "<td class='presence_options'>" +
                        "<div id='button_presence_yes' class='button_presence' data-value='1' data-count=" + student_count + ">:)</div>" +
                        "<div id='button_presence_maybe' class='button_presence' data-value='2' data-count=" + student_count + ">:|</div>" +
                        "<div id='button_presence_no' class='button_presence' data-value='0' data-count=" + student_count + ">:(</div>" +
                        "</td>"


                    switch (data["presence_list"][student_count]["presence"]) {
                        case 0:
                            meetingInfo.innerHTML += student_name + student_class + student_afwezig + student_check_in_time + presence_options
                            break
                        case 1:
                            meetingInfo.innerHTML += student_name + student_class + student_aanwezig + student_check_in_time + presence_options
                            student_presence++
                            break
                        case 2:
                            meetingInfo.innerHTML += "<tr class='afgemeld_row'>" + student_name + student_class + student_afgemeld + student_check_in_time + presence_options +
                                "<td class='afgemeld_reason'>" + afgemeld_reason + "</td>" + "</tr>"
                            break
                        default:
                            meetingInfo.innerHTML += student_name + student_class + student_error + presence_options
                    }
                    student_count++
                }
                meetingFooter.replaceChildren()
                meetingFooter.innerHTML = "<td></td><td></td><td>" + student_presence + "/" + student_count + " " + "aanwezig" + "</td><td></td>"
            } else {
                console.log(data.length)
                const meetingInfo = document.querySelector("#presence_table")
                meetingInfo.replaceChildren()
                meetingInfo.innerHTML = "nope"
            }
        }

        document.querySelectorAll(".button_presence").forEach(presence_option => {
            presence_option.addEventListener("click", function () {
                let student = this.dataset.count
                let presence = parseInt(this.dataset.value)
                if (data["presence_list"][student]["presence"] !== presence) {
                    fetch('/meeting/' + urlId, {
                        method: 'PATCH',
                        body: JSON.stringify({
                            'presence': presence,
                            'meeting': data["presence_list"][student]["meeting"],
                            'student': data["presence_list"][student]["student"],
                            'reason': "Veranderd door leraar"
                        }),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                }
            },
                false)
        })

    } catch (e) {
        console.log("Some error with fetching JSON from meeting server: " + e)
    } finally {
        setTimeout(get_meeting, 5000)
    }
}
document.addEventListener('DOMContentLoaded', get_meeting)
