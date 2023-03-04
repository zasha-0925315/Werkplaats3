async function get_teachers(){
    try {
        const response = await fetch('../api/teacher');
        const docent = await response.json();
        
        console.log(`${JSON.stringify(docent)}`);

        fill_table(docent);

    } catch(error) {
        console.log(error);
    }
}

function fill_table(obj){
    const table = document.getElementById('tabel');
    const docenten = obj.docenten;
    const th = document.createElement('theader');
    const tb = document.createElement('tbody');
    const thr = document.createElement('tr');
    const dcode = document.createElement('th');
    const voornaam = document.createElement('th');
    const achternaam = document.createElement('th');
    const email = document.createElement('th');

    dcode.textContent = "docentencode";
    voornaam.textContent = "voornaam";
    achternaam.textContent = "achternaam";
    email.textContent = "email";
   
    th.appendChild(thr);
    thr.appendChild(dcode);
    thr.appendChild(voornaam);
    thr.appendChild(achternaam);
    thr.appendChild(email);
    
    table.appendChild(th);
    table.appendChild(tb);
    
    for(const docent of docenten){
        
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + docent.id + '</td>'
        + '<td>' + docent.voornaam + '</td>' +
        '<td>' + docent.achternaam + '</td>' +
        '<td>' + docent.email + '</td>';
        tb.appendChild(tr);

    }
}

get_teachers();