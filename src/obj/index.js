class Obj extends Object {

    /**
     * Creates a new Obj
     * @param {Object} obj 
     */
    constructor(obj = {}) {
        super();
        Obj.assign(this, this.#cloneObj(obj));
    }

    /**
     * @description Gets the length of object keys.
     * @returns the length of object keys.
     */
    // @ts-ignore
    get length() {
        return Obj.keys(this).length;
    }

    /**
     * @description Gets the value at path key of object.
     * @param {String} pathKey a path key of the property to get.
     * @returns the resolved value.
     */
    $(pathKey) {
        return Obj.#deepAccess(this, pathKey);
    }

    /**
     * @description Sets the value at path key of object. If path key doesn't exist, it's created.
     * @param {String} pathKey a path key of the property to set.
     * @param {String} value a value to set.
     */
    $s(pathKey, value) {
        const key = pathKey.split('.').pop();
        const pointer = Obj.#deepAccess(this, pathKey, true);
        pointer[key] = value;
    }

    /**
     * @description Checks if key is in object.
     * @param {String} key a key to search for.
     * @param {Boolean} isSubKey a key value is path key if true, else false, default value is false.
     * @returns true if value is included, else false.
     */
    includes(key, isSubKey = false) {
        if (!isSubKey)
            return this ? Obj.keys(this).includes(key) : false;

        const path = key;
        key = key.split('.').pop();
        const item = Obj.#deepAccess(this, path, true);

        return item ? Obj.keys(item).includes(key) : false;
    }

    /**
     * @description Checks if key is in object.
     * @param {Object} obj a object to search in.
     * @param {String} key a key to search for.
     * @param {Boolean} isSubKey a key value is path key if true, else false, default value is false.
     * @returns true if value is included, else false.
     */
    static includes(obj, key, isSubKey = false) {
        if (!isSubKey) return Obj.keys(obj).includes(key);

        const path = key;
        const item = this.#deepAccess(obj, path, true);
        key = key.split('.').pop();
        return item ? Obj.keys(item).includes(key) : false;
    }

    /**
     * @description Removes key/subKey from object.
     * @param {String} key a key/pathKey to be removed from object, if present. 
     * @param {*} isSubKey a key value is path key if true, else false, default value is false.
     */
    remove(key, isSubKey = false) {
        let item = this;
        if (isSubKey) {
            const path = key;
            key = key.split('.').pop();
            item = Obj.#deepAccess(this, path, true);
        }
        if (item[key]) delete item[key];
    }

    /**
     * @description Removes key/subKey from object.
     * @param {Object} obj a object to modify
     * @param {String} key a key/pathKey to be removed from object, if present. 
     * @param {*} isSubKey a key value is path key if true, else false, default value is false.
     */
    static remove(obj, key, isSubKey = false) {
        let item = obj;
        if (isSubKey) {
            const path = key;
            key = key.split('.').pop();
            item = this.#deepAccess(obj, path, true);
        }

        if (item[key]) delete item[key];
    }

    /**
     * @description Creates a deep clone of object.
     * @param {object} obj an object to deeply clone.
     */
    clone(obj) {
        Obj.assign(this, this.#cloneObj(obj));
    }

    /**
     * @description Creates a deep clone of object.
     * @param {object} obj an object to deeply clone.
     */
    static clone(obj) {
        const newObj = !Array.isArray(obj) ? {} : [];
        for (const key of Object.keys(obj)) {
            newObj[key] = !(typeof (obj[key]) === 'object') ?
                obj[key] : this.clone(obj[key]);
        }
        return newObj;
    }

    // @ts-ignore
    #cloneObj(obj) {
        const newObj = !Array.isArray(obj) ? {} : [];
        for (const key of Obj.keys(obj)) {
            newObj[key] = !(typeof (obj[key]) === 'object') ?
                obj[key] : this.#cloneObj(obj[key]);
        }
        return newObj;
    }

    /**
     * @description Creates a deep clone of object keys. 
     * Note : All values of keys is undefined in new object.
     * @param {object} obj an object to deeply clone.
     */
    cloneAsTemplate(obj) {
        Obj.assign(this, this.#cloneObjTemplate(obj));
    }

    // @ts-ignore
    #cloneObjTemplate(obj) {
        const newObj = !Array.isArray(obj) ? {} : [];
        for (const key of Obj.keys(obj)) {
            newObj[key] = !(typeof (obj[key]) === 'object') ?
                undefined : this.#cloneObjTemplate(obj[key]);
        }
        return newObj;
    }

    /**
     * @description Converts this object to a JSON string.
     * @param {*} replacer 
     * @param {*} spacer 
     * @returns JSON string
     */
     asJson(replacer = undefined, spacer = undefined) {
        return JSON.stringify(this, replacer, spacer);
    }

    /**
     * @description Parses a JSON string.
     * @param {*} json a string to parse as JSON.
     * @param {*} reviver 
     * @returns object
     */
    parse(json, reviver = undefined) {
        return Obj.assign(this, JSON.parse(json, reviver));
    }
    
    /**
     * @description Checks if value is Object.
     * @param {Object} value a value to check.
     * @returns true if value is an object, else false.
     */
    static isObj(value) {
        if (
            typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null
        ) {
            return true;
        }
        return false;
    }

    // @ts-ignore
    static #deepAccess(obj, pathKey, asKey = false) {
        const path = pathKey.split('.');
        if (asKey) path.pop();
        return path.reduce((acc, val) => {
            if (acc) return acc[val];
            return false;
        }, obj);
    }
}

export { Obj };