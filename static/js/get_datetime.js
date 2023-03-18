window.addEventListener("load", () => {
   let dateForm = document.querySelector("#meeting_date")
   dateForm.min = new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf("T"));
});