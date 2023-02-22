



// const toSend = {
//    name: "hi",
//    age: "this",
//    thing: "is"
// };

// const get_meeting = async () => {
//     try {
//         const  response = await fetch('/meeting/2', {
//             method: 'GET',
//             // body: "some body"
//             headers: {
//                 'Content-type': 'application/json'
//             }
//         });
//
//         const data = await response.json();
//         if (response.error) {
//             console.log("oopsie")
//         } else if (!response.ok) {
//             console.log("Some non-200 HTTP responmse code")
//         } else {
//             if (data["meeting"].length > 0) {
//                 const meetingInfo = document.querySelector("#test_div")
//                 meetingInfo.replaceChildren()
//                 data["meeting"].forEach(function (item) {
//                     meetingInfo.innerHTML +="<dt>" + item["name"] + "</dt><dd>" + item["location"] + "</dd>"
//                 })
//             }
//         }
//
//     } catch (e) {
//         console.log("Some error with fetching JSON from meeting server: " + e)
//     } finally {
//         setTimeout(get_meeting, 5000)
//     }
// }

let thing = '{{ meetingId }}';

      const toSend = {
      name: "hi",
      age: "this",
      thing: "is"
   };

const  jsonString = JSON.stringify(toSend);
console.log(jsonString);

function getMeeting() {


   const  jsonString = JSON.stringify(toSend);
   console.log(jsonString);
   const request = new XMLHttpRequest();
   request.open("GET", thing);
   request.setRequestHeader("Content-Type", "application/json");
   request.send(jsonString);
}

getMeeting()

function showMeeting(meeting) {
   document.querySelector("#test_div").empty()
   for(info of meeting) {
      document.querySelector("#test_div").append("<p>" + info["meeting"] + "</p>")
   }
}
// showMeeting()
window.addEventListener("load", () => {
   let dateTimeFrom = document.querySelector("#meeting_datetime")
   let newDate = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
   dateTimeFrom.min = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
   console.log(newDate)
});
