import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-foreground/70">© {new Date().getFullYear()} Rishikesh Koli. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/Rishikoli" className="hover:underline" target="_blank">GitHub</Link>
          <Link href="https://www.linkedin.com/in/rishikesh-koli-828248257" className="hover:underline" target="_blank">LinkedIn</Link>
          <Link href="mailto:1983rishikesh@gmail.com" className="hover:underline">Email</Link>
        </div>
      </div>
    </footer>
  );
}
