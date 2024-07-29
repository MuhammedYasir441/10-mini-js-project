function generateQRCode() {
    // Kullanıcıdan metni al
    var text = document.getElementById('textInput').value;
    
    // QR kodunu temizle
    var qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = '';
    
    // QR kodunu oluştur
    if (text.trim() !== '') {
        var qr = document.createElement('div');
        qrCodeContainer.appendChild(qr);
        $(qr).qrcode({
            text: text
        });
    } else {
        alert('Lütfen metin girin!');
    }
}
