"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "intense";
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ 
  children, 
  className = "", 
  intensity = "medium",
  hover = true,
  glow = false 
}: GlassCardProps) {
  const intensityClasses = {
    light: "glass",
    medium: "glass",
    intense: "glass-intense"
  };

  const baseClasses = intensityClasses[intensity];
  const hoverClasses = hover ? "hover-lift" : "";
  const glowClasses = glow ? "hover-glow" : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${glowClasses} rounded-2xl transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
