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
    const table = document.getElementById('table');
    const docenten = obj.docenten;
    const th = document.createElement('theader');
    const tb = document.createElement('tbody');
    const thr = document.createElement('tr');
    const thh = document.createElement('th');
    const thh2 = document.createElement('th');
    const thh3 = document.createElement('th');
    const thh4 = document.createElement('th');

    thh.textContent = "docentencode";
    thh2.textContent = "voornaam";
    thh3.textContent = "achternaam";
    thh4.textContent = "email";
   
    th.appendChild(thr);
    thr.appendChild(thh);
    thr.appendChild(thh2);
    thr.appendChild(thh3);
    thr.appendChild(thh4);
    
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