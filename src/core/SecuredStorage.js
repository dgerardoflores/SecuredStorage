import Storage from './../helpers/Storage.js';
import Crypto from './../helpers/Crypto.js';
import TypesStorages from './../interfaces/TypesStorages.js';
import md5 from 'blueimp-md5';

class SecuredStorage {
    static initalize(data) {
        if (data === undefined || data === null) {
            data = new Object();
        }

        if (data.key === undefined) {
            data.key = Crypto.randomPassword(16);
        } else {
            if (data.key.length < 16) {
                const missingDigits = 16 - data.key.length;

                for (let i = 0; i < missingDigits; i++) {
                    data.key = data.key + "0";
                }
            } else if (data.key.length > 16) {
                data.key = data.key.substring(0, 16);
            }
        }

        if (data.enableExtraSecure === undefined) {
            data.enableExtraSecure = false;
        }

        if (data.enableExtraSecure) {
            window.setInterval(() => {
               // debugger;
            }, 1000);
        }

        const keyPassowordEncryptedVerification = Storage.get("sapphire", "pwd", TypesStorages.LOCAL_STORAGE);

        if (keyPassowordEncryptedVerification !== null) {
            console.info("Secured Storage: Secure storage is active");

            return;
        } else {
            console.info("Secured Storage: Secured Storage was initialized");
        }

        if (data.prefix === undefined) {
            data.prefix = null;
        }

        const keyPrefixEncrypted = Crypto.encrypt(window.navigator.userAgent, data.key);
        const keyPasswordEncrypted = Crypto.encrypt(window.location.origin, data.key);

        let tmpPwd = md5(data.key);
        tmpPwd = tmpPwd.substring(0, 16);

        Storage.set(null, keyPrefixEncrypted, data.prefix, TypesStorages.LOCAL_STORAGE);
        Storage.set(null, keyPasswordEncrypted, tmpPwd, TypesStorages.LOCAL_STORAGE);
        Storage.set("sapphire", "pwd", keyPasswordEncrypted, TypesStorages.LOCAL_STORAGE);
    }

    static set(key, value) {
        if (key === undefined || key === null) {
            throw new Error("It is mandatory to send a key");
        }

        if (value === undefined || value === null) {
            throw new Error("It is mandatory to send a value");
        }

        const keyPassowordEncrypted = Storage.get("sapphire", "pwd", TypesStorages.LOCAL_STORAGE);
        const password = Storage.get(null, keyPassowordEncrypted, TypesStorages.LOCAL_STORAGE);

        const keyPrefixEncrypted = Crypto.encrypt(window.navigator.userAgent, password);

        const prefix = Storage.get(null, keyPrefixEncrypted, TypesStorages.LOCAL_STORAGE);

        const newKey = md5(key, password);
        const newValue = Crypto.encodeBase64(Crypto.encrypt(JSON.stringify(value), password));

        Storage.set(prefix, newKey, newValue, TypesStorages.LOCAL_STORAGE);
    }

    static get(key) {
        if (key === undefined || key === null) {
            throw new Error("It is mandatory to send a key");
        }

        const keyPassowordEncrypted = Storage.get("sapphire", "pwd", TypesStorages.LOCAL_STORAGE);
        const password = Storage.get(null, keyPassowordEncrypted, TypesStorages.LOCAL_STORAGE);

        const keyPrefixEncrypted = Crypto.encrypt(window.navigator.userAgent, password);

        const prefix = Storage.get(null, keyPrefixEncrypted, TypesStorages.LOCAL_STORAGE);

        const newKey = md5(key, password);
        const newEncryptedValue = Storage.get(prefix, newKey, TypesStorages.LOCAL_STORAGE);
        const newJSONValueBase64 = Crypto.decodeBase64(newEncryptedValue);

        if (newJSONValueBase64 == null) {
            return null;
        }

        const newJSONValue = Crypto.decrypt(newJSONValueBase64, password);
        const value = JSON.parse(newJSONValue);

        return value;
    }

    static delete(key) {
        if (key === undefined || key === null) {
            throw new Error("It is mandatory to send a key");
        }

        const keyPassowordEncrypted = Storage.get("sapphire", "pwd", TypesStorages.LOCAL_STORAGE);
        const password = Storage.get(null, keyPassowordEncrypted, TypesStorages.LOCAL_STORAGE);

        const keyPrefixEncrypted = Crypto.encrypt(window.navigator.userAgent, password);

        const prefix = Storage.get(null, keyPrefixEncrypted, TypesStorages.LOCAL_STORAGE);

        const newKey = md5(key, password);

        const newEncryptedValue = Storage.delete(prefix, newKey, TypesStorages.LOCAL_STORAGE);

        return true;
    }

    static clear() {
        Storage.clear(TypesStorages.LOCAL_STORAGE);

        return true;
    }
};

export default SecuredStorage;