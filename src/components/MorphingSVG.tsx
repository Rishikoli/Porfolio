"use client";

import { useEffect, useRef } from "react";

interface MorphingSVGProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export default function MorphingSVG({ 
  size = 200, 
  color = "var(--accent)", 
  opacity = 0.6,
  className = "" 
}: MorphingSVGProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const shapes = [
      "M50,50 Q150,20 250,50 Q220,150 250,250 Q150,220 50,250 Q20,150 50,50 Z",
      "M80,30 Q200,40 270,80 Q260,200 270,280 Q200,270 80,280 Q40,200 30,80 Q40,40 80,30 Z",
      "M60,80 Q180,10 280,60 Q290,180 280,280 Q180,290 60,280 Q10,180 60,80 Z",
      "M40,60 Q160,30 260,40 Q290,160 260,260 Q160,290 40,260 Q30,160 40,60 Z"
    ];

    let currentIndex = 0;
    const morphInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % shapes.length;
      path.setAttribute('d', shapes[currentIndex]);
    }, 3000);

    return () => clearInterval(morphInterval);
  }, []);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 300 300" 
      className={`animate-pulse-glow ${className}`}
      style={{ filter: `drop-shadow(0 0 20px ${color}30)` }}
    >
      <defs>
        <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity * 0.8} />
          <stop offset="50%" stopColor={color} stopOpacity={opacity * 0.4} />
          <stop offset="100%" stopColor={color} stopOpacity={opacity * 0.2} />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M50,50 Q150,20 250,50 Q220,150 250,250 Q150,220 50,250 Q20,150 50,50 Z"
        fill="url(#morphGradient)"
        stroke={color}
        strokeWidth="1"
        strokeOpacity={opacity * 0.5}
        style={{
          transition: 'd 2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
    </svg>
  );
}
