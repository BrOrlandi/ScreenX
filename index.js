#!/usr/bin/env node

import { parseCliArgs } from './src/cli.js';
import { launchBrowser, closeBrowser } from './src/browser.js';
import {
  goToPage,
  handleScroll,
  handleDelay,
  simulateForm,
  injectJs,
  waitForHuman,
  takeScreenshot
} from './src/actions.js';

async function main() {
  const { options, url } = parseCliArgs();

  if (!url) {
    console.error('Error: URL is required');
    process.exit(1);
  }

  const { browser, page } = await launchBrowser(options);

  try {
    if (options.verbose) console.log(`Loading URL: ${url}`);
    await goToPage(page, url);
    if (options.verbose) console.log('Page loaded successfully');

    await handleScroll(page, options);
    await handleDelay(page, options);
    await simulateForm(page, options);
    await injectJs(page, options);
    await waitForHuman(page, options);
    await takeScreenshot(page, options);

  } catch (error) {
    console.error(`An error occurred during execution: ${error.message}`);
    process.exit(1);
  } finally {
    if (options.verbose) console.log('Closing the browser.');
    await closeBrowser(browser);
  }
}

main();