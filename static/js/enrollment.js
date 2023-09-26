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
        tr.innerHTML = escape('<td id="doei">' + enrollment["id"] + '</td>'
        + '<td>' + enrollment["student"] + '</td>'
        + '<td>' + enrollment["voornaam"] + '</td>'
        + '<td>' + enrollment["achternaam"] + '</td>'
        + '<td>' + enrollment["klas"] + '</td>');
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