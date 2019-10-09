'use strict';
const {exec, execFile} = require('child_process'),
    {m} = require('./timeouts');

const options = {
    cwd: process.cwd(),
    timeout: m,
    encoding: 'ascii'
};

const callback = (err, stdout, stderr, reject, resolve) => {
    if (Buffer.isBuffer(stderr)) {
        stderr = Buffer.from(stderr).toString();
    } else if (Buffer.isBuffer(stdout)) {
        stdout = Buffer.from(stdout).toString();
    }

    return err ? reject({stdout, stderr, err}) : resolve(stdout || stderr)
};

const execCmd = cmd => {
    return new Promise((resolve, reject) => {
        return exec(cmd, options, (err, stdout, stderr) => callback(err, stdout, stderr, reject, resolve));
    });
};

const execFileCmd = (file, args) => {
    return new Promise((resolve, reject) => {
        return execFile(file, args, options, (err, stdout, stderr) => callback(err, stdout, stderr, reject, resolve))
    });
};

module.exports = {
    execCmd,
    execFileCmd
};
