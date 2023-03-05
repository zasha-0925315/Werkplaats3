async function get_students(){
    try {
        const response = await fetch('../api/student');
        const student = await response.json();
        
        console.log(`${JSON.stringify(student)}`);

        fill_table(student);

    } catch(error) {
        const err = document.getElementById('test');
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function fill_table(obj){
    const table = document.getElementById('tabel');
    const students = obj.studenten;
    const tb = document.createElement('tbody');

    table.appendChild(tb);
    
    for(const student of students){
        
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + student.id + '</td>'
        + '<td>' + student.voornaam + '</td>' +
        '<td>' + student.achternaam + '</td>';
        tb.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', get_students());