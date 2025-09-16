"use client";

import { useState } from "react";
import GlassCard from "./GlassCard";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: wire to an API route or service (e.g., EmailJS, Resend). For now, simulate success.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("sent");
  };

  return (
    <GlassCard className="p-6 max-w-xl" intensity="medium" hover={true}>
      <form className="grid gap-4" onSubmit={onSubmit}>
        <input 
          className="glass rounded-lg px-4 py-3 placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all duration-300" 
          placeholder="Your name" 
          name="name" 
          required 
        />
        <input 
          className="glass rounded-lg px-4 py-3 placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all duration-300" 
          placeholder="Your email" 
          type="email" 
          name="email" 
          required 
        />
        <textarea 
          className="glass rounded-lg px-4 py-3 placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all duration-300 resize-none" 
          placeholder="Your message" 
          rows={4} 
          name="message" 
          required 
        />
        <button 
          disabled={status !== "idle"} 
          className="glass-intense rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-2)] text-background px-6 py-3 font-medium w-fit disabled:opacity-60 hover-lift hover-glow transition-all duration-300 animate-shimmer"
        >
          {status === "idle" && "Send Message"}
          {status === "sending" && "Sending..."}
          {status === "sent" && "Message Sent! ✨"}
        </button>
      </form>
    </GlassCard>
  );
}
