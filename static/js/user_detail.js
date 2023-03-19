//this is a mess hahahahahahahaidhiehfshfsiefjeifjsie 

let th = ["user_id", "gebruikersnaam", "wachtwoord", "is_admin"];
let td = [];

const table = document.getElementById("user").rows;

for(let i = 0; tbody = table[1].cells.item(i); i++){ //gooit de txt van tabel in array
    //console.log(tbody.innerHTML);
    td.push(tbody.innerHTML);
}

let shit = {}; //bovenste twee arrays dumpen in een object zodat ik t naar json kan dingesen
for(let j = 0; j < th.length; j++){
    shit[th[j]] = td[j];
}

let shitJSON = JSON.stringify(shit);

console.log(th, td);
console.log(shit);
console.log(shitJSON);

/*
//ar
const table = document.getElementById("user").rows;

Array.from(table).forEach(row => {
    const cell = Array.from(row.cells);
    cell.forEach(cell => {
        console.log(cell.innerHTML);
    });
}); 
*/

//todo: shit om tabel shit te laten onthouden want lmao.


async function delete_user(id){
    try {
        fetch('{{url_for("delete_user")}}' + id, {
            method: 'DELETE'
        })

        console.log("delet")

    } catch(error) {

        console.log(error);
    }
}

async function update_user(id){
    try {
        fetch('/user/' + id, {
            method: 'PATCH',
            /*headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(table)*/
        })

        console.log("I need scissors! 61!")

    } catch(error) {

        console.log(error);
    }
}

//document.addEventListener('DOMContentLoaded', get_users());