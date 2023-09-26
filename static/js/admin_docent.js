import escape from 'lodash.escape';

async function get_docenten(){
    try {
        const response = await fetch('../api/adminteacher');
        const docenten = await response.json();

        fill_table(docenten["docenten"])

    } catch(error) {
        const err = document.querySelector("#docent_table")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function fill_table(docenten){
    const table = document.querySelector("#docent_table table");
    const tb = document.querySelector("#docent_table tbody");
    
    table.appendChild(tb);

    for(const docent of docenten){
        let tr = document.createElement('tr');
        let escaped_id = escape(docent["id"])
        let escaped_voornaam = escape(docent["voornaam"])
        let escaped_achternaam = escape(docent["achternaam"])
        let escaped_email = escape(docent["email"])
        let escaped_is_admin = escape(docent["is_admin"])
        let escaped_is_verwijderd = escape(docent["is_verwijderd"])
        tr.innerHTML = '<td>' + escaped_id + '</td>'
        + '<td>' + escaped_voornaam + '</td>'
        + '<td>' + escaped_achternaam + '</td>'
        + '<td>' + escaped_email + '</td>'
        + '<td>' + escaped_is_admin + '</td>'
        + '<td>' + escaped_is_verwijderd + '</td>';
        tb.appendChild(tr);
    }
    // a click function for all rows that redirects to the student page of the selected row
    document.querySelectorAll("#docent_table tbody tr").forEach(row => {
        row.addEventListener("click", function (){
            window.location.href = "/admin/teacher/" + this.cells[0].innerHTML
        }, false)
    })
}

document.addEventListener('DOMContentLoaded', get_docenten);