import "./globals.css";

export const metadata = {
  title: "Itzfizz Digital | Welcome",
  description:
    "A scroll-driven hero section built with Next.js, Tailwind CSS and GSAP ScrollTrigger.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
