import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import GlassCard from "./GlassCard";
import MorphingSVG from "./MorphingSVG";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="overflow-hidden flex flex-col group relative" intensity="medium" hover={true} glow={true}>
      {/* Decorative morphing SVG */}
      <div className="absolute -top-4 -right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <MorphingSVG size={60} opacity={0.3} />
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer pointer-events-none" />
      
      {project.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3 relative z-10">
        <h3 className="text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors duration-300">{project.title}</h3>
        <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">{project.description}</p>
        
        {project.tech?.length ? (
          <ul className="flex flex-wrap gap-2 mt-1">
            {project.tech.map((t: string) => (
              <li key={t} className="text-xs glass rounded px-2 py-1 hover-lift transition-all duration-200">{t}</li>
            ))}
          </ul>
        ) : null}
        
        <div className="mt-4 flex items-center gap-3 text-sm">
          {project.demo && (
            <Link 
              href={project.demo} 
              target="_blank" 
              className="glass-intense rounded-full px-3 py-1.5 hover-lift hover-glow transition-all duration-300 font-medium"
            >
              Live Demo
            </Link>
          )}
          {project.repo && (
            <Link 
              href={project.repo} 
              target="_blank" 
              className="glass rounded-full px-3 py-1.5 hover-lift transition-all duration-300 font-medium"
            >
              View Code
            </Link>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
