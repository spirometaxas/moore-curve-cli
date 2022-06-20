#!/usr/bin/env node
const moore = require('./index.js');

const printUsage = function() {
    console.log('\nUsage:\n' + '  $ moore-curve-cli <n>\n\nFlags:\n -c: Draw the curve completely closed\n');
}

const getFlags = function(params) {
    let flags = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (params[i].startsWith('-')) {
                flags.push(params[i]);
            }
        }
    }
    return flags;
}

const getValues = function(params) {
    let values = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (!params[i].startsWith('-')) {
                values.push(params[i]);
            }
        }
    }
    return values;
}

const closeCurve = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase() === '-c') {
            return true;
        }
    }
    return false;
}

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    const values = getValues(params);
    const flags = getFlags(params);

    if (values[0] && !isNaN(values[0]) && parseInt(values[0]) >= 1) {
        var n = parseInt(values[0]);
        if (n !== undefined) {
            console.log(moore.create(n, closeCurve(flags)));
        }
    } else {
        console.log('\n<n> should be a number greater than or equal to 1');
        printUsage();
    }
} else {
    printUsage();
}