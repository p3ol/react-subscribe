import devServer from 'jest-dev-server';

import { createBrowser } from '../tests/utils';

describe('E2E > Subscribe', () => {
  jest.setTimeout(30000);
  let server, browser;

  beforeAll(async () => {
    process.env.TEST_PORT = 63003;
    server = await devServer.setup({
      command: 'npm run serve',
      host: 'localhost',
      port: 63003,
      launchTimeout: 10000,
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
    await devServer.teardown(server);
    await browser.close();
  });
});
