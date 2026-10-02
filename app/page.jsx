import Hero from "../components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="relative z-10 flex min-h-screen items-center justify-center bg-fizz-dark px-6 py-24">
        <div className="max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-fizz">Next up</p>
          <h2 className="text-3xl font-bold md:text-5xl">
            Motion that feels <span className="text-fizz">effortless</span>.
          </h2>
          <p className="mt-6 text-white/60">
            The hero above is pinned and driven entirely by scroll progress — scrub back up
            and the car reverses. Built with GSAP ScrollTrigger, Lenis smooth scrolling and
            GPU-friendly transforms only.
          </p>
        </div>
      </section>
    </main>
  );
}
