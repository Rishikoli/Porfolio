"use client";
import React from "react";
import GlassCard from "./GlassCard";

export type CardItem = {
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  tag?: string;
  href?: string;
};

type CardCarouselProps = {
  items: CardItem[];
  autoplay?: boolean;
  intervalMs?: number;
};

export default function CardCarousel({ items, autoplay = true, intervalMs = 3000 }: CardCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [step, setStep] = React.useState(320);
  const [noSnap, setNoSnap] = React.useState(false);
  const lastAdvanceRef = React.useRef(0);

  const GAP_PX = 16; // matches gap-4
  const looped = items.length > 1;
  const renderItems = looped ? [items[items.length - 1], ...items, items[0]] : items;

  const measure = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.querySelector("[data-card]") as HTMLElement | null;
    if (first) {
      const w = Math.round(first.getBoundingClientRect().width);
      setStep(w + GAP_PX);
    }
  }, []);

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el || !looped) return;
    // Position at first real item (after the prepended clone)
    setNoSnap(true);
    el.scrollTo({ left: step, behavior: "auto" });
    // allow layout to settle then re-enable snap
    const t = window.setTimeout(() => setNoSnap(false), 40);
    return () => window.clearTimeout(t);
  }, [looped, step]);

  React.useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const scrollBy = (delta: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const advance = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Throttle to avoid overlapping smooth scrolls
    const now = Date.now();
    if (now - lastAdvanceRef.current < Math.max(350, Math.round(intervalMs * 0.6))) return;
    lastAdvanceRef.current = now;
    const tol = Math.max(2, Math.round(step / 4));
    const trailingStart = step * items.length;
    // If we're at or beyond the last real item, wrap to the first real item before advancing
    if (el.scrollLeft >= trailingStart - tol) {
      setNoSnap(true);
      el.scrollTo({ left: step, behavior: "auto" });
      window.setTimeout(() => setNoSnap(false), 40);
    } else {
      el.scrollBy({ left: step, behavior: "smooth" });
    }
  }, [step, items.length, intervalMs]);

  // Autoplay with pause-on-hover and visibility pause
  React.useEffect(() => {
    if (!autoplay) return;
    let timer: number | undefined;

    const start = () => {
      if (!paused) {
        timer = window.setInterval(advance, intervalMs);
      }
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = undefined;
    };

    start();

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoplay, paused, intervalMs, advance]);

  const handleScroll = React.useCallback(() => {
    if (!looped) return;
    const el = scrollRef.current;
    if (!el) return;
    const tol = Math.max(2, Math.round(step / 4));
    // If we reach the leading clone, jump to last real item
    if (el.scrollLeft <= tol) {
      setNoSnap(true);
      el.scrollTo({ left: step * items.length, behavior: "auto" });
      window.setTimeout(() => setNoSnap(false), 40);
      return;
    }
    // If we reach the trailing clone start, jump back to first real item
    const trailingStart = step * items.length - tol;
    if (el.scrollLeft >= trailingStart) {
      setNoSnap(true);
      el.scrollTo({ left: step, behavior: "auto" });
      window.setTimeout(() => setNoSnap(false), 40);
    }
  }, [items.length, looped, step]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Controls */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollBy(-step)}
        className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full glass hover-lift hover-glow transition-all duration-300"
      >
        <span className="text-lg">‹</span>
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollBy(step)}
        className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full glass hover-lift hover-glow transition-all duration-300"
      >
        <span className="text-lg">›</span>
      </button>

      {/* Track */}
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto scroll-smooth ${noSnap ? "snap-none" : "snap-x snap-mandatory"} px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        onScroll={handleScroll}
      >
        {renderItems.map((item, idx) => (
          <div key={idx} data-card>
            <CarouselCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ item }: { item: CardItem }) {
  const content = (
    <GlassCard className="snap-start min-w-[260px] w-[80vw] max-w-[320px] sm:w-[300px] group relative overflow-hidden" intensity="medium" hover={true} glow={true}>
      {/* Accent gradient edge */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-2)] to-[var(--color-accent)] opacity-60 animate-shimmer" />

      <div className="p-4 sm:p-5 flex items-start gap-3">
        <div className="shrink-0 h-9 w-9 rounded-xl bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] text-background grid place-items-center animate-pulse-glow">
          <span className="text-base">{item.icon ?? "🏅"}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base sm:text-lg font-semibold leading-tight">{item.title}</h3>
            {item.tag ? (
              <span className="glass rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide hover-lift">{item.tag}</span>
            ) : null}
          </div>
          {item.subtitle ? (
            <p className="text-foreground/70 text-xs sm:text-sm mt-0.5">{item.subtitle}</p>
          ) : null}
          <p className="text-foreground/80 text-sm sm:text-base mt-2">{item.description}</p>
        </div>
      </div>
    </GlassCard>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="block will-change-transform transition-transform hover:-translate-y-0.5"
      >
        {content}
      </a>
    );
  }
  return content;
}
