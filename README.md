<div align="center">

# 🏎️ Itzfizz — Scroll-Driven Hero Animation

A premium, scroll-controlled hero section with a staggered intro, animated impact metrics and a car that drives across the screen as you scroll.

[![Live Demo](https://img.shields.io/badge/Live-Demo-c6ff3d?style=for-the-badge&logo=githubpages&logoColor=black)](https://ayeshaikh017.github.io/itzfizz-scroll-hero/)
[![Render](https://img.shields.io/badge/Render-Mirror-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://itzfizz-scroll-hero.onrender.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/ayeshaikh017/itzfizz-scroll-hero/deploy.yml?style=for-the-badge&label=Pages%20Deploy)](https://github.com/ayeshaikh017/itzfizz-scroll-hero/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#-license)

</div>

---

## 🎬 Demo

https://github.com/user-attachments/assets/d8f0268e-7c5c-41fb-9ae7-7bb5459c0e7f

**🔗 Live:** https://ayeshaikh017.github.io/itzfizz-scroll-hero/ · [Render mirror](https://itzfizz-scroll-hero.onrender.com)

---

## ✨ Features

| Area | What it does |
| --- | --- |
| **Hero layout** | Full-viewport (above the fold) hero with a letter-spaced `W E L C O M E  I T Z F I Z Z` headline and four impact metrics. |
| **Intro animation** | Headline letters reveal with a staggered 3D rise; the car fades in; stat cards slide in one-by-one while the numbers count up. |
| **Scroll-driven motion** | A single pinned GSAP timeline is **scrubbed by scroll progress** — no autoplay. Scroll down and the car drives right; scroll up and it reverses. |
| **Natural easing** | `scrub: 1.2` + Lenis smooth scrolling give the motion inertia and a fluid, premium feel. |
| **Speed illusion** | Wheels spin in sync with distance, road dashes slide the opposite way, background layers parallax. |
| **Accessibility** | Honors `prefers-reduced-motion`; headline has an `aria-label`; the SVG car has a descriptive `role="img"`. |
| **Responsive** | Fluid type with `clamp()`, 2-column stats on mobile, 4-column on desktop. |
| **Zero assets** | The car is an inline SVG — nothing external to break or slow the page. |

## 🧠 How the animation works

```
Page load ──► intro timeline (time-based, runs once)
                eyebrow → letters (stagger) → car → stats (stagger) → count-up

Scroll    ──► ONE ScrollTrigger timeline (pinned, scrub: 1.2)
                progress 0 → 1 drives:
                  • car x            (translateX)
                  • wheel rotation   (rotate)
                  • road dashes      (translateX, opposite direction)
                  • bg parallax      (translate + scale)
                  • headline / stats (translateY, scale, opacity)
                  • progress bar     (scaleX)
```

### Performance choices

- Only **`transform` and `opacity`** are animated → GPU-composited, no layout/paint thrash.
- **No custom scroll listeners** doing math: GSAP ScrollTrigger computes progress once per frame.
- Lenis is driven by **GSAP's ticker** (`gsap.ticker.add`) so there is a single RAF loop.
- Position values use **function-based values + `invalidateOnRefresh`**, so resizing recalculates safely.
- `will-change` is applied only to animated layers.
- `gsap.context()` is used so every tween/ScrollTrigger is **cleaned up** on unmount (React Strict Mode safe).

## 🧰 Tech Stack

- **HTML / CSS / JavaScript** (JSX)
- **Next.js 14** (App Router, static export)
- **React 18**
- **Tailwind CSS 3**
- **GSAP 3 + ScrollTrigger**
- **Lenis** (smooth scrolling)

## 📁 Project Structure

```
itzfizz-scroll-hero/
├── app/
│   ├── globals.css        # Tailwind layers + small global helpers
│   ├── icon.svg           # Favicon
│   ├── layout.jsx         # Root layout & metadata
│   └── page.jsx           # Hero + follow-up section
├── components/
│   ├── Hero.jsx           # All animation logic (intro + scroll timeline)
│   └── Car.jsx            # Inline SVG car
├── public/.nojekyll
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── next.config.mjs        # Static export + basePath
├── tailwind.config.js
└── package.json
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18.17+ and npm.

```bash
# 1. Clone
git clone https://github.com/ayeshaikh017/itzfizz-scroll-hero.git
cd itzfizz-scroll-hero

# 2. Install
npm install

# 3. Run the dev server → http://localhost:3000
npm run dev
```

### Production build (static export)

```bash
npm run build      # outputs to ./out
npm start          # serves ./out at http://localhost:3000
```

## 🌐 Deployment

### GitHub Pages (primary)

1. Push this code to the `main` branch.
2. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically on every push.
4. Live at **https://ayeshaikh017.github.io/itzfizz-scroll-hero/**

> The workflow reads the repo name and sets `NEXT_PUBLIC_BASE_PATH` automatically, so no config changes are needed.

### Render (mirror)

| Setting | Value |
| --- | --- |
| Build Command | `npm install && npm run build` |
| Publish Directory | `out` |

Live at **https://itzfizz-scroll-hero.onrender.com**

## 🎛️ Customising

- **Stats / copy:** edit the `STATS` and `WORDS` arrays at the top of `components/Hero.jsx`.
- **Scroll length:** change `end: "+=260%"` in the ScrollTrigger config.
- **Smoothness:** tweak `scrub` (higher = more inertia) and Lenis `lerp`.
- **Brand colour:** change `fizz` in `tailwind.config.js` and the gradient stops in `Car.jsx`.

## 🗺️ Possible Next Steps

- Swap the SVG for a PNG/WebP car and parallax it in multiple layers
- WordPress theme version using the same GSAP timeline
- Add Bootstrap-based layout sections below the hero

## 👤 Author

**Ayesha Shaikh** — [GitHub](https://github.com/ayeshaikh017) · [LinkedIn](https://www.linkedin.com/in/ayeshaikh0017/)

Built as an assignment for the **Itzfizz Digital** Web Development Internship.

## 📄 License

MIT © Ayesha Shaikh