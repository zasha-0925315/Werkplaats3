function toJson(){
    let id = parseInt(document.getElementById("inschrijving").rows[1].cells[0].innerHTML);
    let student = parseInt(document.getElementById("inschrijving").rows[1].cells[1].innerHTML);

    let json = JSON.stringify({
        id : id,
        student : student,
        voornaam : document.getElementById("inschrijving").rows[1].cells[2].innerHTML,
        achternaam : document.getElementById("inschrijving").rows[1].cells[3].innerHTML,
        klas : document.getElementById("inschrijving").rows[1].cells[4].innerHTML
    });

    return json
}

async function update_enrollment(id){
    try {
        fetch('/enrollment/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: toJson()
        });

        console.log("Kidneys!! I've got new kidneys! ...I don't like the colour.")

    } catch(error) {

        console.log(error);
    }
}

async function delete_enrollment(id){
    try {
        fetch('/enrollment/' + id, {
            method: 'DELETE'
        })

        console.log("You will be deleted.")

    } catch(error) {

        console.log(error);
    }
}