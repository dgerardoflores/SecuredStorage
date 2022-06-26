import TypesStorages from './../interfaces/TypesStorages.js';
class Storage {
    static set(prefix, key, value, type) {
        const newKey = Storage.generateKeyWithPrefix(prefix, key);

        switch (type) {
            case TypesStorages.LOCAL_STORAGE:
                localStorage.setItem(newKey, value);

                break;
            case TypesStorages.SESSION_STORAGE:
                sessionStorage.setItem(newKey, value);

                break;
            default:
                throw new Error('An error occurred while choosing the correct storage')
        }
    }

    static get(prefix, key, type) {
        const newKey = Storage.generateKeyWithPrefix(prefix, key);

        switch (type) {
            case TypesStorages.LOCAL_STORAGE:
                return localStorage.getItem(newKey);
            case TypesStorages.SESSION_STORAGE:
                return sessionStorage.getItem(newKey);
            default:
                throw new Error('An error occurred while choosing the correct storage')
        }
    }

    static delete(prefix, key, type) {
        const newKey = Storage.generateKeyWithPrefix(prefix, key);

        switch (type) {
            case TypesStorages.LOCAL_STORAGE:
                return localStorage.removeItem(newKey);
            case TypesStorages.SESSION_STORAGE:
                return sessionStorage.removeItem(newKey);
            default:
                throw new Error('An error occurred while choosing the correct storage')
        }
    }

    static clear(type) {
        switch (type) {
            case TypesStorages.LOCAL_STORAGE:
                return localStorage.clear();
            case TypesStorages.SESSION_STORAGE:
                return sessionStorage.clear();
            default:
                throw new Error('An error occurred while choosing the correct storage')
        }
    }

    static generateKeyWithPrefix(prefix, key) {
        if (prefix === null) {
            return key;
        }

        return prefix + '-' + key;
    }
}

export default Storage;