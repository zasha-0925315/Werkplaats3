window.addEventListener("load", () => {
   let dateTimeFrom = document.querySelector("#meeting_datetime")
   let newDate = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
   dateTimeFrom.min = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
   console.log(newDate)
});
