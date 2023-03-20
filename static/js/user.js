async function get_users(){
    try {
        const response = await fetch('../api/users');
        const users = await response.json();

        console.log(`${JSON.stringify(users)}`);

        fill_table(users)

    } catch(error) {
        const err = document.querySelector("#user_table")
        const txt = document.createElement('p');

        txt.textContent = error;
        err.appendChild(txt);

        console.log(error);
    }
}


function fill_table(obj){
    const table = document.querySelector("#user_table table");
    const users = obj.users;
    const tb = document.querySelector("#user_table tbody");
    
    
    tb.replaceChildren()
    table.appendChild(tb);

    for(const user of users){
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + user["id"] + '</td>'
        + '<td>' + user["email"] + '</td>'
        + '<td>' + user["docent"] + '</td>'
        + '<td>' + user["is_admin"] + '</td>';
        tb.appendChild(tr);
    }
// copypasta click function
document.querySelectorAll("#user_table tbody tr").forEach(row => {
    row.addEventListener("click", function (){
        window.location.href = "/user/" + this.cells[0].innerHTML
    }, false)
})

}

document.addEventListener('DOMContentLoaded', get_users());