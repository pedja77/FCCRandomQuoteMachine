'use strict'
function fortunes2object() {
// Handle command line arguments
const args = process.argv.slice(2);
const help = `
Type -h for help.
Usage:
node fortunes2object path/to/fortunes/dir path/to/output_file\n`;

if (args.length < 2 || args[0] === "-h") {
  console.log(help);
  return process.exitCode = 1;
}

// Prepare fs operations
const fs = require('fs')
const testFolder = args[0];
const outFile = args[1];

console.log(args);

// Read only fortune files - they don't have extesion (.ext)
let files = fs.readdirSync(testFolder)
              .filter(e => !e.includes('.'));

// Prepare object to write to file
//console.log(files);
let fortunesObj = {}
let fillFortunesObj = function (files) {
  files.forEach(file => {
    let fileName = testFolder +'/' + file;
    console.log(fileName);
    let f = fs.readFileSync(fileName, 'utf8');
    fortunesObj[file] = fortuneToArr(f);
  });
};
let fortuneToArr = function (fortune) {
  return fortune.split('%')
                .map(e => e.replace(/\t+/g, " "))
                .map(e => e.replace('--', '-'));
}

fillFortunesObj(files);
let testOut = JSON.stringify(fortunesObj, '\t');
console.log(fortunesObj['science'][67]);

fs.writeFileSync(outFile, JSON.stringify(fortunesObj, '\t'), 'utf8', err => {
                                    if (err) throw err;
                                    console.log('Done.');
                                  });



//console.log(files)
}

fortunes2object();
