function toJson(){
    let id = parseInt(document.getElementById("student_table").rows[1].cells[0].innerHTML);
    
    let json = JSON.stringify({
        id : id,
        voornaam : document.getElementById("student_table").rows[1].cells[1].innerHTML,
        achternaam : document.getElementById("student_table").rows[1].cells[2].innerHTML,
    });

    return json;
}

console.log(toJson());

async function update_student(id){
    try {
        fetch('/admin/student/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: toJson()
        }).then(()=> {
            window.location.reload();
        })

        console.log("You're pretty good!")

    } catch(error) {

        console.log(error);
    }
}

async function delete_student(id){
    try {
        fetch('/admin/student/' + id, {
            method: 'DELETE'
        })

        console.log("Snake? Snake?! SNAAAAAKKKKEEEE!!!!")

    } catch(error) {

        console.log(error);
    }
}