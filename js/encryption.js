function encryptAES256(secretKey, toEncrypt) {
    var encrypted = CryptoJS.AES.encrypt(toEncrypt, secretKey);
    return encrypted;
}

function decryptAES256(secretKey, toDecrypt) {
    var decrypted = CryptoJS.AES.decrypt(toDecrypt, secretKey);
    return decrypted;
}