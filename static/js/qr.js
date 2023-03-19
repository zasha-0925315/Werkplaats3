const qrReader = new ZXing.BrowserQRCodeReader();
const inputId = undefined; //dit meegeven zodat ie op een mobile device altijd de achterste camera pakt
const qrRes = document.getElementById('qrres')
const qrscanner = document.querySelector('#qrscan-container')

function decode(qrReader, selectedDeviceId) {
    /*console.log(selectedDeviceId)
    qrRes.textContent = selectedDeviceId;*/
    qrReader.decodeOnceFromVideoDevice(selectedDeviceId, 'qrscan')
        .then((result) => {
            console.log(result)
            qrRes.textContent = result.text
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

function clickY() {
    qrscanner.style.display = 'None';
}





qrRes.addEventListener('change', function () {
    qrscanner.style.display = "None";
});