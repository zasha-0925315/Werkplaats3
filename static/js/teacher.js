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
        tr.innerHTML = escape('<td>' + docent.id + '</td>'
            + '<td>' + docent.voornaam + '</td>' +
            '<td>' + docent.achternaam + '</td>' +
            '<td>' + docent.email + '</td>');
        tb.appendChild(tr);

    }
}

document.addEventListener('DOMContentLoaded', get_teachers);