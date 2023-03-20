//do we even need async here?

function toJson(){
    let userid = parseInt(document.querySelector('input[name=user_id').value);
    const admin = document.querySelector('input[name=is_admin]:checked') !== null;
    let adminInt;

    if(!admin){
        adminInt = 0;
    } else {
        adminInt = 1;
    }
    
    let json = JSON.stringify({
        user_id : userid,
        gebruikersnaam : document.querySelector('input[name=gebruikersnaam').value,
        wachtwoord : document.querySelector('input[name=wachtwoord').value,
        is_admin : adminInt
    });
    console.log(json);

    return json
}

async function update_user(id){
    try {
        fetch('/user/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: toJson()
        });

        console.log("I need scissors! 61!")

    } catch(error) {

        console.log(error);
    }
}

async function delete_user(id){
    try {
        fetch('/user/' + id, {
            method: 'DELETE'
        });

        console.log("I hear it's amazing when the famous purple stuffed worm in flap-jaw space with the tuning fork does a raw blink on Hara-Kiri Rock.")

    } catch(error) {

        console.log(error);
    }
}