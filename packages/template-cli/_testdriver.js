/**
 * testdriver for cli to be used in a launc.json task definition
 */

const fs = require('fs'),
    handler = require('./index'),
    event = {};


try{
    console.log(`Running Handler handler() with this args: ${process.argv}`);
    let output = handler
    console.log('output :', output);
} catch (err) {
    console.error(err)
}
