# Product Comparison UI (React + MUI)

An interactive, responsive interface to compare products side-by-side.

## Live Demo

Check out the live app here: **[https://compareproductapp.netlify.app/](https://compareproductapp.netlify.app/)**

## Tech
- React (Vite)
- Material UI (MUI)
- HTML5, CSS3 (via MUI system)
- Static data only (no backend)

## Features
- Product grid with image, brand, name, price, and 2–3 key features
- Select up to **3** products to compare
- Compare bar appears only when **2+** items are selected
- Side-by-side comparison table with **highlighted differences**
- Remove individual items or **clear all**
- **Search** (name/brand/feature) and **brand filter**
- **LocalStorage** persistence for selections and theme
- **Light/Dark** mode toggle
- **Keyboard accessible** selection flow (Enter/Space, aria labels)
- Fully **responsive** (mobile + desktop)

## Setup
```bash
npm create vite@latest product-compare -- --template react
cd product-compare
npm i @mui/material @emotion/react @emotion/styled @mui/icons-material
/src
├─ App.jsx
├─ main.jsx
├─ data/
│  └─ products.js
└─ components/
   ├─ CompareBar.jsx
   ├─ CompareTable.jsx
   ├─ ProductCard.jsx
   └─ SearchFilter.jsx

npm run dev
