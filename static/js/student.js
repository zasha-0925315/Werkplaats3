import escape from 'lodash.escape';

async function get_students(){
    try {
        const response = await fetch('../api/student');
        const students = await response.json();

        fill_table(students["studenten"])
        search_table(students);

    } catch(error) {
        const err = document.querySelector("#student_table")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}

function search_table(students){
    const student_list = students["studenten"];

    document.querySelector("#search_input").addEventListener('input', function(){
        // get the value from the input box
        let value = this.value.trim();

        if (value){
            let search_match = [];
            let i = 0;
            while (i < student_list.length) {
                // compare the input value with the values from the student_list
                if (student_list[i]["id"].toString().match(new RegExp(value, 'i')) ||
                    student_list[i]["voornaam"].match(new RegExp(value, 'i')) ||
                    student_list[i]["achternaam"].match(new RegExp(value, 'i')) ||
                    student_list[i]["klas"].match(new RegExp(value, 'i'))) {
                    // push the student_list row in a list
                    search_match.push(student_list[i])
                }
                i++
            }
            fill_table(search_match)
        }else{
            // if the input box is empty place back all the rows of student_list
            fill_table(student_list)
        }
    })
}

function fill_table(student_list){
    const table = document.querySelector("#student_table table");
    const tb = document.querySelector("#student_table tbody");
    // empty the table
    tb.replaceChildren()
    // place the filtered student_list rows in the table
    table.appendChild(tb);
    for(const student of student_list){
        let tr = document.createElement('tr');
        let escaped_id = escape(student["id"])
        let escaped_voornaam = escape(student["voornaam"])
        let escaped_achternaam = escape(student["achternaam"])
        let escaped_klas = escape(student["klas"])
        tr.innerHTML = '<td>' + escaped_id + '</td>'
        + '<td>' + escaped_voornaam + '</td>'
        + '<td>' + escaped_achternaam + '</td>'
        + '<td>' + escaped_klas + '</td>';
        tb.appendChild(tr);
    }
    // a click function for all rows that redirects to the student page of the selected row
    document.querySelectorAll("#student_table tbody tr").forEach(row => {
        row.addEventListener("click", function (){
            window.location.href = "/student/" + this.cells[0].innerHTML
        }, false)
    })
}

document.addEventListener('DOMContentLoaded', get_students);