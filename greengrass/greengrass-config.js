'use strict'

const fs = require('fs');
const spawn = require('child_process').spawnSync;

var config = require('./base.config.json');

var configPath = "/greengrass/config/config.json";
var certsPath = "/greengrass/certs";
var certPath = `${certsPath}/cert.pem`;
var privateKeyPath = `${certsPath}/private.key`;


//Extract config & certs from Env Vars
var ggHost = process.env.GG_HOST;
var iotHost = process.env.IOT_HOST;
var thingArn = process.env.THING_ARN;

var cert =  Buffer.from(process.env.CERT.toString(), 'base64')
    .toString('ascii');
var privateKey = Buffer.from(process.env.PRIVATE_KEY.toString(), 'base64')
    .toString('ascii');


//Customize config
config.coreThing.ggHost = ggHost;
config.coreThing.iotHost = iotHost;
config.coreThing.thingArn = thingArn;

//deploy config
 fs.writeFileSync(configPath, JSON.stringify(config));

//deploy certs
 fs.writeFileSync(certPath, cert);
 fs.writeFileSync(privateKeyPath, privateKey);