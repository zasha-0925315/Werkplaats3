const qrReader = new ZXing.BrowserQRCodeReader();
const inputId = undefined; //dit meegeven zodat ie op een mobile device altijd de achterste camera pakt
const qrRes = document.getElementById('qrres')
const qrScanner = document.querySelector('#qrscan-container')
const qrText = document.querySelector('#QR_Scan_Text')

function decode(qrReader, selectedDeviceId) {
    /*console.log(selectedDeviceId)
    qrRes.textContent = selectedDeviceId;*/
    qrReader.decodeOnceFromVideoDevice(selectedDeviceId, 'qrscan')
        .then((result) => {
            console.log(result)
            qrRes.textContent = result.text
            qrScanner.style.display = 'None'
            qrText.style.display = 'None'
            qrRes.style.fontWeight = '500'
            qrRes.style.fontSize = '30px'
            window.location.href = result.text
        })
        .catch((err) => {
            console.error(err)
            qrRes.textContent = err
        });
}

function doSomething() {
    console.warn("camera ded");
}

decode(qrReader, inputId);
doSomething();
