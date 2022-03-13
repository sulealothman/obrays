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

export { Arr };