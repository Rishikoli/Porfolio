"use client";

import React from "react";
import GlassCard from "./GlassCard";

export type LeadershipItem = {
  icon: string;
  title: string;
  project: string;
  quality: string;
};

type LeadershipCarouselProps = {
  items: LeadershipItem[];
  speed?: "normal" | "slow" | "fast";
};

export default function LeadershipCarousel({ items, speed = "normal" }: LeadershipCarouselProps) {
  const durationMap = {
    normal: "40s",
    slow: "80s",
    fast: "20s",
  };

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
    >
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
        style={{ animationDuration: durationMap[speed] }}
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <Card item={item} />
          </li>
        ))}
      </ul>
      {/* Second set for seamless looping */}
      <ul
        className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll"
        style={{ animationDuration: durationMap[speed] }}
        aria-hidden="true"
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ item }: { item: LeadershipItem }) {
  return (
    <GlassCard className="relative w-64 h-40 p-4" intensity="medium" hover={true} glow={true}>
      <div className="flex items-start gap-3">
        <span className="text-2xl animate-pulse-glow">{item.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-white">{item.title}</h3>
          <p className="text-sm text-white/80 mt-1">{item.project}</p>
          <span className="mt-2 text-xs font-medium text-cyan-300 glass rounded-full px-2 py-0.5 inline-block hover-lift">
            {item.quality}
          </span>
        </div>
      </div>
    </GlassCard>
  );
}
