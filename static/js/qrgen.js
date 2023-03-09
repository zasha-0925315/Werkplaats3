const btn = document.querySelector("#qr-gen");

function generateCode() {
    let getText = document.getElementById("text1").value;
    let getValue = document.querySelector("valuecheck")

    if (getText) { //laat pas de QR code zien als er daadwerkelijk text is ingevoerd
        let qr = new QRious({
            foreground: "#D30F4C",
            background: "#FFFFFF",
            backgroundAlpha: 0.1,
            size: 500,
            level: "H",
            padding: 25,
            element: document.getElementById("qr"),
            value: getText
        })
    } else {
        alert("Geen text ingevoerd!");
    }
}



btn.addEventListener('click', generateCode);