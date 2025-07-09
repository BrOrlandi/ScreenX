# ScreenX

ScreenX is a command-line interface (CLI) tool built with Node.js and Puppeteer that allows you to automate interactions with web pages. You can open URLs, take screenshots, inject scripts, fill out forms, and much more. It's a versatile tool for both human-driven and AI-driven automation tasks.

## Installation

To use ScreenX, you need to have Node.js installed. Then, simply clone the repository and install the dependencies.

```bash
# Clone the repository (replace with the correct URL when available)
git clone https://github.com/BrOrlandi/ScreenX.git

# Navigate to the project directory
cd ScreenX

# Install dependencies
npm install
```

## Usage

The base command is simple. You can run it directly with `node index.js` or, after a global installation (`npm install -g .`), just with `screenx`.

```bash
node index.js [options] <url>
```

### Usage Examples

**1. Simple Screenshot**

Takes a screenshot of a page and saves it to a file.

```bash
node index.js --screenshot google.png https://google.com
```

**2. Form Simulation (Google Search)**

Fills a search term on Google, presses Enter, and takes a screenshot of the results page.

```bash
node index.js --screenshot results.png --simulate-form '[{"action":"type", "selector":"textarea[name=q]", "value":"Artificial Intelligence"}, {"action":"press", "key":"Enter"}]' https://www.google.com
```

**3. Human Interaction (CAPTCHA Solving)**

If you encounter a CAPTCHA, use the `--human` mode. The script will pause and display a "Click to continue" button on the page, giving you time to solve the challenge before proceeding.

```bash
node index.js --screenshot human-results.png --simulate-form '[{"action":"type", "selector":"textarea[name=q]", "value":"Artificial Intelligence"}, {"action":"press", "key":"Enter"}]' --human https://www.google.com
```

## Available Parameters

| Parameter                 | Description                                                                  |
| ------------------------- | ---------------------------------------------------------------------------- |
| `<url>`                   | **Required.** URL to open (including `localhost`).                           |
| `--screenshot <path>`     | Path where the screenshot will be saved.                                     |
| `--fullpage`              | Captures the entire page by automatically scrolling.                         |
| `--scroll <px>`           | Scrolls the page by X pixels before any other action.                        |
| `--resolution <WxH>`      | Sets the browser window resolution (default: `1280x720`).                    |
| `--inject-js <script>`    | JavaScript code (as a string) to be executed on the page.                    |
| `--inject-js-file <path>` | Path to a `.js` file with code to be injected.                               |
| `--simulate-form <json>`  | Fills fields and performs actions based on a JSON array.                     |
| `--headless`              | Runs the browser in "headless" mode, without a graphical window.             |
| `--human`                 | Waits for the user to click a floating button before continuing.             |
| `--delay <ms>`            | Waits for a specified time (in milliseconds) before proceeding with actions. |
| `--timeout <ms>`          | Sets the maximum execution time (in ms) for page loading.                    |
| `--output <json\|text>`   | Sets the output format (default: `text`).                                    |
| `--verbose`               | Displays detailed logs for each execution step.                              |
| `-h, --help`              | Shows CLI help.                                                              |
| `-v, --version`           | Displays the ScreenX version.                                                |
