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
        //from base64 to byteArray
        let decodedAsBase64Value = Buffer.from(value, 'base64');
        let decodedAsBase64Key = Buffer.from(key);
        //get IV from message
        let ivArr = decodedAsBase64Value.slice(0, ivLength);
        //get crypted message from second part of message
        let cipherTextArr = decodedAsBase64Value.slice(ivLength, decodedAsBase64Value.length);

        let cipher = crypto.createDecipheriv(algorithm, decodedAsBase64Key, ivArr);
        //decrypted value
        let decrypted = cipher.update(cipherTextArr, 'binary', 'utf8');
        decrypted += cipher.final('utf8');

        return decrypted;
    }
};

//console.log(decrypt("86PVqXRrfJtHqjBNazWrZ4c8Zpcn+ypu6NOcXfY6FlKNNC4hJEgexiJdNrZrzi3g6HIFDp65zQ==", "3e$C!F)H@McQfTjK"));


export default Crypto;