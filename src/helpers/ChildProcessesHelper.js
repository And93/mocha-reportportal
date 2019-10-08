'use strict';
const {exec} = require('child_process'),
    {m} = require('./timeouts');

const config = {
    cwd: process.cwd(),
    timeout: m,
    encoding: 'ascii'
};

const execCmd = cmd => {
    return new Promise((resolve, reject) => {
        return exec(cmd, config, (err, stdout, stderr) => {

            if (Buffer.isBuffer(stderr)) {
                stderr = Buffer.from(stderr).toString();
            } else if (Buffer.isBuffer(stdout)) {
                stdout = Buffer.from(stdout).toString();
            }

            return err ? reject({stdout, stderr, err}) : resolve(stdout || stderr);
        });
    });
};

module.exports = {execCmd};
