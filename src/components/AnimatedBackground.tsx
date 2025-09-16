"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    const createParticles = () => {
      const particleCount = 15;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-accent/30 rounded-full animate-particle-float';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particle.style.animationDuration = `${4 + Math.random() * 4}s`;
        container.appendChild(particle);
      }
    };

    createParticles();

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Beautiful SVG Animation Background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" fill="none">
        {/* Animated flowing lines */}
        <g opacity="0.6">
          <path
            d="M0,540 Q480,200 960,540 T1920,540"
            stroke="url(#flowGradient1)"
            strokeWidth="2"
            fill="none"
            className="animate-flow-1"
          />
          <path
            d="M0,400 Q480,100 960,400 T1920,400"
            stroke="url(#flowGradient2)"
            strokeWidth="1.5"
            fill="none"
            className="animate-flow-2"
          />
          <path
            d="M0,680 Q480,340 960,680 T1920,680"
            stroke="url(#flowGradient3)"
            strokeWidth="1"
            fill="none"
            className="animate-flow-3"
          />
        </g>

        {/* Animated geometric shapes */}
        <g opacity="0.4">
          {/* Floating diamonds */}
          <polygon
            points="200,200 250,150 300,200 250,250"
            fill="url(#shapeGradient1)"
            className="animate-float-shape-1"
          />
          <polygon
            points="1600,300 1650,250 1700,300 1650,350"
            fill="url(#shapeGradient2)"
            className="animate-float-shape-2"
          />
          <polygon
            points="400,800 450,750 500,800 450,850"
            fill="url(#shapeGradient3)"
            className="animate-float-shape-3"
          />

          {/* Rotating hexagons */}
          <polygon
            points="800,150 830,170 830,210 800,230 770,210 770,170"
            fill="none"
            stroke="url(#flowGradient1)"
            strokeWidth="1"
            className="animate-rotate-slow"
          />
          <polygon
            points="1200,800 1230,820 1230,860 1200,880 1170,860 1170,820"
            fill="none"
            stroke="url(#flowGradient2)"
            strokeWidth="1"
            className="animate-rotate-medium"
          />
        </g>

        {/* Animated particles */}
        <g opacity="0.8">
          <circle cx="300" cy="300" r="3" fill="url(#particleGradient1)" className="animate-particle-1" />
          <circle cx="800" cy="200" r="2" fill="url(#particleGradient2)" className="animate-particle-2" />
          <circle cx="1400" cy="400" r="2.5" fill="url(#particleGradient3)" className="animate-particle-3" />
          <circle cx="600" cy="700" r="2" fill="url(#particleGradient1)" className="animate-particle-4" />
          <circle cx="1100" cy="600" r="3" fill="url(#particleGradient2)" className="animate-particle-5" />
          <circle cx="1600" cy="800" r="2" fill="url(#particleGradient3)" className="animate-particle-6" />
        </g>

        {/* Gradients */}
        <defs>
          {/* Flow gradients */}
          <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-accent-2)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flowGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-success)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
          </linearGradient>

          {/* Shape gradients */}
          <radialGradient id="shapeGradient1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shapeGradient2">
            <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shapeGradient3">
            <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
          </radialGradient>

          {/* Particle gradients */}
          <radialGradient id="particleGradient1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="particleGradient2">
            <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="particleGradient3">
            <stop offset="0%" stopColor="var(--color-success)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flow-1 {
          0% { stroke-dasharray: 0 1000; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 200 1000; stroke-dashoffset: -100; }
          100% { stroke-dasharray: 0 1000; stroke-dashoffset: -200; }
        }
        
        @keyframes flow-2 {
          0% { stroke-dasharray: 0 800; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 150 800; stroke-dashoffset: -75; }
          100% { stroke-dasharray: 0 800; stroke-dashoffset: -150; }
        }
        
        @keyframes flow-3 {
          0% { stroke-dasharray: 0 600; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 100 600; stroke-dashoffset: -50; }
          100% { stroke-dasharray: 0 600; stroke-dashoffset: -100; }
        }
        
        @keyframes float-shape-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.4; }
          25% { transform: translate(20px, -30px) rotate(90deg); opacity: 0.8; }
          50% { transform: translate(-10px, -50px) rotate(180deg); opacity: 0.6; }
          75% { transform: translate(-30px, -20px) rotate(270deg); opacity: 0.9; }
        }
        
        @keyframes float-shape-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          33% { transform: translate(-25px, 40px) rotate(120deg); opacity: 0.7; }
          66% { transform: translate(15px, -25px) rotate(240deg); opacity: 0.5; }
        }
        
        @keyframes float-shape-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
          50% { transform: translate(30px, 20px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes rotate-medium {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); opacity: 0.8; }
          25% { transform: translate(15px, -20px); opacity: 1; }
          50% { transform: translate(-10px, -35px); opacity: 0.6; }
          75% { transform: translate(-20px, -15px); opacity: 0.9; }
        }
        
        .animate-flow-1 { animation: flow-1 8s ease-in-out infinite; }
        .animate-flow-2 { animation: flow-2 12s ease-in-out infinite 2s; }
        .animate-flow-3 { animation: flow-3 10s ease-in-out infinite 4s; }
        
        .animate-float-shape-1 { animation: float-shape-1 15s ease-in-out infinite; }
        .animate-float-shape-2 { animation: float-shape-2 18s ease-in-out infinite 3s; }
        .animate-float-shape-3 { animation: float-shape-3 12s ease-in-out infinite 6s; }
        
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-rotate-medium { animation: rotate-medium 15s linear infinite; }
        
        .animate-particle-1 { animation: particle-float 6s ease-in-out infinite; }
        .animate-particle-2 { animation: particle-float 8s ease-in-out infinite 1s; }
        .animate-particle-3 { animation: particle-float 7s ease-in-out infinite 2s; }
        .animate-particle-4 { animation: particle-float 9s ease-in-out infinite 3s; }
        .animate-particle-5 { animation: particle-float 5s ease-in-out infinite 4s; }
        .animate-particle-6 { animation: particle-float 10s ease-in-out infinite 5s; }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-flow-1, .animate-flow-2, .animate-flow-3,
          .animate-float-shape-1, .animate-float-shape-2, .animate-float-shape-3,
          .animate-rotate-slow, .animate-rotate-medium,
          .animate-particle-1, .animate-particle-2, .animate-particle-3,
          .animate-particle-4, .animate-particle-5, .animate-particle-6 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
