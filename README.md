# WYD? (What You Doing?)

## Overview

**WYD?** is a Chrome extension designed to help users reflect on their daily browsing habits by providing clear, insightful metrics about their productivity and online activity. The goal is to help users answer the simple yet important question: _What did I actually do today (...this week? this month?)?_

## Frontend technologies used:

- **Frontend:** React
- **Styling:** [shadcn](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/)
- **Async:** [Tanstack-Query](https://tanstack.com/query/latest)
- **Virualisation:** [react-window](https://www.npmjs.com/package/react-window)
- **Testing:** [Vitest](https://vitest.dev/) and [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing, and [Playwright](https://playwright.dev/) for integration / browser testing.

## Test coverage:

- _Test report coming soon..._

## Key features:

- Rendering 10,000+ row tables nearly instantly (using virtualisation)
- Routing using React-Router-DOM's MemoryRouter (as is a chrome extension without page linking)
- Full light/dark mode support (with exciting custom animation)
- _And more to come..._

## Planned features:

- Exciting animations using [motion.dev](https://motion.dev/)
- Ways to customise the requested history-time periods
- Many more exciting visualisations and insights

## Chrome API Reference

This extension leverages the [Chrome History API](https://developer.chrome.com/docs/extensions/reference/api/history) to access user browsing data.
