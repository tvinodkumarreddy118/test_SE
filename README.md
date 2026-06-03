# Playwright Test Suite

This repository contains a Playwright end-to-end test suite for the TensorFlow Playground web application.

## Overview

The current test scenario navigates to `https://playground.tensorflow.org/`, interacts with the neural network playground UI, and reports the test loss before and after applying a custom configuration.

## Project Structure

- `package.json` - project metadata and dev dependencies.
- `playwright.config.ts` - Playwright configuration for browser projects and reporting.
- `tests/` - test files.
  - `tests/se_assign.test.ts` - main test scenario.
- `Pages/` - page object model components.
  - `Pages/Playgroundpage.ts` - encapsulates page interactions for the playground.
- `playwright-report/` - generated HTML test report output.
- `test-results/` - generated test result artifacts.

## Prerequisites

- Node.js installed (recommend latest LTS).
- `npm` available in your environment.

## Install Dependencies

From the project root:

```bash
npm install
```

If Playwright browser binaries are not installed automatically, run:

```bash
npx playwright install
```

## Run Tests

Run the full test suite with:

```bash
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/se_assign.test.ts
```

## View HTML Test Report

After test execution, open the generated report:

```bash
npx playwright show-report
```

## Key Test Flow

The `se_assign.test.ts` scenario currently performs the following actions:

1. Opens the TensorFlow Playground page.
2. Logs the initial test loss.
3. Selects the `Exclusive or` dataset.
4. Sets noise to `5`.
5. Enables the `xSquared` and `ySquared` features.
6. Removes neurons from layer 1 and layer 2.
7. Sets the learning rate to `0.1`.
8. Starts simulation, waits for a short interval, then pauses it.
9. Logs the final test loss.

## Notes

- The repository uses TypeScript with Playwright and `@types/node` as dev dependencies.
- The test configuration is set up to run on Chromium, Firefox, and WebKit.
- The default reporter is HTML.

## Suggestions

If you want to simplify execution, add scripts to `package.json` such as:

```json
"scripts": {
  "test": "playwright test",
  "test:report": "playwright show-report"
}
```

This makes the commands easier to run with `npm test` and `npm run test:report`.
