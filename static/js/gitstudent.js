import escape from 'lodash.escape';


async function get_students(){
    try {
        const response = await fetch('../api/student');
        const students = await response.json();

        fill_select(students["studenten"])

    } catch(error) {
        const err = document.querySelector("#udonegoofed")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function fill_select(students){
    const select = document.getElementById("student");
    
    for(const student of students){
        let op = document.createElement('option');
        let escaped_student = escape(student["voornaam", "achternaam"])
        op.innerHTML = escaped_student;
        select.appendChild(op);
    }
}

document.addEventListener('DOMContentLoaded', get_students());