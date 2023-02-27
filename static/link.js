const url = ('https://restcountries.com/v3.1/all')


fetch(url)
    .then(response => response.json())
    .then(repos => {
        const reposList = repos.map(repo => repo.name);
        console.log(reposList);
    })
    .catch(err => console.log(err))

function set_Meeting() {
    meeting = document.querySelector('tbody')
    meeting.innerHTML = country.name
}

const fetch_scores = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.error) {
            console.log('errorr')
        } else if (!response.ok) {
            console.log('some non-200 HTTP response code')
        } else {
            set_meeting(data)
        }
    } catch (e) {
        console.log("SOME ERROR WITH FETCHING FROM REPO: " + e)
    }
}

fetch_scores()

let interval_id = setInterval(fetch_scores, 5000)
// const SERVER_URL = ("https://restcountries.com/v3.1/all")

// function add_Country() {
//     let countries = JSON.parse(SERVER_URL.response)
//     console.log(countries)
//     document.getElementById('Docent-Planning').innerHTML = country.name
// }

// // function set_countries(countrydata) {
// //     let countrylist = document.getElementById("Docent-Planning")
// //     countrylist.replaceChildren()
// //     if (countrydata["country"].length > 0) {
// //         countrydata["country"].forEach(function (item) {
// //             countrylist.innerHTML += "<dt>" + item["name"] + "</dt><dd>" + item["country"] + "</dd>"
// //         })
// //     }
// // }

// const fetch_countries = async () => {
//     try {
//         const response = await fetch(SERVER_URL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const data = await response.json();
//         if (response.error) {
//             console.log("Countries error!!")
//         } else if (!response.ok) {
//             console.log("Some non-200 HTTP code")
//         } else {
//             set_countries(data)
//         }
//     } catch (e) {
//         console.log("Some error with fetching JSON from api: " + e)
//     }
// }

// fetch_countries()

// // Note that setInterval requires a function reference, not a variable!
// let interval_id = setInterval(fetch_countries, 5000)
