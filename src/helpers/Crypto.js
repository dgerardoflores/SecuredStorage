import * as CryptoUtils from 'crypto';

const ivLength = 16;
const algorithm = 'aes-128-ctr';

class Crypto {
    static encrypt(value, key) {
        const iv = CryptoUtils.randomBytes(16);

        let cipher = CryptoUtils.createCipheriv(algorithm, new Buffer(key), iv);

        let encrypted = cipher.update(value);
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        const buffer = Buffer.concat([iv, encrypted]);

        return buffer.toString('base64');
    }

    static decrypt(value, key) {
        let decodedAsBase64Value = Buffer.from(value, 'base64');
        let decodedAsBase64Key = Buffer.from(key);
        let ivArr = decodedAsBase64Value.slice(0, ivLength);
        let cipherTextArr = decodedAsBase64Value.slice(ivLength, decodedAsBase64Value.length);

        let cipher = CryptoUtils.createDecipheriv(algorithm, decodedAsBase64Key, ivArr);
        let decrypted = cipher.update(cipherTextArr, 'binary', 'utf8');
        decrypted += cipher.final('utf8');

        return decrypted;
    }

    static randomPassword(len) {
        const arr = new Uint8Array((len || 40) / 2);

        window.crypto.getRandomValues(arr);

        return Array.from(arr, dec2hex).join('')
    }
};



export default Crypto;