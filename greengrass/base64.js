'use strict'

const fs = require('fs');

let id = "1b9f6dad65";
let certFile = fs.readFileSync(`${id}.cert.pem`);
let keyFile = fs.readFileSync(`${id}.private.key`);


let cert = certFile.toString('base64');

let key = keyFile.toString('base64');


console.log(cert);
console.log("")
console.log(key);