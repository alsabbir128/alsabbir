import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Code2, Database, ExternalLink, GitBranch, Mail, Menu, MonitorSmartphone, Palette, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/abdullah-portrait.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abdullah Al Sabbir — Web Developer" },
      { name: "description", content: "Abdullah Al Sabbir is a CSE student and web developer building thoughtful digital experiences." },
      { property: "og:title", content: "Abdullah Al Sabbir — Web Developer" },
      { property: "og:description", content: "Explore Abdullah Al Sabbir's work, skills, and web development projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: portrait.url },
      { name: "twitter:image", content: portrait.url },
    ],
  }),
  component: Portfolio,
});

const navItems = ["About", "Skills", "Projects", "Services", "Contact"];
const skillGroups = [
  { title: "Web development", icon: Code2, skills: ["React 19", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"] },
  { title: "Languages & systems", icon: Database, skills: ["Python", "C / C++", "SQL", "NoSQL", "Data structures", "API architecture"] },
  { title: "Design & tools", icon: Palette, skills: ["Adobe Photoshop", "UI / UX", "Git & GitHub", "Visual systems", "Responsive design"] },
  { title: "How I work", icon: Sparkles, skills: ["Problem solving", "Creative thinking", "Communication", "Curiosity", "Ownership"] },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const navigationTarget = useRef<string | null>(null);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.toLowerCase())).filter((item): item is HTMLElement => Boolean(item));
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const target = navigationTarget.current && document.getElementById(navigationTarget.current);
      if (target) {
        const landingOffset = window.innerWidth <= 800 ? 70 : 32;
        const nearTarget = Math.abs(target.getBoundingClientRect().top - landingOffset) < 14;
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3;
        if (!nearTarget && !atBottom) return;
        navigationTarget.current = null;
      }
      const marker = Math.min(window.innerHeight * 0.35, 320);
      const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= marker);
      setActiveSection(current?.id ?? "about");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  function navigateToSection(id: string) {
    navigationTarget.current = id;
    setActiveSection(id);
    setMenuOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = String(form.get("subject") || "Portfolio enquiry");
    const body = `From: ${form.get("name")} (${form.get("email")})\n\n${form.get("message")}`;
    window.location.href = `mailto:abdullahals128@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="portfolio-shell" id="home">
      <header className="site-header">
        <a href="#home" className="brand" aria-label="Abdullah Al Sabbir home" onClick={() => setMenuOpen(false)}>
          <img src={portrait.url} alt="" /><strong>alsabbir<span>.dev</span></strong>
        </a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className={activeSection === item.toLowerCase() ? "is-active" : ""} aria-current={activeSection === item.toLowerCase() ? "location" : undefined} onClick={() => navigateToSection(item.toLowerCase())}>{item}</a>)}
          <a className="nav-cta" href="#contact" onClick={() => navigateToSection("contact")}>Get in touch <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
        <Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <main className="site-main">
        <section className="hero content-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Available for creative collaborations</p>
            <h1 id="hero-title">Building thoughtful <em>digital</em> experiences.</h1>
            <p className="hero-lede">Hi, I&apos;m <strong>Abdullah Al Sabbir</strong> — a CSE undergrad and web developer turning ideas from the classroom into things people can actually use.</p>
            <div className="hero-actions"><Button asChild><a href="#projects">View projects <ArrowUpRight /></a></Button><Button variant="outline" asChild><a href="#contact">Contact me <Mail /></a></Button></div>
            <div className="social-row"><a href="https://github.com/alsabbir128" target="_blank" rel="noreferrer"><GitBranch /> GitHub</a><a href="https://linkedin.com/in/abdullah-al-sabbir-54b05b294" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href="mailto:abdullahals128@gmail.com"><Mail /> Email</a></div>
          </div>
          <div className="hero-visual" aria-label="Portrait of Abdullah Al Sabbir">
            <div className="portrait-outline" aria-hidden="true" />
            <div className="profile-card"><img src={portrait.url} alt="Abdullah Al Sabbir smiling in a white shirt" /><div className="profile-caption"><span>CSE / WEB DEV</span><p>“Theory is a starting point.<br />Building is the real test.”</p></div></div>
            <div className="floating-note note-top"><span>01</span><strong>Learn</strong><small>every day</small></div><div className="floating-note note-bottom"><span>02</span><strong>Build</strong><small>with intention</small></div>
          </div>
        </section>

        <section id="about" className="section about-section"><div className="content-container about-grid"><div><p className="eyebrow">01 / About me</p><h2>A developer with a <em>creative edge.</em></h2></div><div className="about-copy"><p className="lead">I&apos;m currently studying Computer Science &amp; Engineering at <strong>North South University</strong>, where I&apos;m sharpening my foundations in software engineering, algorithms, and systems.</p><p>Outside the curriculum, I enjoy making the web feel a little more human — pairing clean code with considered interfaces, visual storytelling, and practical problem solving.</p><div className="credentials"><div><span>CS</span><div><strong>Python Programming</strong><small>Bangladesh Students&apos; Programming &amp; Robotics Club</small></div></div><div><span>EN</span><div><strong>IELTS Certified</strong><small>Global communication &amp; collaboration</small></div></div></div></div></div></section>

        <section id="skills" className="section"><div className="content-container"><div className="section-heading"><div><p className="eyebrow">02 / The toolkit</p><h2>Skills that turn ideas into <em>shipped work.</em></h2></div><p>A growing collection of technologies, habits, and creative tools I use to move from first sketch to final polish.</p></div><div className="skills-grid">{skillGroups.map(({ title, icon: Icon, skills }) => <article className="skill-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><div className="tag-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div></div></section>

        <section id="projects" className="section"><div className="content-container"><div className="section-heading"><div><p className="eyebrow">03 / Selected work</p><h2>Things I&apos;ve been <em>building lately.</em></h2></div><a className="text-link" href="https://github.com/alsabbir128" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight /></a></div>
          <Project title="FitLog" year="2026" label="Featured project" description="An interactive workout library and training log for planning better sessions and tracking progress in the moment." features={["Responsive workout library with smart sorting", "Live plan metrics and five-lift workflow", "Polished UX with persistent saved tabs"]} tags={["Next.js", "React", "TypeScript", "Tailwind CSS"]} demo="https://fitloglibrarya6.vercel.app/" repo="https://github.com/alsabbir128/FitLog-workout-library_A-6" preview="fitness" />
          <Project title="Dev Stack" year="2025" label="Recent build" description="An interactive technology stack builder for exploring modern tools, comparing options, and creating a custom stack." features={["Browse frontend, backend, database and tools", "Add, remove or reset technologies in real time", "Responsive experience with clear feedback"]} tags={["React", "TypeScript", "Tailwind CSS"]} demo="https://dev-stack-programming-hero-a-5.vercel.app/" repo="https://github.com/alsabbir128/DEV-Stack_Programming-hero-A-5" preview="stack" />
        </div></section>

        <section id="services" className="section"><div className="content-container"><div className="section-heading"><div><p className="eyebrow">04 / What I do</p><h2>From blank canvas to <em>built &amp; shipped.</em></h2></div></div><div className="services-grid"><article><span>01</span><MonitorSmartphone /><h3>Web development</h3><p>Fast, responsive web applications built with modern React, Next.js, and TypeScript.</p></article><article><span>02</span><Palette /><h3>UI / UX &amp; web design</h3><p>Clean visual systems with strong attention to hierarchy, responsiveness, and experience.</p></article><article><span>03</span><Database /><h3>Application architecture</h3><p>Thoughtful logic, storage integration, and scalable workflows that stay easy to evolve.</p></article></div></div></section>

        <section id="contact" className="section contact-section"><div className="content-container contact-grid"><div><p className="eyebrow">05 / Start a conversation</p><h2>Let&apos;s build something <em>great together.</em></h2><p>Have a project, an idea, or just want to say hello? My inbox is always open.</p><div className="contact-links"><a href="mailto:abdullahals128@gmail.com"><Mail /> abdullahals128@gmail.com</a><a href="https://linkedin.com/in/abdullah-al-sabbir-54b05b294" target="_blank" rel="noreferrer">LinkedIn profile <ArrowUpRight /></a></div></div><form className="contact-form" onSubmit={handleSubmit}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@example.com" /></label><label>Subject<input required name="subject" placeholder="What&apos;s on your mind?" /></label><label>Message<textarea required name="message" rows={4} placeholder="Tell me a little about it..." /></label><Button type="submit">Open email draft <Send /></Button></form></div></section>
        <footer className="site-footer content-container"><a href="#home" className="footer-brand">alsabbir<span>.dev</span></a><p>© 2026 Abdullah Al Sabbir. Designed &amp; built with intention.</p><a href="#home" aria-label="Back to top">Back to top ↑</a></footer>
      </main>
    </div>
  );
}

function Project({ title, year, label, description, features, tags, demo, repo, preview }: { title: string; year: string; label: string; description: string; features: string[]; tags: string[]; demo: string; repo: string; preview: "fitness" | "stack" }) {
  return <article className="project-feature"><div className={`project-visual ${preview}`}><div className="project-window"><div className="window-bar"><i /><i /><i /><span>{preview === "fitness" ? "fitlog / dashboard" : "dev stack / builder"}</span></div><div className="window-content"><small>{preview === "fitness" ? "GOOD MORNING, ABDULLAH" : "YOUR DEVELOPMENT TOOLKIT"}</small><strong>{preview === "fitness" ? "Ready to move?" : "Build a stack that fits."}</strong><div className="window-metrics"><div><span>{preview === "fitness" ? "68%" : "12"}</span><small>{preview === "fitness" ? "WEEKLY GOAL" : "TOOLS SAVED"}</small></div><div className="window-bars"><i /><i /><i /><i /><i /><i /><i /></div></div><div className="window-chip"><Check size={12} /> {preview === "fitness" ? "Today's plan" : "Stack saved"}</div></div></div></div><div className="project-details"><div className="project-kicker"><span>{label}</span><span>{year}</span></div><h3>{title}</h3><p>{description}</p><ul>{features.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul><div className="tag-list">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><Button asChild><a href={demo} target="_blank" rel="noreferrer">Live demo <ExternalLink /></a></Button><Button variant="outline" asChild><a href={repo} target="_blank" rel="noreferrer"><GitBranch /> Repository</a></Button></div></div></article>;
}
