async function get_classes(){
    try {
        const response = await fetch('../api/klas');
        const klas = await response.json();
        
        console.log(`${JSON.stringify(klas)}`);

        fill_table(klas);

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
    const klassen = obj.klassen;
    const tb = document.createElement('tbody');
    
    table.appendChild(tb);
    
    for(const klas of klassen){
        
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + klas + '</td>';
        tb.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', get_classes());