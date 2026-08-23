# Nikita Likhar — Portfolio

Personal portfolio site for **Nikita Likhar**, Ruby on Rails developer. Built with Vite + TypeScript. Design is original (warm paper + blueprint grid + sketch-frame portrait + API-themed contact)—not copied from reference portfolios.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Output is in `dist/`. Deploy that folder to [GitHub Pages](https://pages.github.com/), [Vercel](https://vercel.com/), or [Netlify](https://www.netlify.com/).

### GitHub Pages

1. Set `base` in `vite.config.ts` if using a project repo (e.g. `base: '/Nikita_Likhar_Portfolio/'`).
2. Build and push `dist/`, or use a GitHub Action to deploy on push.

## Customize

- **Photo:** Replace `public/profile.png`.
- **Copy:** Edit sections in `index.html`.
- **Colors/fonts:** CSS variables at the top of `src/style.css`.

## Contact form

The form opens the visitor’s email client with a pre-filled message to `likharnikita2@gmail.com`. For server-side delivery, wire the form to Formspree, Netlify Forms, or your own API.
