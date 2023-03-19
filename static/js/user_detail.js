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
            headers: {
                'Content-Type' : 'application/json'
            }/*,
            body: JSON.stringify(table)*/
        })

        console.log("I need scissors! 61!")

    } catch(error) {

        console.log(error);
    }
}