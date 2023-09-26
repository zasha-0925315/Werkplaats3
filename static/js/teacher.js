import escape from 'lodash.escape';

async function get_teachers() {
    try {
        const response = await fetch('../api/teacher');
        const docent = await response.json();

        console.log(`${JSON.stringify(docent)}`);

        fill_table(docent);

    } catch (error) {
        const err = document.getElementById('test');
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function fill_table(obj) {
    const table = document.getElementById('tabel');
    const docenten = obj.docenten;
    const tb = document.createElement('tbody');

    table.appendChild(tb);

    for (const docent of docenten) {

        let tr = document.createElement('tr');
        let escaped_id = escape(docent.id)
        let escaped_voornaam = escape(docent.voornaam)
        let escaped_achternaam = escape(docent.achternaam)
        let escaped_email = escape(docent.email)
        tr.innerHTML = '<td>' + escaped_id + '</td>'
            + '<td>' + escaped_voornaam + '</td>' +
            '<td>' + escaped_achternaam + '</td>' +
            '<td>' + escaped_email + '</td>';
        tb.appendChild(tr);

    }
}

document.addEventListener('DOMContentLoaded', get_teachers);