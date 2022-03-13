(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/obj/index.js
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


;// CONCATENATED MODULE: ./src/arr/index.js
class Arr extends Array {
    /**
     * Creates a new Arr
     * @param  {...any|any|array} args 
     */
    // @ts-ignore
    constructor(...args) {
        if (args.length === 1) {
            if (Arr.isArray(args[0])) {
                super(...args[0]);
            } else if (typeof args[0] === 'number') {
                super(...[]);
                this.push(args[0]);
            }
        } else {
            super(...args);
        }
    }

    /**
     * @description Gets the actual size of array.
     * @returns the array size.
     */
    // @ts-ignore
    get size() {
        return Object.keys(this).length;
    }

    /**
     * @description Gets the actual size of array.
     * @param {array} arr an array to inspect.
     * @returns the array size.
     */
    static size(arr) {
        return Object.keys(arr).length;
    }

    /**
     * @description Checks if array is an empty.
     * @return true if array is empty, else false.
     */
    // @ts-ignore
    get isEmpty() {
        return Object.keys(this).length ? false : true;
    }

    /**
     * @description Checks if array is an empty.
     * @param {array} arr an array to check.
     * @return true if array is empty, else false.
     */
    static isEmpty(arr) {
        return Object.keys(arr).length ? false : true;
    }

    // @ts-ignore
    #isArrOrObj(item) {
        return item !== null && typeof item === 'object' || item !== null && this.isArray(item);
    }

    // @ts-ignore
    #isEqu(item, item2) {
        const isArray = this.isArray(item);
        let firstArr = item;
        let secondArr = item2;
        if (!isArray) {
            firstArr = Object.keys(item);
            secondArr = Object.keys(item2);
        }
        if (firstArr.length !== secondArr.length) return false;
        for (const key in firstArr) {
            if (this.#isArrOrObj(firstArr[key]) !== this.#isArrOrObj(secondArr[key])) return false;

            if (this.#isArrOrObj(firstArr[key]))
                if (!this.#isEqu(firstArr[key], secondArr[key])) return false;

            if (!isArray)
                if (firstArr[key] !== secondArr[key] || item[firstArr[key]] !== item2[firstArr[key]]) return false;

            if (firstArr[key] !== secondArr[key]) return false;
        }
        return true;
    }

    /**
     * @description Compares between two arrays to determine if they are equivalent.
     * @param {Array} array an array to compare.
     * @returns true if the arrays are equivalent, else false.
     */
    isEqual(array) {
        if (this.length !== array.length) return false;
        for (let key in this) {
            if (this.#isArrOrObj(this[key]) !== this.#isArrOrObj(array[key])) return false;
            
            if (this.#isArrOrObj(this[key])) if (!this.#isEqu(this[key], array[key])) return false;
            
            if (this[key] !== array[key]) return false;
        }
        return true;
    }

    /**
     * @description Removes all empty items "undefined" from array.
     * @returns the new array length.
     */
    fixed() {
        let length = this.length || 0;
        while (length--) {
            if (!this.includes(undefined)) break;
            if (this[length] === undefined) {
                this.splice(length, 1);
            }
        }
        return this.length;
    }

    /**
     * @description Removes all empty items "undefined" from array.
     * @param {array} arr an array to modify.
     * @returns the new array length.
     */
    static fixed(arr) {
        if (!this.isArray(arr))
            throw new TypeError(`${Object.keys({ arr })[0]} unexpected argument`);

        let length = arr.length || 0;
        while (length--) {
            if (!arr.includes(undefined)) break;
            if (arr[length] === undefined) arr.splice(length, 1);
        }
        return arr.length;
    }

    /**
     * @description Sorts the array by the order.
     * @param {String} order a flag, asc is ascending and default value, dsc is descending and alp is alphabet.
     * @returns the new sorted array.
     */
    sortBy(order = 'asc') {
        if (typeof order === 'string') order = order.toLocaleLowerCase();
        const sort = {
            asc: () => { return this.sort((a, b) => (isNaN(a) || isNaN(b)) ? a > b ? 1 : -1 : a - b) },
            dsc: () => { return this.sort((a, b) => (isNaN(a) || isNaN(b)) ? b > a ? 1 : -1 : b - a) },
            alp: () => { return this.sort() },
        }
        if (sort[order] === undefined)
            throw new TypeError(`${Object.keys({ order })[0]} unexpected argument`);
        return (sort[order]());
    }

    /**
     * @description Remove all items from array.
     */
    clear() {
        this.splice(0, this.length);
    }

    isArray(arg) {
        return Arr.isArray(arg);
    }

    /**
     * @description Removes an item/items by value.
     * @param {any} item to be removed from array, if present.
     * @param {Boolean} all removes all items from array if true, else false, default value is false.
     * @returns true if array countained the specified item and removed, else false.
     */
    remove(item, all = false) {
        if (!all) {
            let index = this.findIndex(i => this.#isArrOrObj(item)
                ? this.#isEqu(i, item) : i === item);
            if (index > -1) {
                this.splice(index, 1);
                return true;
            };
            return false;
        }
        let indexes = [];
        if (this.#isArrOrObj(item)) {
            indexes = this.reduce((a, e, i) => (this.#isEqu(e, item) ? [...a, i] : a), []);
        } else {
            indexes = this.reduce((a, e, i) => (e === item ? [...a, i] : a), []);
        }
        if (!indexes.length) return false;
        let length = indexes.length || 0;
        while (length--) {
            this.splice(indexes[length], 1);
        }
        return true;
    }
}


;// CONCATENATED MODULE: ./src/index.js



/* harmony default export */ const src = ({Arr: Arr, Obj: Obj});
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=obrays.js.map