'use strict';
const {xl, m} = require('./src/helpers/timeouts');

module.exports = {
    suites: [
        './src/tests/**/*.js'
    ],
    timeouts: {
        test: xl,
        slow: m
    },
    reporter: {
        reporter: 'mocha-rp-reporter',
        configFile: '../reportportal.conf.json'
    }
};
