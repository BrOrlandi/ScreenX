import fs from 'fs';
import path from 'path';

export async function goToPage(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2' });
}

export async function handleScroll(page, options) {
  if (options.scroll) {
    await page.evaluate(px => window.scrollBy(0, px), options.scroll);
    if (options.verbose) console.log(`Scrolled by ${options.scroll}px`);
  }
}

export async function handleDelay(page, options) {
  if (options.delay) {
    await new Promise(r => setTimeout(r, options.delay));
  }
}

export async function simulateForm(page, options) {
  if (options.simulateForm) {
    const actions = JSON.parse(options.simulateForm);
    for (const action of actions) {
      const actionType = action.action || 'type';

      switch (actionType) {
        case 'type':
          await page.type(action.selector, action.value);
          if (options.verbose) console.log(`Filled '${action.selector}' with '${action.value}'`);
          break;

        case 'press':
          await page.keyboard.press(action.key);
          if (options.verbose) console.log(`Pressed key '${action.key}'`);
          // Use a fixed delay to wait for navigation, as waitForNavigation can be flaky with CAPTCHAs.
          if (options.verbose) console.log('Waiting 5 seconds for page to load...');
          await new Promise(r => setTimeout(r, 5000));
          break;

        default:
          if (options.verbose) console.warn(`Unknown action in --simulate-form: ${actionType}`);
      }
    }
  }
}

export async function injectJs(page, options) {
  let result;
  if (options.injectJsFile) {
    const scriptContent = fs.readFileSync(path.resolve(options.injectJsFile), 'utf8');
    result = await page.evaluate(scriptContent);
  } else if (options.injectJs) {
    result = await page.evaluate(options.injectJs);
  }

  if (result !== undefined) {
    if (options.output === 'json') {
      console.log(JSON.stringify(result));
    } else {
      console.log(result);
    }
  }
}

export async function waitForHuman(page, options) {
  if (options.human) {
    if (options.verbose) console.log('Waiting for human interaction...');
    
    let attempts = 0;
    const maxAttempts = 15; // Try for 15 seconds
    let injectedAndClicked = false;

    while (attempts < maxAttempts && !injectedAndClicked) {
      try {
        // This entire block will either succeed or throw an error.
        await page.evaluate(() => {
          return new Promise(resolve => {
            if (document.getElementById('__screenx_confirm__')) {
              // If button exists, just wait for it to be clicked.
            } else {
              // If not, create it.
              const btn = document.createElement('button');
              btn.innerText = 'Click to continue';
              btn.style.position = 'fixed';
              btn.style.bottom = '20px';
              btn.style.right = '20px';
              btn.style.zIndex = '99999';
              btn.style.padding = '10px 20px';
              btn.style.background = '#ff6600';
              btn.style.color = '#fff';
              btn.style.border = 'none';
              btn.style.borderRadius = '8px';
              btn.style.cursor = 'pointer';
              btn.id = '__screenx_confirm__';
              document.body.appendChild(btn);
            }
            
            document.getElementById('__screenx_confirm__').addEventListener('click', () => {
              document.getElementById('__screenx_confirm__').remove();
              resolve(true);
            }, { once: true });
          });
        });
        injectedAndClicked = true; // If the promise resolves, the button was clicked.

      } catch (error) {
        if (error.message.includes('Execution context was destroyed') || error.message.includes('Target closed')) {
          attempts++;
          if (options.verbose) console.log(`Page unstable, retrying in 1s... (${attempts}/${maxAttempts})`);
          await new Promise(r => setTimeout(r, 1000));
        } else {
          throw error; // Re-throw other unexpected errors
        }
      }
    }

    if (!injectedAndClicked) {
      console.error('Could not confirm human interaction after several attempts.');
    }
  }
}

export async function takeScreenshot(page, options) {
  if (options.screenshot) {
    await page.screenshot({ path: options.screenshot, fullPage: !!options.fullpage });
    if (options.verbose) console.log(`Screenshot saved to ${options.screenshot}`);
    if (options.output === 'text') console.log(options.screenshot);
  }
}