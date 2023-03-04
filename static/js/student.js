async function get_students(){
    try {
        const response = await fetch('../api/student');
        const student = await response.json();
        
        console.log(`${JSON.stringify(student)}`);

        fill_table(student);

    } catch(error) {
        console.log(error);
    }
}

function fill_table(obj){
    const table = document.getElementById('table');
    const tb = document.createElement('tbody');
    const students = obj.studenten;

    table.appendChild(tb);
    
    for(const student of students){
        
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + student.id + '</td>'
        + '<td>' + student.voornaam + '</td>' +
        '<td>' + student.achternaam + '</td>';
        tb.appendChild(tr);
        
        //const snr = obj.id;
        //const voornaam = obj.voornaam;
        //const achternaam = obj.achternaam;
        //const tr = document.createElement('tr');
        //const th = document.createElement('th');
        //th.textContent = "studentennummer";
        //table.appendChild(th);
        //const td = document.createElement('td');

        
        //tr.textContent = student.id;
        
        //table.appendChild(tr);
    }
}

get_students();