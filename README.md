# VivahaSetu

A responsive wedding vendor discovery and planning frontend, built with React, TypeScript, Vite, React Router, and Lucide icons.

## Features

- Responsive pink-themed navigation and mobile menu
- Vendor directory with search, filters, sorting, saved vendors, and image carousels
- Persistent wedding checklist and dynamic budget calculator
- Demo authentication UI
- Standalone, directly-openable HTML build

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production site is generated in `dist/`. The standalone export is included as `VivahaSetu.html` and can be opened directly in a browser.

## Demo storage

Planner, authentication, and saved-vendor state are stored only in the browser's `localStorage`. Authentication is a frontend demonstration and does not connect to an OAuth provider.
