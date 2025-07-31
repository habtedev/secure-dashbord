# Secure Dashboard Authentication Frontend

This project is a modern, business-ready authentication dashboard built with React, Vite, and Tailwind CSS. It features professional UI/UX, accessibility, and real-world authentication flows for users and admins.

## Features

- **Login, Register, and Reset Password pages**
- Social login (Google, Facebook)
- Responsive, accessible, and business-like design
- Password reset with resend limit and cooldown timer
- SPA navigation using React Router
- Consistent, modern card layout and form styling

## Folder Structure

```
client/
  src/
    pages/
      Login.jsx
      Register.jsx
      ResetPassword.jsx
    components/
      SocialLogin.jsx
    App.tsx
    index.css
  public/
  package.json
  tailwind.config.js
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Routing

- `/login` — Login page
- `/register` — Register page
- `/reset-password` — Password reset page

## Customization

- Update social login SVGs in `SocialLogin.jsx` for your branding.
- Adjust Tailwind classes for your color scheme and style.
- Integrate with your backend for authentication and password reset APIs.

## License

MIT

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
