"use client";

import Image from "next/image";
import { useEffect, useRef, LegacyRef } from "react";
import AnimatedBackground from "./AnimatedBackground";
import MorphingSVG from "./MorphingSVG";

export default function Hero() {
  const redRef = useRef<HTMLDivElement | null>(null);
  const grayRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const meshRef = useRef<HTMLDivElement | null>(null);
  const nameWrapRef = useRef<HTMLHeadingElement | null>(null);
  const spark1Ref = useRef<HTMLDivElement | null>(null);
  const spark2Ref = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const r = redRef.current;
        const g = grayRef.current;
        const rb = ribbonRef.current;
        const ms = meshRef.current;
        const nm = nameWrapRef.current;

        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
        const ctx = gsap.context(() => {
          // Background layers subtle motion
          if (rb) {
            gsap.to(rb, {
              x: "+=20",
              duration: reduced ? 0 : 10,
              ease: "sine.inOut",
              yoyo: true,
              repeat: reduced ? 0 : -1,
            });
          }
          if (ms) {
            gsap.to(ms, {
              y: "+=16",
              duration: reduced ? 0 : 12,
              ease: "sine.inOut",
              yoyo: true,
              repeat: reduced ? 0 : -1,
            });
          }

          // Continuous idle drift
          if (r) {
            gsap.to(r, {
              y: "+=10",
              rotate: "-=2",
              duration: reduced ? 0 : 4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: reduced ? 0 : -1,
            });
            // Slow wander (adds flexibility)
            if (!reduced) {
              gsap.to(r, { x: "+=20", y: "-=12", duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
              gsap.to(r, { x: "-=16", y: "+=10", duration: 11, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.2 });
            }
            // Organic wobble
            gsap.to(r, {
              scale: 1.03,
              skewX: 2,
              skewY: -1,
              duration: reduced ? 0 : 3.4,
              ease: "sine.inOut",
              yoyo: true,
              repeat: reduced ? 0 : -1,
            });
            // Continuous hue rotation
            gsap.set(r, { "--hue": 0 });
            if (!reduced) {
              gsap.to(r, { "--hue": 360, duration: 15, ease: "none", repeat: -1 });
              // Continuous morphing filter
              gsap.to(r, { 
                filter: "hue-rotate(var(--hue, 0deg)) drop-shadow(0 0 20px rgba(6,182,212,0.4)) blur(0.5px)", 
                duration: 4, 
                ease: "sine.inOut", 
                yoyo: true, 
                repeat: -1 
              });
            }
          }
          if (g) {
            gsap.to(g, {
              y: "-=8",
              rotate: "+=2",
              duration: reduced ? 0 : 4.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: reduced ? 0 : -1,
            });
            // Slow wander (adds flexibility)
            if (!reduced) {
              gsap.to(g, { x: "-=14", y: "+=10", duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1 });
              gsap.to(g, { x: "+=12", y: "-=8", duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
            }
            // Organic wobble
            gsap.to(g, {
              scale: 1.025,
              skewX: -1.5,
              skewY: 1,
              duration: reduced ? 0 : 3.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: reduced ? 0 : -1,
            });
            // Continuous hue rotation
            gsap.set(g, { "--hue": 0 });
            if (!reduced) {
              gsap.to(g, { "--hue": 360, duration: 18, ease: "none", repeat: -1 });
              // Continuous morphing filter
              gsap.to(g, { 
                filter: "hue-rotate(var(--hue, 0deg)) drop-shadow(0 0 15px rgba(163,230,53,0.3)) blur(0.3px)", 
                duration: 5, 
                ease: "sine.inOut", 
                yoyo: true, 
                repeat: -1 
              });
            }
          }

          if (r) {
            gsap.fromTo(
              r,
              { y: 0, rotate: -8 },
              {
                y: 60,
                rotate: -4,
                ease: "none",
                scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top top",
                  end: "+=60%",
                  scrub: reduced ? false : 0.6,
                },
              }
            );
          }
          if (g) {
            gsap.fromTo(
              g,
              { y: 0, rotate: 8 },
              {
                y: -40,
                rotate: 12,
                ease: "none",
                scrollTrigger: {
                  trigger: rootRef.current,
                  start: "top top",
                  end: "+=60%",
                  scrub: reduced ? false : 0.6,
                },
              }
            );
          }

          // Mouse tilt
          const onMove = (e: MouseEvent) => {
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const dx = (e.clientX - vw / 2) / (vw / 2); // -1..1
            const dy = (e.clientY - vh / 2) / (vh / 2);
            if (r)
              gsap.to(r, {
                x: dx * 16,
                y: dy * 6,
                rotate: -8 + dx * 3,
                scale: 1 + Math.min(Math.hypot(dx, dy), 1) * 0.015,
                duration: reduced ? 0 : 0.35,
                overwrite: "auto",
              });
            if (g)
              gsap.to(g, {
                x: dx * -12,
                y: dy * -4,
                rotate: 8 + dx * -3,
                scale: 1 + Math.min(Math.hypot(dx, dy), 1) * 0.01,
                duration: reduced ? 0 : 0.35,
                overwrite: "auto",
              });
          };
          if (!reduced) window.addEventListener("mousemove", onMove);

          // Spark particles around the name for extra liveliness
          const s1 = spark1Ref.current;
          const s2 = spark2Ref.current;
          if (!reduced) {
            if (s1) {
              gsap.to(s1, { x: "+=30", y: "-=10", scale: 1.1, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
              gsap.to(s1, { x: "-=20", y: "+=8", duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.6 });
            }
            if (s2) {
              gsap.to(s2, { x: "-=26", y: "+=12", scale: 1.08, duration: 6.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
              gsap.to(s2, { x: "+=18", y: "-=10", duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.9 });
            }
          }

          return () => {
            window.removeEventListener("mousemove", onMove);
          };

          // Name animation: letter-spacing and gradient sweep
        if (nm) {
          const el = nm as HTMLHeadingElement;
          const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#22d3ee";
          const accent2 = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim() || "#3b82f6";
          el.style.backgroundImage = `linear-gradient(90deg, ${accent}, ${accent2}, ${accent})`;
          el.style.backgroundClip = "text";
          (el.style as CSSStyleDeclaration & { WebkitBackgroundClip: string }).WebkitBackgroundClip = "text";
          el.style.color = "transparent";
          el.style.backgroundSize = "200% 100%";
          if (!reduced) {
            gsap.fromTo(el, { letterSpacing: "-0.04em", opacity: 0.8, backgroundPosition: "0% 0%" }, { letterSpacing: "-0.01em", opacity: 1, backgroundPosition: "200% 0%", duration: 2, ease: "power2.out" });
          }
        }
        }, rootRef);
        cleanup = () => ctx.revert();
      } catch {
        // GSAP optional
      }
    })();
    return cleanup;
  }, []);

  return (
    <section ref={rootRef as LegacyRef<HTMLElement>} id="home" className="relative overflow-hidden pt-10 sm:pt-16 pb-16 sm:pb-24 bg-background text-foreground">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Background texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_600px_at_top_left,rgba(255,255,255,0.06),transparent),radial-gradient(800px_500px_at_bottom_right,rgba(255,255,255,0.05),transparent)] dark:bg-[radial-gradient(1000px_600px_at_top_left,rgba(217,255,63,0.08),transparent),radial-gradient(800px_500px_at_bottom_right,rgba(217,255,63,0.06),transparent)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        {/* Top pills */}
        <div className="flex items-center justify-between">
          <div className="glass rounded-full px-4 py-2 text-xs font-semibold tracking-wide hover-lift hidden sm:flex">
            <span className="me-2 opacity-90">Rishikesh</span>
            <span className="text-[var(--color-accent)] animate-pulse-glow">|</span>
            <span className="ms-2 opacity-90">Koli</span>
          </div>
        </div>

        {/* Headline centered with elegant background */}
        <div className="mt-12 sm:mt-16 relative flex flex-col items-center text-center min-h-[65vh] sm:min-h-[70vh]">
          {/* Background ribbon & mesh */}
          <div ref={ribbonRef} aria-hidden className="absolute -z-10 left-1/2 -translate-x-1/2 -top-10 w-[620px] opacity-45">
            <Image src="/assets/ribbon-cyan.svg" alt="" width={620} height={320} priority className="select-none pointer-events-none" />
          </div>
          <div ref={meshRef} aria-hidden className="absolute -z-10 left-1/2 -translate-x-1/2 -top-10 w-[520px] opacity-30">
            <Image src="/assets/mesh-cyan.svg" alt="" width={520} height={320} priority className="select-none pointer-events-none" />
          </div>

          {/* Elegant SVG decoration behind name */}
          <div className="absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20">
            <svg className="w-full h-full" viewBox="0 0 600 400" fill="none">
              <g opacity="0.8">
                <path
                  d="M0,200 Q150,50 300,200 T600,200"
                  stroke="url(#heroGradient1)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-hero-flow-1"
                />
                <path
                  d="M0,150 Q150,0 300,150 T600,150"
                  stroke="url(#heroGradient2)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-hero-flow-2"
                />
                <path
                  d="M0,250 Q150,100 300,250 T600,250"
                  stroke="url(#heroGradient3)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-hero-flow-3"
                />
              </g>
              
              <g opacity="0.6">
                <circle cx="150" cy="150" r="4" fill="var(--color-accent)" className="animate-hero-pulse-1" />
                <circle cx="450" cy="200" r="3" fill="var(--color-accent-2)" className="animate-hero-pulse-2" />
                <circle cx="300" cy="100" r="5" fill="var(--color-success)" className="animate-hero-pulse-3" />
                <circle cx="100" cy="300" r="3" fill="var(--color-accent)" className="animate-hero-pulse-4" />
                <circle cx="500" cy="320" r="4" fill="var(--color-accent-2)" className="animate-hero-pulse-5" />
              </g>
              
              <defs>
                <linearGradient id="heroGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--color-accent-2)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="heroGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--color-success)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <style jsx>{`
            @keyframes hero-flow-1 {
              0% { stroke-dasharray: 0 600; stroke-dashoffset: 0; }
              50% { stroke-dasharray: 150 600; stroke-dashoffset: -75; }
              100% { stroke-dasharray: 0 600; stroke-dashoffset: -150; }
            }
            
            @keyframes hero-flow-2 {
              0% { stroke-dasharray: 0 500; stroke-dashoffset: 0; }
              50% { stroke-dasharray: 120 500; stroke-dashoffset: -60; }
              100% { stroke-dasharray: 0 500; stroke-dashoffset: -120; }
            }
            
            @keyframes hero-flow-3 {
              0% { stroke-dasharray: 0 550; stroke-dashoffset: 0; }
              50% { stroke-dasharray: 130 550; stroke-dashoffset: -65; }
              100% { stroke-dasharray: 0 550; stroke-dashoffset: -130; }
            }
            
            @keyframes hero-pulse {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.3); }
            }
            
            .animate-hero-flow-1 { animation: hero-flow-1 10s ease-in-out infinite; }
            .animate-hero-flow-2 { animation: hero-flow-2 12s ease-in-out infinite 2s; }
            .animate-hero-flow-3 { animation: hero-flow-3 8s ease-in-out infinite 4s; }
            
            .animate-hero-pulse-1 { animation: hero-pulse 5s ease-in-out infinite; }
            .animate-hero-pulse-2 { animation: hero-pulse 6s ease-in-out infinite 1s; }
            .animate-hero-pulse-3 { animation: hero-pulse 4s ease-in-out infinite 2s; }
            .animate-hero-pulse-4 { animation: hero-pulse 7s ease-in-out infinite 3s; }
            .animate-hero-pulse-5 { animation: hero-pulse 5.5s ease-in-out infinite 4s; }
            
            @media (prefers-reduced-motion: reduce) {
              .animate-hero-flow-1, .animate-hero-flow-2, .animate-hero-flow-3,
              .animate-hero-pulse-1, .animate-hero-pulse-2, .animate-hero-pulse-3,
              .animate-hero-pulse-4, .animate-hero-pulse-5 {
                animation: none;
              }
            }
          `}</style>

          {/* Name and tagline */}
          <h1 ref={nameWrapRef} className="relative z-10 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
            <span className="block">RISHIKESH</span>
            <span className="block">KOLI</span>
          </h1>
          {/* Sparks */}
          <div className="relative">
            <div ref={spark1Ref} aria-hidden className="pointer-events-none absolute -left-24 -top-6 h-6 w-6 rounded-full bg-[var(--color-accent)] blur-[2px] opacity-70 mix-blend-screen animate-particle-float" />
            <div ref={spark2Ref} aria-hidden className="pointer-events-none absolute left-28 -top-3 h-4 w-4 rounded-full bg-[var(--color-accent-2)] blur-[1px] opacity-80 mix-blend-screen animate-particle-float" style={{ animationDelay: '1s' }} />
            
            {/* Additional morphing SVG elements */}
            <div className="absolute -right-32 -top-8">
              <MorphingSVG size={80} opacity={0.3} />
            </div>
            <div className="absolute -left-40 top-4">
              <MorphingSVG size={60} opacity={0.2} color="var(--accent-2)" />
            </div>
          </div>
          <div className="relative mt-4 glass rounded-full px-4 py-2 text-sm hover-lift">
            <span className="opacity-90">Software Engineer | Final-year CS & Business Systems</span>
          </div>

          <div className="relative mt-8 flex items-center gap-4">
            <a href="#projects" className="glass-intense rounded-full px-5 py-2.5 text-sm font-medium bg-[var(--color-accent)] hover:bg-[var(--color-accent-2)] text-background transition-all duration-300 hover-lift hover-glow animate-shimmer">View projects</a>
            <a href="#about" className="glass rounded-full px-5 py-2.5 text-sm hover:border-[var(--color-accent)]/60 transition-all duration-300 hover-lift">5 best tips →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
