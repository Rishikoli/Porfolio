"use client";

import React, { useRef, useEffect } from "react";
import GlassCard from "./GlassCard";

export type CarouselItem = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
};

type InfiniteCarouselProps = {
  items: CarouselItem[];
  speed?: number;
  pauseOnHover?: boolean;
};

export default function InfiniteCarousel({ 
  items, 
  speed = 50, 
  pauseOnHover = true 
}: InfiniteCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // Removed the manual DOM manipulation in favor of React rendering
  useEffect(() => {
    // Add performance optimization for animations
    const scroller = scrollerRef.current;
    if (scroller) {
      // Force hardware acceleration
      scroller.style.willChange = 'contents';
      return () => {
        scroller.style.willChange = 'auto';
      };
    }
  }, []);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div 
      ref={scrollerRef}
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`flex gap-6 w-max ${isPaused ? 'pause-animation' : ''}`}
        style={{
          animation: `scroll ${speed}s linear infinite`,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {items.map((item, index) => (
          <CarouselCard key={index} item={item} />
        ))}
        {/* Duplicate items for seamless looping */}
        {items.map((item, index) => (
          <CarouselCard key={`duplicate-${index}`} item={item} />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
        
        .pause-animation {
          animation-play-state: paused !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .pause-animation {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function CarouselCard({ item }: { item: CarouselItem }) {
  return (
    <GlassCard className="min-w-[320px] p-5" intensity="medium" hover={true} glow={true}>
      <div className="flex items-start gap-4">
        <div className="shrink-0 h-12 w-12 rounded-xl bg-[color-mix(in_oklab,var(--color-accent)_20%,transparent)] grid place-items-center animate-pulse-glow">
          <span className="text-lg">{item.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
            <span className="glass rounded-full px-2 py-1 text-xs uppercase tracking-wide hover-lift">
              {item.tag}
            </span>
          </div>
          <p className="text-foreground/70 text-sm mb-3">{item.subtitle}</p>
          <p className="text-foreground/80 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
    </GlassCard>
  );
}
