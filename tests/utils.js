import puppeteer from 'puppeteer';

export const createBrowser = () =>
  puppeteer.launch({
    headless: !process.env.HEADFULL,
    dumpio: true,
    pipe: true,
    args: [
      '--enable-logging',
      '--lang=en-US,en',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });
