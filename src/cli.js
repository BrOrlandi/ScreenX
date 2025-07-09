import { program } from 'commander';

export function parseCliArgs() {
  program
    .name('screenx')
    .description('CLI to open a URL in a browser and perform actions like taking screenshots, injecting JS, and simulating form interactions.')
    .argument('<url>', 'URL to open')
    .option('--screenshot <path>', 'Path to save the screenshot file')
    .option('--screenshot-on <start|confirm>', 'When to take the screenshot (default: start)')
    .option('--fullpage', 'Captures the entire page by automatically scrolling')
    .option('--scroll <px>', 'Scrolls the page by X pixels before any action', parseInt)
    .option('--resolution <WxH>', 'Sets the browser window resolution (e.g., 1280x720)', '1280x720')
    .option('--inject-js <script>', 'JS code as a string to be executed on the page')
    .option('--inject-js-file <path>', 'Path to a JS file to be injected')
    .option('--simulate-form <json>', 'JSON with instructions to fill form fields and perform actions')
    .option('--headless', 'Runs in headless mode')
    .option('--human', 'Waits for human interaction with a confirmation button')
    .option('--delay <ms>', 'Delay in milliseconds before actions', parseInt)
    .option('--timeout <ms>', 'Maximum execution time in ms', parseInt)
    .option('--output <json|text>', 'Output format (default: text)', 'text')
    .option('--verbose', 'Enables detailed logs')
    .parse();

  const options = program.opts();
  const url = program.args[0];

  return { options, url };
}