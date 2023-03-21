function toJson(){
    let json = JSON.stringify({
        id : document.getElementById("docent_table").rows[1].cells[0].innerHTML,
        voornaam : document.getElementById("docent_table").rows[1].cells[1].innerHTML,
        achternaam : document.getElementById("docent_table").rows[1].cells[2].innerHTML,
        email : document.getElementById("docent_table").rows[1].cells[3].innerHTML
    });

    return json;
}

console.log(toJson());

async function update_docent(id){
    try {
        fetch('/admin/teacher/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: toJson()
        });

        console.log("Allons-y")

    } catch(error) {

        console.log(error);
    }
}

async function delete_docent(id){
    try {
        fetch('/admin/teacher/' + id, {
            method: 'DELETE'
        })

        console.log("Nope. Not gettin' outta this chair.")

    } catch(error) {

        console.log(error);
    }
}