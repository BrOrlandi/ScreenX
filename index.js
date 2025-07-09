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
    console.error('Erro: URL é obrigatória');
    process.exit(1);
  }

  const { browser, page } = await launchBrowser(options);

  try {
    if (options.verbose) console.log(`Carregando URL: ${url}`);
    await goToPage(page, url);
    if (options.verbose) console.log('Página carregada com sucesso');

    await handleScroll(page, options);
    await handleDelay(page, options);
    await simulateForm(page, options);
    await injectJs(page, options);
    await waitForHuman(page, options);
    await takeScreenshot(page, options);

  } catch (error) {
    console.error(`Ocorreu um erro durante a execução: ${error.message}`);
    process.exit(1);
  } finally {
    if (options.verbose) console.log('Fechando o navegador.');
    await closeBrowser(browser);
  }
}

main();
