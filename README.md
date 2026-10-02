<div align="center">

# 🏎️ Itzfizz — Scroll-Driven Hero Animation

A premium, scroll-controlled hero section with a staggered intro, animated impact metrics and a car that drives across the screen as you scroll.

[![Live Demo](https://img.shields.io/badge/Live-Demo-c6ff3d?style=for-the-badge&logo=githubpages&logoColor=black)](https://YOUR_USERNAME.github.io/itzfizz-scroll-hero/)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/itzfizz-scroll-hero/deploy.yml?style=for-the-badge&label=Pages%20Deploy)](https://github.com/YOUR_USERNAME/itzfizz-scroll-hero/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#-license)

</div>

---

## 🎬 Demo

> 📌 **Paste your demo video / GIF here.**
> On GitHub, drag & drop an `.mp4` into this README while editing (it uploads and generates a link), or use one of the options below.

<!-- OPTION 1: GitHub-hosted video (drag & drop mp4 here) -->
<!-- OPTION 2: YouTube thumbnail link
[![Watch the demo](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://youtu.be/VIDEO_ID)
-->
<!-- OPTION 3: GIF
![Demo](./docs/demo.gif)
-->

**🔗 Live:** https://YOUR_USERNAME.github.io/itzfizz-scroll-hero/

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
git clone https://github.com/YOUR_USERNAME/itzfizz-scroll-hero.git
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

## 🌐 Deploying to GitHub Pages

1. Create a repo named **`itzfizz-scroll-hero`** and push this code to `main`.
2. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and publishes automatically.
4. Your site will be live at `https://YOUR_USERNAME.github.io/itzfizz-scroll-hero/`.

> Different repo name? No change needed — the workflow reads the name and sets `NEXT_PUBLIC_BASE_PATH` for you.

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

**Your Name** — [GitHub](https://github.com/YOUR_USERNAME) · [LinkedIn](https://linkedin.com/in/YOUR_HANDLE)

Built as an assignment for the **Itzfizz Digital** Web Development Internship.

## 📄 License

MIT © Your Name
