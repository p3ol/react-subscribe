import puppeteer from 'puppeteer';

export const createBrowser = () =>
  puppeteer.launch({
    headless: process.env.HEADFULL ? false : 'new',
    dumpio: !!process.env.DUMPIO,
    slowMo: 100,
    pipe: true,
    args: [
      '--enable-logging',
      '--lang=en',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--single-process',
    ],
  });
