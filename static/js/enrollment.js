import escape from 'lodash.escape';

async function get_enrollments(){
    try {
        const response = await fetch('../api/inschrijvingen');
        const enrollment = await response.json();

        fill_table(enrollment)

    } catch(error) {
        const err = document.querySelector("#enrollment_table")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function fill_table(obj){
    const table = document.querySelector("#enrollment_table table");
    const enrollments = obj.inschrijvingen;
    const tb = document.querySelector("#enrollment_table tbody");
    
    tb.replaceChildren()
    table.appendChild(tb);

    for(const enrollment of enrollments){
        let tr = document.createElement('tr');
        let escaped_id = escape(enrollment["id"])
        let escaped_student = escape(enrollment["student"])
        let escaped_voornaam = escape(enrollment["voornaam"])
        let escaped_achternaam = escape(enrollment["achternaam"])
        let escaped_klas = escape(enrollment["klas"])
        tr.innerHTML = '<td id="doei">' + escaped_id + '</td>'
        + '<td>' + escaped_student + '</td>'
        + '<td>' + escaped_voornaam + '</td>'
        + '<td>' + escaped_achternaam + '</td>'
        + '<td>' + escaped_klas + '</td>';
        tb.appendChild(tr);
    }
// copypasta click function
document.querySelectorAll("#enrollment_table tbody tr").forEach(row => {
    row.addEventListener("click", function (){
        window.location.href = "/enrollment/" + this.cells[0].innerHTML
    }, false)
})
}

document.addEventListener('DOMContentLoaded', get_enrollments());