import escape from 'lodash.escape';

async function get_accounts(){
    try {
        const response = await fetch('../api/accounts');
        const accounts = await response.json();

        console.log(`${JSON.stringify(accounts)}`);

        fill_table(accounts)

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
    const accounts = obj.accounts;
    const tb = document.querySelector("#user_table tbody");
    
    tb.replaceChildren()
    table.appendChild(tb);

    for(const account of accounts){
        let tr = document.createElement('tr');
        let escaped_id = escape(account["id"])
        let escaped_email = escape(account["email"])
        let escaped_docent = escape(account["docent"])
        let escaped_is_admin = escape(account["is_admin"])
        tr.innerHTML = '<td id="doei">' + escaped_id + '</td>'
        + '<td>' + escaped_email + '</td>'
        + '<td>' + escaped_docent + '</td>'
        + '<td>' + escaped_is_admin + '</td>';
        tb.appendChild(tr);
    }
    // copypasta click function
    document.querySelectorAll("#user_table tbody tr").forEach(row => {
        row.addEventListener("click", function (){
            window.location.href = "/account/" + this.cells[0].innerHTML
        }, false)
    })
}

document.addEventListener('DOMContentLoaded', get_accounts);