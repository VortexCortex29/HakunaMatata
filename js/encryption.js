function encryptAES256(secretKey, toEncrypt) {
    var encrypted = CryptoJS.AES.encrypt(toEncrypt, secretKey);
    return encrypted;
}

function decryptAES256(secretKey, toDecrypt) {
    var encrypted = CryptoJS.AES.decrypt(toDecrypt, secretKey);
    return encrypted;
}