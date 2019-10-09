'use strict';

const {describe, it} = require('mocha');
const {expect} = require('chai');
const {execCmd} = require('../../helpers/childProcessesHelper');

describe('API', () => {
    it('Test', async () => {
        const text = await execCmd('echo "Hi M&U team!"');

        console.log(text); // "Hi M&U team!"
        expect(text).to.be.contains('Hi M&U team!');
    });
});
