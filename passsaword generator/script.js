function generatePassword() {
    // Şifre uzunluğunu al
    const length = parseInt(document.getElementById('length').value);

    // Uzunluk geçerli mi kontrol et
    if (isNaN(length) || length < 1 || length > 256) {
        alert('Lütfen 1 ile 256 arasında bir uzunluk girin.');
        return;
    }

    // Şifre karakter kümesi
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';

    // Rastgele karakterler seç
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Şifreyi ekrana yaz
    document.getElementById('password').textContent = password;
}
