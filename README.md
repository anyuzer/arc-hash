# arc-hash [![Build Status](https://travis-ci.org/anyuzer/arc-hash.svg?branch=master)](https://travis-ci.org/anyuzer/arc-hash)
Convenience ES6 hashing library. Supports object, array and string hashing for md5 and sha256

**NOTE: 2.0 can be considered a breaking change. The hashes being returned were non standard (ie. did not match externally generated md5s or shas). This is fixed, but the hashes returned will be different that v1, so will be incompatible with stored hashes.**

## Install
```
$ npm install arc-hash --save
```

## Features
* supports md5 and sha256
* supports arrays and objects that reduce to scalar values

## Basic Usage

```js
const ArcHash = require('arc-hash');

// This is an example complex object that reduces to scalar value
const exampleObject = {
    'B': 5,
    'D': {
        'Zebra': 'Camel',
        'Antelope': [0,2,
            {
                'Deep':'Mind'
            },
            ['omega','alpha']
        ]
    },
    'A': 'Is a String',
};

console.log(ArcHash.md5(exampleObject));
/*
 Output: 7d388f6ec86c79805a534c910471c7c7
 Any change to the object including changing the order of an array, or changing the case in a key or a value will result in a new hash
*/


```

## API

### ArcHash.md5(value:Unknown)
Take an unknown value and return an md5 hash representing it

### ArcHash.sha256(value:Unknown)
Take an unknown value and return a sha256 hash representing it

## NOTES & WARNINGS
1. Array order matters for a hash, object order assignment does not.
2. Keys and values are case sensitive
3. Circular object references are not handled
4. String() is eventually applied to all values, so 5 and '5' will not be seen as different values
5. This is not incredibly performant, and should not be used for dynamic comparison over potentially large data sets
 
 
## Testing
```
npm test
```