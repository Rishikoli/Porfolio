"use client";

import { useEffect, useRef, useState } from "react";

// Allowed values
export type ThemeMode = "system" | "light" | "dark";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") {
    root.setAttribute("data-theme", "dark");
  } else if (mode === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    // system: remove explicit override
    root.removeAttribute("data-theme");
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [open, setOpen] = useState(false);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const tlRef = useRef<any>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as ThemeMode | null) ?? "system";
    setMode(saved);
    applyTheme(saved);
  }, []);

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem("theme", mode);
    // Notify others
    window.dispatchEvent(new CustomEvent("themechange", { detail: { mode } }));
    // Animate on mode change
    (async () => {
      try {
        const gsap = (await import("gsap")).gsap;
        if (!iconRef.current) return;
        if (tlRef.current) tlRef.current.kill();
        const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#06b6d4";
        const sun = iconRef.current.querySelector("#sunPath");
        const moon = iconRef.current.querySelector("#moonPath");
        tlRef.current = gsap.timeline();
        tlRef.current
          .to(iconRef.current, { duration: 0.12, scale: 0.9, transformOrigin: "50% 50%", ease: "power2.out" })
          // crossfade between shapes
          .to(sun as Element, { duration: 0.28, opacity: mode === "dark" ? 0 : 1 }, "<")
          .to(moon as Element, { duration: 0.28, opacity: mode === "dark" ? 1 : 0 }, "<")
          .to(iconRef.current, { duration: 0.48, scale: 1, filter: `drop-shadow(0 0 6px ${color})`, ease: "elastic.out(1, 0.6)" })
          .to(iconRef.current, { duration: 0.6, filter: "none", ease: "power2.out" });
      } catch {}
    })();
  }, [mode]);

  // Close the menu on outside click (basic)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest?.("[data-theme-toggle]")) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const label = mode === "system" ? "System" : mode === "light" ? "Light" : "Dark";

  return (
    <div className="relative" data-theme-toggle>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title={`Theme: ${label} (click to change)`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs hover:bg-white/5 transition-colors"
      >
        <span className="relative inline-flex h-4 w-4 text-[var(--color-accent)]">
          {/* One SVG containing both shapes, we crossfade with GSAP */}
          <svg ref={iconRef} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path id="sunPath" fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.84 19.16l1.79 1.8 1.79-1.8-1.79-1.79-1.79 1.79zM20 13h3v-2h-3v2zM17.24 4.84l1.8-1.79L19.83 4.84l-1.79 1.79-1.8-1.79zM11 1h2v3h-2V1zm6.16 18.32l1.79 1.8 1.79-1.8-1.79-1.79-1.79 1.79zM12 7a5 5 0 100 10 5 5 0 000-10z" style={{opacity: mode === 'dark' ? 0 : 1}} />
            <path id="moonPath" fill="currentColor" d="M21.64 13a9 9 0 1 1-10.63-10.6 1 1 0 0 1 1.11 1.33A7 7 0 1 0 19.95 12a1 1 0 0 1 1.69 1Z" style={{opacity: mode === 'dark' ? 1 : 0}} />
          </svg>
        </span>
        <span className="hidden sm:inline">{label}</span>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-40 rounded-lg border border-black/10 dark:border-white/10 bg-background/90 backdrop-blur p-1 shadow-lg">
          {(["system", "light", "dark"] as ThemeMode[]).map((opt) => (
            <button
              key={opt}
              role="menuitemradio"
              aria-checked={mode === opt}
              onClick={() => {
                setMode(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-white/5 ${mode === opt ? "text-[var(--color-accent)]" : ""}`}
            >
              <span className="inline-flex h-3 w-3 rounded-full border border-black/10 dark:border-white/10">
                {mode === opt ? <span className="m-[3px] inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" /> : null}
              </span>
              {opt[0].toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
