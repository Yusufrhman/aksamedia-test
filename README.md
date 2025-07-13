# React + TypeScript + Vite

This project provides a minimal setup using **React**, **TypeScript**, and **Vite**, including **Hot Module Replacement (HMR)** and integrated **ESLint rules** for code quality.

Currently, two official Vite plugins for React are supported:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) — uses **Babel** for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) — uses **SWC** for Fast Refresh

---

## ✨ First Login

You can log in with predefined account below:

| Username       | Password |
| -------------- | -------- |
| `myusufrahman` | `aaaaaa` |

---

## 🚀 Running the Project

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Yusufrhman/your-repo-name.git
cd your-repo-name
```

> Replace `your-repo-name` with your actual project name.

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start the Development Server

```bash
npm run dev
```

This will launch the app on:

[http://localhost:5173](http://localhost:5173)

---

## 🧹 Linting Setup

The ESLint configuration supports TypeScript-aware rules. For production-level apps, we recommend extending your ESLint with stricter configurations.

To enable type-aware linting:

```ts
// eslint.config.js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
