# ScreenX

<div align="center">
<img src="logo.png" alt="ScreenX Logo" width="350"/>
<p></p>
</div>

[![npm version](https://img.shields.io/npm/v/screenx.svg)](https://www.npmjs.com/package/screenx)

ScreenX is a command-line interface (CLI) tool built with Node.js and Puppeteer that allows you to automate interactions with web pages. You can open URLs, take screenshots, inject scripts, fill out forms, and much more. It's a versatile tool for both human-driven and AI-driven automation tasks.

## Installation

To use ScreenX, you need to have Node.js installed. Install the package globally via npm:

```bash
npm install -g screenx
```

## Usage

After global installation, you can run the `screenx` command directly from your terminal.

```bash
screenx [options] <url>
```

### Usage Examples

**1. Simple Screenshot**

Takes a screenshot of a page and saves it to a file.

```bash
screenx --screenshot google.png https://google.com
```

**2. Form Simulation (Google Search)**

Fills a search term on Google, presses Enter, and takes a screenshot of the results page.

```bash
screenx --screenshot results.png --simulate-form '[{"action":"type", "selector":"textarea[name=q]", "value":"Artificial Intelligence"}, {"action":"press", "key":"Enter"}]' https://www.google.com
```

**3. Human Interaction (CAPTCHA Solving)**

If you encounter a CAPTCHA, use the `--human` mode. The script will pause and display a "Click to continue" button on the page, giving you time to solve the challenge before proceeding.

```bash
screenx --screenshot human-results.png --simulate-form '[{"action":"type", "selector":"textarea[name=q]", "value":"Artificial Intelligence"}, {"action":"press", "key":"Enter"}]' --human https://www.google.com
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
