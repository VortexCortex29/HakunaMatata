function encryptAES256(secretKey, toEncrypt) {
    var encrypted = CryptoJS.AES.encrypt(toEncrypt, secretKey);
    return encrypted.toString();
}

function decryptAES256(secretKey, toDecrypt) {
    var decrypted = CryptoJS.AES.decrypt(toDecrypt, secretKey);
    return decrypted.toString();
}

function genPassword() {
    var password = "";
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
    for (var i = 0; i < 31; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}