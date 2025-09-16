import Image from "next/image";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import InfiniteCarousel from "@/components/InfiniteCarousel";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />

      {/* About */}
      <Section id="about" title="About">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 text-foreground/80 space-y-4">
            <div className="glass rounded-2xl p-6 hover-lift">
              <p className="leading-relaxed">
                Final-year Computer Science and Business Systems student passionate about AI, web development, and business‑driven solutions. Experienced in projects spanning finance, healthcare, and sustainability with decentralized platforms and smart dashboards. Known for turning complex ideas into user‑focused products.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 hover-lift" style={{ animationDelay: '0.2s' }}>
              <p className="leading-relaxed">
                Current focus: AI‑powered experiences, robust frontend systems, and shipping production‑ready MVPs with clear impact.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="glass-intense h-32 w-32 rounded-full overflow-hidden hover-lift hover-glow animate-pulse-glow">
              <Image src="/assets/red-flower.svg" alt="Avatar decorative" fill className="object-contain p-3 dark:invert-[.2]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <ul className="flex flex-wrap gap-3">
          {skills.map((s, index) => (
            <li 
              key={s.name} 
              className="text-sm glass rounded-full px-4 py-2 hover-lift hover-glow transition-all duration-300 animate-float"
              style={{ animationDelay: `${index * 0.1}s`, animationDuration: `${6 + (index % 3)}s` }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section id="achievements" title="Leadership">
        <InfiniteCarousel
          speed={30}
          pauseOnHover={true}
          items={[
            {
              title: "Intestella Hackathon — SpaceDNA",
              subtitle: "AI platform for satellite data analysis",
              description:
                "Led the team, defined the MVP, and shipped an AI workflow for ingesting and analyzing satellite imagery.",
              icon: <span>🚀</span>,
              tag: "Winner",
            },
            {
              title: "Aixplore Hackathon — MyRoute",
              subtitle: "Smart transport booking for tier‑2/3 cities",
              description:
                "Owned product strategy and frontend. Delivered routing + booking experience with real‑time UX.",
              icon: <span>🛣️</span>,
              tag: "Winner",
            },
            {
              title: "TechSaksham Showcase",
              subtitle: "Microsoft & SAP Initiative",
              description:
                "Recognized for an education & social innovation project; presented outcomes and impact metrics.",
              icon: <span>🎖️</span>,
              tag: "Showcase",
            },
            {
              title: "Open Source Contributions",
              subtitle: "Community-driven development",
              description:
                "Active contributor to various open source projects with focus on developer tools and educational resources.",
              icon: <span>💻</span>,
              tag: "Contributor",
            },
            {
              title: "Tech Mentorship Program",
              subtitle: "Peer learning initiative",
              description:
                "Mentored junior developers in modern web technologies, helping them build production-ready applications.",
              icon: <span>🎯</span>,
              tag: "Mentor",
            },
          ]}
        />
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <ContactForm />
          <div className="glass rounded-2xl p-6 space-y-4 hover-lift">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-accent)]">Let&apos;s Connect</h3>
            <div className="space-y-3">
              <a 
                href="mailto:1983rishikesh@gmail.com" 
                className="flex items-center gap-3 glass rounded-lg px-4 py-3 hover-lift hover-glow transition-all duration-300 group"
              >
                <span className="text-xl">📧</span>
                <span className="group-hover:text-[var(--color-accent)] transition-colors">1983rishikesh@gmail.com</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/rishikesh-koli-828248257" 
                target="_blank" 
                className="flex items-center gap-3 glass rounded-lg px-4 py-3 hover-lift hover-glow transition-all duration-300 group"
              >
                <span className="text-xl">💼</span>
                <span className="group-hover:text-[var(--color-accent)] transition-colors">LinkedIn Profile</span>
              </a>
              <a 
                href="https://github.com/Rishikoli" 
                target="_blank" 
                className="flex items-center gap-3 glass rounded-lg px-4 py-3 hover-lift hover-glow transition-all duration-300 group"
              >
                <span className="text-xl">🚀</span>
                <span className="group-hover:text-[var(--color-accent)] transition-colors">GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
