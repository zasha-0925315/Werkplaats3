const btn = document.querySelector("#qr-gen");

const urly = window.location.pathname.split('/')
const meetingId = urly[2]
const meetingvalue = 'checkin/' + meetingId

function generateCode() {
    if (meetingId) { // laat pas de QR code zien als er daadwerkelijk text is ingevoerd
        let qr = new QRious({
            foreground: "#D30F4C",
            background: "#FFFFFF",
            backgroundAlpha: 0.1,
            size: 500,
            level: "H",
            padding: 25,
            element: document.getElementById("qr"),
            value: meetingvalue
        })
    } else {
        alert("Geen text ingevoerd!");
    }
}

btn.addEventListener('click', generateCode);