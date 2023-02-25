#!/usr/bin/env node
const moore = require('./index.js');

const printUsage = function(showIntro) {
    if (showIntro) {
        console.log(moore.create(3));
        console.log(' Print the Moore Curve to the console!');
    }
    console.log('\n' + 
                ' Usage:\n' + 
                '   $ moore-curve-cli <n>\n' + 
                '   $ moore-curve-cli <n> [options]\n' + 
                '\n' +
                '   <n> is the recursive step, a number greater than or equal to 1\n' + 
                '\n' +
                ' Options:\n' + 
                '   --closed, -c       Draw a closed Moore Curve\n' + 
                '   --line=<line>      Draw using a specific line type: [bold|double|standard]\n' + 
                '   --rotate=<rotate>  Rotate the Moore Curve: [left|right|flip|standard]\n');
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
        if (flags[i] && (flags[i].toLowerCase() === '-c' || flags[i].toLowerCase() === '--closed')) {
            return true;
        }
    }
    return false;
}

const getLine = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--line=')) {
            const line = flags[i].substring(7);
            if (line) {
                if (line.toLowerCase() === 'bold' || line.toLowerCase() === 'double' || line.toLowerCase() === 'standard') {
                    return line.toLowerCase();
                } else {
                    console.log('\n Warning: Please provide a supported line type: [bold|double|standard]');
                }
            } else {
                console.log('\n Warning: Please provide a supported line type: [bold|double|standard]');
            }
        }
    }
    return undefined;
}

const getRotation = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--rotate=')) {
            const line = flags[i].substring(9);
            if (line) {
                if (line.toLowerCase() === 'left' || line.toLowerCase() === 'right' || line.toLowerCase() === 'flip' || line.toLowerCase() === 'standard') {
                    return line.toLowerCase();
                } else {
                    console.log('\n Warning: Please provide a supported rotation type: [left|right|flip|standard]');
                }
            } else {
                console.log('\n Warning: Please provide a supported rotation type: [left|right|flip|standard]');
            }
        }
    }
    return undefined;
}

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    const values = getValues(params);
    const flags = getFlags(params);

    if (values[0] && !isNaN(values[0]) && parseInt(values[0]) >= 1) {
        var n = parseInt(values[0]);
        if (n !== undefined) {
            console.log(moore.create(n, { closed: closeCurve(flags), rotate: getRotation(flags), line: getLine(flags) }));
        }
    } else {
        console.log('\n <n> should be a number greater than or equal to 1');
        printUsage(false);
    }
} else {
    printUsage(true);
}