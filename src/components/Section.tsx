"use client";

import { ReactNode } from "react";

export default function Section({ id, title, children, className = "" }: { id: string; title?: string; children: ReactNode; className?: string; }) {
  return (
    <section id={id} className={`scroll-mt-24 py-12 sm:py-16 relative ${className}`}>
      <div className="mx-auto max-w-6xl px-3 sm:px-3 relative z-10">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8 relative">
            <span 
              className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
              }}
            >
              {title}
            </span>
            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] rounded-full animate-pulse-glow" />
          </h2>
        )}
        {children}
      </div>
      
      {/* Elegant SVG decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none">
          <g opacity="0.6">
            <path
              d="M0,300 Q200,150 400,300 T800,300"
              stroke="url(#sectionGradient1)"
              strokeWidth="1"
              fill="none"
              className="animate-gentle-flow"
            />
            <path
              d="M0,200 Q200,50 400,200 T800,200"
              stroke="url(#sectionGradient2)"
              strokeWidth="0.8"
              fill="none"
              className="animate-gentle-flow-delayed"
            />
          </g>
          <g opacity="0.4">
            <circle cx="150" cy="150" r="2" fill="var(--color-accent)" className="animate-gentle-pulse" />
            <circle cx="650" cy="250" r="1.5" fill="var(--color-accent-2)" className="animate-gentle-pulse-delayed" />
            <circle cx="400" cy="400" r="2.5" fill="var(--color-success)" className="animate-gentle-pulse-slow" />
          </g>
          <defs>
            <linearGradient id="sectionGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--color-accent-2)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes gentle-flow {
          0% { stroke-dasharray: 0 400; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 100 400; stroke-dashoffset: -50; }
          100% { stroke-dasharray: 0 400; stroke-dashoffset: -100; }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-gentle-flow { 
          animation: gentle-flow 8s ease-in-out infinite; 
        }
        .animate-gentle-flow-delayed { 
          animation: gentle-flow 10s ease-in-out infinite 2s; 
        }
        .animate-gentle-pulse { 
          animation: gentle-pulse 4s ease-in-out infinite; 
        }
        .animate-gentle-pulse-delayed { 
          animation: gentle-pulse 5s ease-in-out infinite 1s; 
        }
        .animate-gentle-pulse-slow { 
          animation: gentle-pulse 6s ease-in-out infinite 3s; 
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-gentle-flow, .animate-gentle-flow-delayed,
          .animate-gentle-pulse, .animate-gentle-pulse-delayed, .animate-gentle-pulse-slow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
