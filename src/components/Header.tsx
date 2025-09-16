"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      try {
        const gsap = (await import("gsap")).gsap;
        if (!svgRef.current) return;
        const orbit = svgRef.current.querySelector("#header-orbit");
        if (orbit) {
          gsap.to(orbit, {
            strokeDashoffset: 62,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        const pulse = async () => {
          if (!svgRef.current) return;
          const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#06b6d4";
          await gsap.to(svgRef.current, { duration: 0.18, scale: 0.95, transformOrigin: "50% 50%", ease: "power2.out" });
          await gsap.to(svgRef.current, { duration: 0.45, scale: 1, filter: `drop-shadow(0 0 8px ${color})`, ease: "elastic.out(1,0.6)" });
          await gsap.to(svgRef.current, { duration: 0.6, filter: "none", ease: "power2.out" });
        };

        const onTheme = () => { void pulse(); };
        window.addEventListener("themechange", onTheme as EventListener);
        cleanup = () => window.removeEventListener("themechange", onTheme as EventListener);
      } catch {
        // gsap optional
      }
    })();
    return cleanup;
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="#home" className="font-semibold tracking-tight text-lg inline-flex items-center gap-2">
          {/* Animated SVG mark */}
          <span className="relative inline-flex h-6 w-6">
            <svg ref={svgRef} viewBox="0 0 24 24" className="h-6 w-6 text-accent">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="9" fill="none" stroke="url(#grad)" strokeWidth="2" className="opacity-80" />
              <circle id="header-orbit" cx="12" cy="12" r="9" fill="none" stroke="var(--color-accent-2)" strokeWidth="2" strokeDasharray="12 50" className="animate-spin [animation-duration:2.2s] [transform-origin:center]" />
            </svg>
          </span>
          <span className="text-foreground">Rishikesh Koli</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </a>
          ))}
        </nav>
        {/* Actions (desktop): theme + socials */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a href="https://github.com/Rishikoli" target="_blank" aria-label="GitHub" className="opacity-80 hover:opacity-100 transition-opacity hover:text-accent-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.13-1.52-1.13-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.21 2.47.11 2.73.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.81-4.57 5.07.36.32.69.95.69 1.92 0 1.38-.01 2.5-.01 2.83 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/rishikesh-koli-828248257" target="_blank" aria-label="LinkedIn" className="opacity-80 hover:opacity-100 transition-opacity hover:text-accent-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path fill="currentColor" d="M20.45 20.45h-3.55v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.52v6.22ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" />
            </svg>
          </a>
        </div>
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10">
          <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 grid gap-2 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 flex items-center gap-4">
              <ThemeToggle />
              <a href="https://github.com/Rishikoli" target="_blank" aria-label="GitHub" className="opacity-80 hover:opacity-100 transition-opacity hover:text-accent-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.13-1.52-1.13-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.56 1.42.21 2.47.11 2.73.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.81-4.57 5.07.36.32.69.95.69 1.92 0 1.38-.01 2.5-.01 2.83 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/rishikesh-koli-828248257" target="_blank" aria-label="LinkedIn" className="opacity-80 hover:opacity-100 transition-opacity hover:text-accent-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="currentColor" d="M20.45 20.45h-3.55v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.52v6.22ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
