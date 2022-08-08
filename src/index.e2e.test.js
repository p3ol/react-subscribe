import devServer from 'jest-dev-server';

import { createBrowser } from '../tests/utils';

describe('E2E > Subscribe', () => {
  jest.setTimeout(30000);
  let browser;

  beforeAll(async () => {
    process.env.TEST_PORT = 63003;
    await devServer.setup({
      command: 'yarn serve',
      port: 63003,
      launchTimeout: 30000,
    });

    browser = await createBrowser();
  });

  describe('SigninButton', () => {
    let page;

    beforeAll(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:63003');
    });

    it('should display a signin button', async () => {
      await page.waitForSelector('iframe.p3-outlet');
      const src = await page.evaluate(() =>
        document.querySelector('iframe.p3-outlet').src
      );

      expect(src).toMatch(/https:\/\/(.+)\/auth-element\.html/g);
    });

    afterAll(async () => {
      await page.close();
    });
  });

  afterAll(async () => {
    await devServer.teardown();
    await browser.close();
  });
});
