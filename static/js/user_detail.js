//this is a mess hahahahahahahaidhiehfshfsiefjeifjsie 

let array = [];
let array2 = [];

const table = document.getElementById("user").rows;

for(let i = 0; th = table[0].cells.item(i); i++){
    //console.log(th.innerHTML);
    array.push(th.innerHTML);
}

for(let j = 0; tb = table[1].cells.item(j); j++){
    //console.log(tb.innerHTML);
    array2.push(tb.innerHTML);
}

array.forEach(function(val, index){
    array[i]
});

console.log(array, array2);

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