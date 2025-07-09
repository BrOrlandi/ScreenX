import puppeteer from 'puppeteer';

export async function launchBrowser(options) {
  const [width, height] = options.resolution.split('x').map(Number);

  const browser = await puppeteer.launch({ 
    headless: options.headless ?? false 
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });

  if (options.timeout) {
    page.setDefaultNavigationTimeout(options.timeout);
    page.setDefaultTimeout(options.timeout);
  }

  return { browser, page };
}

export async function closeBrowser(browser) {
  await browser.close();
}
