import escape from 'lodash.escape';

async function get_meetings() {
    try {
        const response = await fetch('../api/meeting');
        const meetings = await response.json();

        fill_table(meetings["meetings"])
        search_table(meetings);

    } catch (error) {
        const err = document.querySelector("#meeting_list_table")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function search_table(meetings) {
    const meeting_list = meetings["meetings"];

    document.querySelector("#search_input").addEventListener('input', function () {
        // get the value from the input box
        let value = this.value.trim();

        if (value) {
            let search_match = [];
            let i = 0;
            while (i < meeting_list.length) {
                // compare the input value with the values from the meeting_list
                if (meeting_list[i]["name"].match(new RegExp(value, 'i')) ||
                    meeting_list[i]["date"].match(new RegExp(value, 'i')) ||
                    meeting_list[i]["start_time"].match(new RegExp(value, 'i')) ||
                    meeting_list[i]["end_time"].match(new RegExp(value, 'i'))) {
                    // push the meeting_list row in a list
                    search_match.push(meeting_list[i])
                }
                i++
            }
            fill_table(search_match)
        } else {
            // if the input box is empty place back all the rows of meeting_list
            fill_table(meeting_list)
        }
    })
}

function fill_table(meeting_list) {
    const table = document.querySelector("#meeting_list_table table");
    const tb = document.querySelector("#meeting_list_table tbody");
    // empty the table
    tb.replaceChildren()
    // place the filtered meeting_list rows in the table
    table.appendChild(tb);
    for (const meeting of meeting_list) {
        let tr = document.createElement('tr');
        tr.innerHTML = escape('<td>' + meeting["name"] + '</td>'
            + '<td>' + meeting["date"] + '</td>'
            + '<td>' + meeting["start_time"] + '</td>'
            + '<td>' + meeting["end_time"] + '</td>');
        tr.addEventListener("click", function () {
            window.location.href = "/meeting/" + meeting["id"]
        })
        tb.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', get_meetings);