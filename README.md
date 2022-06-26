<div align="center">
    <img src="./.github/logo.png" width="200px">
  <h1>Secured Storage</h1>
</div>
<p align="center">
  "Dance like no one is watching, encrypt like everyone is spying on you"
</p>
<p align="center">
   <a href=""><img src="https://img.shields.io/github/issues/gerardofloresdev/SecuredStorage" alt="Issues"></a>
   <a href=""><img src="https://img.shields.io/github/forks/gerardofloresdev/SecuredStorage" alt="Forks"></a>
   <a href=""><img src="https://img.shields.io/github/stars/gerardofloresdev/SecuredStorage" alt="Stars"></a>
    <a href=""><img src="https://img.shields.io/npm/dm/SecuredStorage?style=flat-square" alt="Downloads"></a>
   <a href=""><img src="https://img.shields.io/github/license/gerardofloresdev/SecuredStorage" alt="License"></a>
   <a href=""><img src="https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Fgerardofloresdev%2FSecuredStorage" alt="Twitter"></a>
</p>

## What is secure storage and why should we use it?

Has it happened to you that you want to save sensitive data at the frontend level? Or you do not want information that we commonly store in localstorage or sessionstorage to be intercepted by the user or even by attackers, because due to these problems we have decided to create a plugin to allow secure storage in a very simple way, where you will no longer have to worry about encryption, keys, etc.

## What is the operation?

To encrypt the information, AES of the CTR No Padding type is used, which is approved as part of the OWASP standards as a secure encryption algorithm, then it is saved to localStorage or sessionStorage depending on how you configure it in key/value format, for which the key is encrypted in MD5 and the value in AES CRT No Padding

## How to install it?

### npm (recommended)

```bash
$ npm i secured-storage --save
```

### yarn

```bash
$ yarn add secured-storage
```

## How is it used?

### Initialization

We can initialize the library with the following code:

```js
import { SecuredStorage } from 'secured-storage';

SecuredStorage.initalize();
```

### How to encrypt and save

To save securely you just have to call the "set" function, the first parameter is the key and the second parameter is the value, as shown in the following code example:

```js
import { SecuredStorage } from 'secured-storage';

SecuredStorage.set("name", "Charlotte Smith");
```

### How to decrypt and retrieve

To obtain a value and use the automatic decryption, just call the "get" function and it will return the value automatically

```js
import { SecuredStorage } from 'secured-storage';

const name = SecuredStorage.get("name");

console.log(name); // Charlotte Smith
```

### How delete

We can delete a record, specifying the value of its key

```js
import { SecuredStorage } from 'secured-storage';

SecuredStorage.delete("name"); // This will permanently delete the name attribute
```

### How to clear all storage

We can clean all the storage with a single command

```js
import { SecuredStorage } from 'secured-storage';

SecuredStorage.clear(); // This will erase all storage permanently
```