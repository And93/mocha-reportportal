'use strict';

const Mocha = require('mocha'),
    {join, resolve} = require('path'),
    {hasMagic, sync} = require('glob'),
    yargs = require('yargs');

const {argv} = yargs
    .string('conf')
    .string('test')
    .string('suite')
    .default('suite', '')
    .default('conf', 'mocha.conf.js');

const cwd = process.cwd();
const {reporter, timeouts, suites} = require(join(cwd, argv.conf));

const mocha = new Mocha(reporter);

try {
    mocha.slow(timeouts.slow);
    mocha.timeout(timeouts.test);

    for (const fileName of suites) {
        const matches = hasMagic(fileName) ? sync(fileName, {cwd}) : [fileName];

        for (const match of matches) {
            if (argv.suite && !match.includes(argv.suite)) {
                break;
            }
            mocha.addFile(resolve(cwd, match));
        }
    }

    mocha.grep(argv.test);

    // exit with non-zero exit code, other wise fails will not fail mocha run
    mocha.run(failures => process.on('exit', () => process.exit(failures)));
} catch (err) {
    throw new Error(err);
}
