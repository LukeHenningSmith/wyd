# WYD? (What You Doing?)

## Overview

**WYD?** is a Chrome extension designed to help users reflect on their daily browsing habits by providing clear, insightful metrics about their online activity. The goal is to help users answer the simple yet important question: _What did I actually do today (...this week? this month?)?_

## Demo:

- Coming soon...

## Frontend technologies used:

- **Frontend:** React
- **Styling:** [shadcn](https://ui.shadcn.com/) and [TailwindCSS](https://tailwindcss.com/)
- **Async:** [Tanstack-Query](https://tanstack.com/query/latest)
- **Virualisation:** [react-window](https://www.npmjs.com/package/react-window)
- **Testing:** [Vitest](https://vitest.dev/) and [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) for unit testing

## Key features:

- Rendering 10,000+ row tables nearly instantly (using virtualisation)
- Routing using React-Router-DOM's MemoryRouter (as is a chrome extension without page linking)
- Full light/dark mode support (with exciting custom animation)
- Test suite using Vitest to prevent regressions.

## Planned features:

- Async / Caching using Tanstack-query
- Exciting animations using [motion.dev](https://motion.dev/)

## Test coverage:

- _Test report coming soon..._

## Chrome API Reference

This extension leverages the [Chrome History API](https://developer.chrome.com/docs/extensions/reference/api/history) to access user browsing data.
