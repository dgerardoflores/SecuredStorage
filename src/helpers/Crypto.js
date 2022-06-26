import * as CryptoUtils from 'crypto';

const ivLength = 16;
const algorithm = 'aes-128-ctr';
const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

class Crypto {
    static encrypt(value, key) {
        const iv = CryptoUtils.randomBytes(ivLength);

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

        return Array.from(arr, Crypto.dec2hex).join('')
    }

    static dec2hex(dec) {
        return dec.toString(16).padStart(2, "0")
    }

    static encodeBase64(input) {
        if (input === null) return null;

        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        input = Crypto.utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }

        return output;
    }

    static decodeBase64(input) {
        if (input === null) return null;

        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Crypto.utf8_decode(output);

        return output;
    }

    static utf8_encode(input) {
        input = input.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < input.length; n++) {

            var c = input.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    static utf8_decode(utftext) {
        let string = "";
        let i = 0;
        let c = 0, c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

export default Crypto;