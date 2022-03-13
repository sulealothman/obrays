### Documentation

---

#### List of Obj methods

- [clone](#clone-obj)
- [clone `static`](#clone-static-obj)
- [cloneAsTemplate](#clone-template-obj)
- [$](#path-key-obj)
- [$s](#set-key-obj)
- [includes](#includes-obj)
- [includes `static`](#includes-static-obj)
- [remove](#remove-obj)
- [remove `static`](#remove-static-obj)
- [isObj `static`](#is-obj)
- [length `get`](#length-obj)
- [asJson](#asjson-obj)
- [parse](#parse-parse-obj)


#### List of Arr methods

- [remove](#remove-arr)
- [sortBy](#sort-by-arr)
- [isEqual](#is-equal-arr)
- [fixed](#fixed-arr)
- [fixed `static`](#fixed-static-arr)
- [size `get`](#size-arr)
- [size `static`](#size-static-arr)
- [isEmpty `get`](#is-empty-arr)
- [isEmpty `static`](#is-empty-static-arr)
- [clear](#clear-arr)

---

### Obj methods

### clone {#clone-obj}

Creates a deep clone of object.

##### Parameter

`obj`

The object to deeply clone.

##### Example

```js
const o = {
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
}

const obj = new Obj();
obj.clone(o);
o.username = "Alex";
o.info.bio = "I'm artist";
console.log(obj === o);
console.log(o);
console.log(obj);
```

####

Output

```bash
false
{ id: 1, username: 'Alex', info: { bio: "I'm artist" } }
Obj { id: 1, username: 'Suleiman', info: { bio: "I'm programmer" } }
```

### clone `static` {#clone-static-obj}

Creates a deep clone of object.

##### Parameter

`obj`

The object to deeply clone.

##### Example

```js
const o = {
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
}

const obj = Obj.clone(o);
o.username = "Alex";
o.info.bio = "I'm artist";
console.log(obj === o);
console.log(o);
console.log(obj);
```

####

Output

```bash
false
{ id: 1, username: 'Alex', info: { bio: "I'm artist" } }
Obj { id: 1, username: 'Suleiman', info: { bio: "I'm programmer" } }
```

### cloneAsTemplate {#clone-template-obj}

Creates a deep clone of object keys.

**Note** : All values of keys is undefined in new object.

##### Parameter

`obj`
The object to deeply clone.

##### Example

```js
const o = {
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
}

const obj = new Obj();
obj.cloneAsTemplate(o);
o.username = "7md";
o.info.bio = "I'm full stack developer";
console.log(obj === o);
console.log(obj);
console.log(o);
obj.username = "Osama";
console.log(obj);
```

####

Output

```bash
false
Obj { id: undefined, username: undefined, info: { bio: undefined } }
{ id: 1, username: '7md', info: { bio: "I'm full stack developer" } }
Obj { id: undefined, username: 'Osama', info: { bio: undefined } }
```

### $ {#path-key-obj}

Gets the value at path key of object.

##### Parameter

`pathKey`

The path key of the property to get.

##### Return value

Returns the resolved value.

##### Example

```js
const obj = new Obj({
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
});

console.log(obj.$('info.bio'));
console.log(obj.$('info.email'));
```

####

Output

```bash
I'm programmer
undefined
```

### $s {#set-key-obj}

Sets the value at path key of object. If path key doesn't exist, it's created.

##### Parameters

`pathKey`

The path key of the property to set.

`value`

The value to set.

##### Example 

```js
const obj = new Obj({
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
});

obj.$s('info.bio', 'i see nothing')
obj.$s('info.email', 'example@example.com');
obj.$s('info.social_media', {
    twitter : '@sulealothman'
});

console.log(obj.$('info.bio'));
console.log(obj.$('info.email'));
console.log(obj.$('info.social_media'));
```

####

Output

```bash
i see nothing
example@example.com
{ twitter: '@sulealothman' }
```

### includes {#includes-obj}

Checks if key is in object.

##### Parameters

`key`

The key to search for.

`isSubKey` Optional

The key value is path key if `true`, else `false`, default value is `false`.

##### Return value

Returns `true` if value is included, else `false`.

##### Examples

```js
const obj = new Obj({
    id: 1,
    language: 'javascript',
    framework: {
        vue: 'Vue',
        react: 'React',
        svelte: 'Svelte'
    }
});

console.log(obj.includes('library'));
```

####

Output

```bash
false
```

####

With `isSubKey` parameter

```js
const obj = new Obj({
    id: 1,
    language: 'javascript',
    framework: {
        vue: 'Vue',
        react: 'React',
        svelte: 'Svelte'
    }
});

console.log(obj.includes('framework.vue', true));
```

####

Output

```bash
true
```


### includes `static` {#includes-static-obj}

Checks if key is in object.

##### Parameters

`obj`

The object to search in.

`key`

The key to search for.

`isSubKey` Optional

The key value is path key if `true`, else `false`, default value is `false`.

##### Return value

Returns `true` if value is included, else `false`.

##### Examples

```js
const obj = {
    id: 1,
    language: 'javascript',
    framework: {
        vue: 'Vue',
        react: 'React',
        svelte: 'Svelte'
    }
};

console.log(Obj.includes(obj, 'library'));
```

####

Output

```bash
false
```

####

With `isSubKey` parameter

```js
const obj = {
    id: 1,
    language: 'javascript',
    framework: {
        vue: 'Vue',
        react: 'React',
        svelte: 'Svelte'
    }
};

console.log(Obj.includes(obj, 'framework.vue', true));
```

####

Output

```bash
true
```

### remove {#remove-obj}

Removes key/subKey from object.

##### Parameters

`key`

Key/pathKey to be removed from object, if present.

`isSubKey` Optional

The key value is path key if `true`, else `false`, default value is `false`.

##### Examples

```js
const o = new Obj({
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
});

console.log(o);
o.remove('info');
console.log(o);
```

####

Output

```bash
Obj { id: 1, username: 'Suleiman', info: { bio: "I'm programmer" } }
Obj { id: 1, username: 'Suleiman' }
```

####

With `isSubKey` parameter

```js
const o = new Obj({
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
});

console.log(o);
o.remove('info.bio', true);
console.log(o);
```

####

Output

```bash
Obj { id: 1, username: 'Suleiman', info: { bio: "I'm programmer" } }
Obj { id: 1, username: 'Suleiman', info: {} }
```

### remove `static` {#remove-static-obj}

Removes key/subKey from object.

##### Parameters

`obj`

The object to modify.

`key`

Key/pathKey to be removed from object, if present.

`isSubKey` Optional

The key value is path key if `true`, else `false`, default value is `false`.


##### Examples

```js
const o = {
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
};

console.log(o);
Obj.remove(o, 'id');
console.log(o);
```

####

Output

```bash
{ id: 1, username: 'Suleiman', info: { bio: "I'm programmer" } }
{ username: 'Suleiman', info: { bio: "I'm programmer" } }
```

####

With `isSubKey` parameter

```js
const o = {
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
};

console.log(o);
Obj.remove(o, 'info.bio', true);
console.log(o);
```

####

Output

```bash
Obj { id: 1, username: 'Suleiman', info: { bio: "I'm programmer" } }
Obj { id: 1, username: 'Suleiman', info: {} }
```

### isObj `static` {#is-obj}

Checks if value is Object.

##### Parameter

`value`

The value to check.

##### Return value

Returns `true` if value is an object, else `false`.

##### Example

```js
const obj = {
    id: 1,
    username : "Suleiman",
    info: {
        bio: "I'm programmer"
    }
};
const arr = [1, 2, 3];
const emptyObj = {};
console.log(Obj.isObj(obj));
console.log(Obj.isObj(arr));
console.log(Obj.isObj(emptyObj));
```

####

Output

```bash
true
false
true
```

### length `get` {#length-obj}

Gets the length of object keys.

##### Return value

Returns the length of object keys.

##### Example

```js
const o = new Obj({
    username: '',
    bio: ''
    email: '',
});

console.log(o.length);
```

####

Output

```
3
```

### asJson {#asjson-obj}

Converts this object to a JSON string.

##### Parameters

`replacer` Optional

`spacer` Optional

[More information about replacer & spacer parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

##### Return value

Returns JSON string.

##### Example

```js
const o = new Obj({
    username: "suleiman",
    bio: "I'm developer",
    email: "example@example.com",
});

const json = o.asJson();

console.log(json);
```

####

Output

```
{"username":"suleiman","bio":"I'm developer","email":"example@example.com"}
```

### parse {#parse-obj}

Parses a JSON string.

##### Parameter

`json`

The string to parse as JSON.

`reviver` Optional

[More information about reviver parameter.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

##### Example

```js
const json = '{"id":1,"language":"javascript"}';

const obj = new Obj({});
console.log(obj);
console.log(obj.parse(json));
```

####

Output

```bash
Obj {}
Obj { id: 1, language: 'javascript' }
```

---

### Arr Methods

### remove {#remove-arr}

Removes an item/items by value.

##### Parameters

`item`

Item to be removed from array, if present.

`all` Optional

Removes all items from array if `true`, else `false`, default value is `false`.

##### Return value

Returns `true` if array contained the specified item and removed, else `false`.

##### Examples

```js
const arr = new Arr([1, 2, 3, 4, 1]);
console.log(arr);
arr.remove(1);
console.log(arr);
```

####

Output

```bash
Arr(5) [ 1, 2, 3, 4, 1 ]
Arr(4) [ 2, 3, 4, 1 ]
```

####

With `all` parameter

```js
const arr = new Arr([1, 2, 3, 4, 1]);
console.log(arr);
arr.remove(1, true);
console.log(arr);
```

####

Output

```bash
Arr(5) [ 1, 2, 3, 4, 1 ]
Arr(3) [ 2, 3, 4 ]
```


### sortBy {#sort-by-arr}

Sorts the array by the `order`.

##### Parameter

`order`

The `order` a flag variable, `asc` is ascending and default value, `dsc` is descending and `alp` is alphabet.

##### Return value

Returns the new sorted array.

##### Example

```js
const arr = new Arr([1,2,3,4]);
const arr2 = new Arr([1,3]);
const arr3 = new Arr([1, 2, 3, 4]);

console.log(arr.isEqual(arr2));
console.log(arr.isEqual(arr3));
```

####

Output

```bash
false
true
```

### isEqual {#is-equal-arr}

Compares between two arrays to determine if they are equivalent.

##### Parameter

`arr`

The array to compare.

##### Return value

Returns `true` if the arrays are equivalent, else `false`.

##### Example

```js
const arr = new Arr([1,2,3,4]);
const arr2 = new Arr([1,3]);
const arr3 = new Arr([1, 2, 3, 4]);

console.log(arr.isEqual(arr2));
console.log(arr.isEqual(arr3));
```

####

Output

```bash
false
true
```


### fixed {#fixed-arr}

Removes all empty items `undefined` from array.

##### Return value

Returns the new array length.

##### Example

```js
const arr = new Arr([1,2,3,4]);
arr[100] = 100;

console.log(arr.length, arr);
console.log(arr.fixed(), arr);
```

####

Output

```bash
101 Arr(101) [ 1, 2, 3, 4, <96 empty items>, 100 ]
5 Arr(5) [ 1, 2, 3, 4, 100 ]
```

### fixed `static` {#fixed-static-arr}

Removes all empty items `undefined` from array.

##### Parameter

`arr`

The array to modify.

##### Return value

Returns the new array length.

##### Example

```js
const arr = [1,2,3,4];
arr[100] = 100;

console.log(arr.length, arr);
console.log(Arr.fixed(arr), arr);
```

####

Output

```bash
101 [ 1, 2, 3, 4, <96 empty items>, 100 ]
5 [ 1, 2, 3, 4, 100 ]
```

### size `get` {#size-arr}

Gets the actual size of array.

##### Return value

Returns the array size.

##### Example

```js
const arr = new Arr([1,2,3,4]);
arr[100] = 100;

console.log(arr.size);
console.log(arr.length);
```

####

Output

```bash
5
101
```

### size `static` {#size-static-arr}

Gets the actual size of array.

##### Parameter

`arr`

The array to inspect.

##### Return value

Returns the array size.

##### Example

```js
const arr = [1,2,3,4];
arr[100] = 100;

console.log(Arr.size(arr));
console.log(arr.length);
```

####

Output

```bash
5
101
```

### isEmpty `get` {#is-empty-arr}

Checks if array is an empty.

##### Return value

Returns `true` if array is empty, else `false`.

##### Example

```js
const arr = new Arr(1,2,3,4);

if(!arr.isEmpty) {
    // do something
    console.log(arr);
}
console.log(arr.isEmpty);
```

#### 

Output

```bash
Arr(4) [ 1, 2, 3, 4 ]
false
```

### isEmpty `static` {#is-empty-static-arr}

Checks if array is an empty.

##### Parameter

`arr`

The array to check.

##### Return value

Returns `true` if array is empty, else `false`.

##### Example

```js
const arr = [1,2,3,4];

if(!Arr.isEmpty(arr)) {
    // do something
    console.log(arr);
}
console.log(Arr.isEmpty(arr));
```

####

Output

```bash
[ 1, 2, 3, 4 ]
false
```

### clear {#clear-arr}

Removes all items from array.

##### Example

```js
const arr = new Arr(1,2,3,4);
console.log(arr);
arr.clear();
console.log(arr);
```

####

Output

```bash
Arr(4) [ 1, 2, 3, 4 ]
Arr(0) []
```