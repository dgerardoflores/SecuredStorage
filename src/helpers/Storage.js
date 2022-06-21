import TypesStorages from './../interfaces/TypesStorages.js';
class Storage {
    static set(prefix, key, value, type) {
        const newKey = Storage.generateKeyWithPrefix(prefix, key);

        switch (type) {
            case TypesStorages.LOCAL_STORAGE:
                localStorage.setItem(newKey, JSON.stringify(value));

                break;
            case TypesStorages.SESSION_STORAGE:
                sessionStorage.setItem(newKey, JSON.stringify(value));

                break;
            default:
                throw new Error('An error occurred while choosing the correct storage')
        }
    }

    static get(prefix, key, type) {
        switch (type) {
            case TypesStorages.LOCAL_STORAGE:
                break;
            case TypesStorages.SESSION_STORAGE:
                break;
            default:
                throw new Error('An error occurred while choosing the correct storage')
        }
    }

    static generateKeyWithPrefix(prefix, key) {
        return prefix + '-' + key;
    }
}

export default Storage;