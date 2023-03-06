window.addEventListener("load", () => {
   let dateFrom = document.querySelector("#meeting_date")
   let newDate = new Date().toISOString().split('T')[0];
   dateFrom.min = new Date().toISOString().split('T')[0];
   console.log(newDate)
});

const startTime = document.querySelector("#meeting_start_time")
const endTime = document.querySelector("#meeting_end_time")

startTime.addEventListener('change', function () {
   console.log("change")
   if (startTime.value) {
      endTime.min = startTime.value
      console.log(endTime.min)
   }
})
