'use strict';

const Mocha = require('mocha'),
    {readdirSync} = require('fs'),
    {join} = require('path'),
    yargs = require('yargs'),
    {xl, m} = require('./helpers/timeouts');

const testDir = './src/tests/';

const {argv} = yargs
    .string('test');

const mocha = new Mocha({
    reporter: 'mocha-rp-reporter',
    configFile: '../reportportal.conf.json'
});

try {
    mocha.slow(m);
    mocha.timeout(xl);

    readdirSync(testDir)
        .filter(test => test.includes('.js'))
        .forEach(test => mocha.addFile(join(testDir, test)));

    mocha.grep(argv.test);

    // exit with non-zero exit code, other wise fails will not fail mocha run
    mocha.run(failures => process.on('exit', () => process.exit(failures)));
} catch (err) {
    throw new Error(err);
}
