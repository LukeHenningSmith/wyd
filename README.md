# WYD? (What You Doing?)

## Overview

**WYD?** is a Chrome extension designed to help users reflect on their daily browsing habits by providing clear, insightful metrics about their productivity and online activity. The goal is to answer the simple yet important question: _What did I actually do today?_

## Features

### Core Features

- **Daily Productivity Score**
  - Calculates a score based on time spent on work-related versus distracting websites.
  - Users can classify websites as "work" or "not work" for personalized results.
- **Browsing Insights**
  - Top websites visited.
  - Most time spent per website (with session estimation).
  - Frequently re-visited websites — identify those instinctual "boredom clicks" like social media or shopping sites.
- **Quick Links**
  - Provides a list of most-frequented websites from the last 24 hours for quick access.

### Optional Features (Future Ideas)

- **Social Metrics Sharing**
  - Users can optionally share their productivity scores or browsing durations — no specific browsing data or PII is shared.
  - Allows users to compare their habits with others.
- **Data Export**
  - Export browsing data to CSV, Excel, or JSON for deeper analysis.
- **Shareable Reports**
  - Generate nicely formatted images of productivity stats (with a watermark) for sharing.

## Tech Stack

- **Frontend:** React (with virtualized lists and graphs to handle large datasets smoothly)
- **Backend:** Python (Django, with strict typing)
- **Database:** SQL-based for robust data storage
- **Data Manipulation:** Pandas for data processing (potentially)
- **Hosting:** AWS for both frontend and backend deployment
- **Testing:**
  - Jest/Playwright for frontend tests
  - Unit tests for backend logic

## Chrome API Reference

This extension leverages the [Chrome History API](https://developer.chrome.com/docs/extensions/reference/api/history) to access user browsing data.
