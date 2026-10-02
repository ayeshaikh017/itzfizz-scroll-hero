"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Car from "./Car";

const STATS = [
  { value: 150, suffix: "%", label: "Average traffic growth" },
  { value: 98, suffix: "%", label: "Client retention rate" },
  { value: 85, suffix: "%", label: "Faster page load times" },
  { value: 72, suffix: "%", label: "Lift in conversions" },
];

const WORDS = ["WELCOME", "ITZFIZZ"];

export default function Hero() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(root);

    // Show final numbers immediately for reduced-motion users and skip animation.
    if (reduceMotion) {
      q(".stat-value").forEach((el) => {
        el.textContent = `${el.dataset.value}${el.dataset.suffix}`;
      });
      return;
    }

    /* ---------- Smooth scrolling (Lenis) wired into GSAP's ticker ---------- */
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* ------------------------- 1. Intro animation ------------------------ */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .set(q(".reveal"), { opacity: 0 })
        .fromTo(
          q(".eyebrow"),
          { y: 20 },
          { y: 0, opacity: 1, duration: 0.8 }
        )
        .fromTo(
          q(".letter"),
          { y: 70, opacity: 0, rotateX: -60 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.055 },
          "-=0.4"
        )
        .fromTo(
          q(".car-intro"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3 },
          "-=0.8"
        )
        .fromTo(
          q(".stat"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.2 },
          "-=0.9"
        );

      // Count each metric up, offset to match its card's reveal.
      q(".stat-value").forEach((el, i) => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: Number(el.dataset.value),
          duration: 1.8,
          delay: 1.6 + i * 0.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${el.dataset.suffix}`;
          },
        });
      });

      /* --------------- 2. Scroll-driven animation (core feature) ----------- */
      // One scrubbed timeline: everything below is tied to scroll progress,
      // never to time. `scrub: 1.2` adds ~1.2s of smoothing/inertia.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: q(".hero")[0],
          start: "top top",
          end: "+=260%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Car drives from left to beyond the right edge.
      tl.fromTo(
        q(".car-travel"),
        { x: () => window.innerWidth * 0.05 },
        { x: () => window.innerWidth + 120 },
        0
      )
        // Wheels spin in sync with distance travelled.
        .to(q(".wheel"), { rotation: 1800 }, 0)
        // Road markings slide the opposite way → sense of speed.
        .fromTo(q(".road-dashes"), { xPercent: 0 }, { xPercent: -50 }, 0)
        // Background parallax layers.
        .to(q(".bg-far"), { xPercent: -8, scale: 1.12 }, 0)
        .to(q(".glow"), { xPercent: 60, opacity: 0.9 }, 0)
        // Headline drifts up, spreads and fades as the car passes below it.
        .to(q(".headline"), { y: -90, scale: 1.08, opacity: 0.12 }, 0)
        .to(q(".letter"), { y: (i) => (i % 2 ? -14 : 14), stagger: 0.01 }, 0)
        // Stats lift away slightly, lagging behind the headline.
        .to(q(".stats"), { y: -60, opacity: 0.2 }, 0.1)
        // Car body subtly tilts forward then settles (feels like acceleration).
        .fromTo(q(".car-body"), { rotate: 0 }, { rotate: -1.5, yoyo: true, repeat: 1 }, 0)
        // Progress bar.
        .fromTo(q(".progress"), { scaleX: 0 }, { scaleX: 1 }, 0);
    }, root);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={root}
      className="hero relative h-screen min-h-[640px] w-full overflow-hidden bg-fizz-dark"
    >
      {/* scroll progress */}
      <div className="progress absolute left-0 top-0 z-30 h-[3px] w-full origin-left scale-x-0 bg-fizz" />

      {/* background */}
      <div
        className="bg-far absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />
      <div className="glow absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-fizz/20 opacity-40 blur-[120px]" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col items-center px-5 pt-[14vh] text-center">
        <p className="eyebrow reveal mb-6 text-[10px] uppercase tracking-[0.6em] text-fizz md:text-xs">
          Itzfizz Digital
        </p>

        <h1
          className="headline flex flex-wrap justify-center gap-x-[1.6em] gap-y-2 text-[clamp(1.3rem,4.4vw,4rem)] font-bold leading-none"
          style={{ perspective: 800 }}
          aria-label="Welcome Itzfizz"
        >
          {WORDS.map((word, w) => (
            <span key={word} className="flex" aria-hidden="true">
              {word.split("").map((ch, i) => (
                <span
                  key={i}
                  className={`letter reveal inline-block px-[0.14em] ${w === 1 ? "text-fizz" : ""}`}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="stats mt-[7vh] grid w-full max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="stat reveal border-t border-white/15 pt-4 text-left">
              <div
                className="stat-value text-4xl font-bold tabular-nums md:text-6xl"
                data-value={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <p className="mt-2 text-xs text-white/55 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* road + car */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-[13vh] bg-gradient-to-t from-[#050608] to-[#12141b]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute top-1/2 h-[3px] w-[200%] -translate-y-1/2 overflow-hidden">
          <div
            className="road-dashes h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,.45) 0 48px, transparent 48px 120px)",
            }}
          />
        </div>
      </div>

      <div className="car-travel absolute bottom-[calc(13vh-6px)] left-0 z-20 w-[min(78vw,620px)] will-change-transform">
        <div className="car-intro reveal">
          <div className="car-body origin-bottom">
            <Car />
          </div>
        </div>
      </div>
    </section>
  );
}
