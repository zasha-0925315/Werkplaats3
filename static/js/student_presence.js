import escape from 'lodash.escape';

async function get_student_presence(){
    try {
        const url = window.location.pathname.split('/')
        const urlId = url[2]
        const response = await fetch('../api/student/' + urlId);
        const presence = await response.json();

        fill_name(presence["presence"][0])
        fill_table(presence["presence"])

    } catch(error) {
        const err = document.querySelector("#student_table")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function fill_name(name){
    const namePlate = document.querySelector("#student_name")
    namePlate.replaceChildren()
    namePlate.innerHTML = escape(name["voornaam"] + " " + name["achternaam"])
}

function fill_table(presence_list){
    const table = document.querySelector("#table_student_presence table");
    const tb = document.querySelector("#table_student_presence tbody");
    // empty the table
    tb.replaceChildren()

    table.appendChild(tb);
    for(const data of presence_list){
        let tr = document.createElement('tr');
        let presence = ""
        switch (data["aanwezigheid"]) {
            case 0:
                presence = '<td class="no_presence">Afwezig</td>'
                break
            case 1:
                presence = '<td class="yes_presence">Aanwezig</td>'
                break
            case 2:
                presence = '<td class="maybe_presence">Afgemeld</td>'
                break
        }
        tr.innerHTML = escape('<td>' + data["naam"] + '</td>'
            + '<td>' + data["datum"] + '</td>'
            + presence)

        // a click function for all rows that redirects to the meeting page of the selected row
        tr.addEventListener("click", function (){
            window.location.href = "/meeting/" + data["meeting"]
        })
        tb.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', get_student_presence);