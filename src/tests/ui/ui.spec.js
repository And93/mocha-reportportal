'use strict';

const {describe, it, before, after} = require('mocha');
const {expect} = require('chai');
const puppeteer = require('puppeteer');
const {l} = require('../../helpers/timeouts');

const options = {
    headless: true,
    defaultViewport: {
        width: 1366,
        height: 768
    },
    timeout: l
};

let browser,
    page;

describe('UI', () => {
    before(async () => {
        browser = await puppeteer.launch(options);
        page = await browser.newPage();
    });

    after(async () => await browser.close());

    it('Test', async () => {
        await page.goto('https://pptr.dev/', {waitUntil: ['networkidle0', 'domcontentloaded']});
        await page.waitForSelector('content-box h1', {visible: true, hidden: false});
        const pageNameSelector = await page.$('content-box h1');
        const text = await page.evaluate(({innerText}) => innerText, pageNameSelector);
        expect(text).to.be.eql('Puppeteer');
    });
});
