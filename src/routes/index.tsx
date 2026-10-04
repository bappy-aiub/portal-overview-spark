import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  Clock,
  Layers,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

import { projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ERP Suite — One Platform. Complete Solutions." },
      {
        name: "description",
        content:
          "Access your integrated business solutions from one central platform: Asset Reckoner, Repair Tracker, Asset Infinity, Cloud Stationery, eDistributor, Circular Curetor, Fex Responder and Bills 360.",
      },
      { property: "og:title", content: "ERP Suite — One Platform. Complete Solutions." },
      {
        property: "og:description",
        content:
          "Access your integrated business solutions from one central platform. Choose a software below to get started.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-studio min-h-screen font-sans text-ink">
      {/* Navy header */}
      <header className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <Layers className="size-5" />
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-none tracking-wide">
                ERP SUITE
              </p>
              <p className="mt-1 hidden text-xs text-white/70 sm:block">
                One Platform. Complete Solutions.
              </p>
            </div>
          </div>
          <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15 transition-colors hover:bg-white/15">
            <CircleUserRound className="size-4" />
            Welcome, Admin
            <ChevronDown className="size-4 opacity-70" />
          </button>
        </div>
      </header>

      {/* Welcome band */}
      <section className="mx-auto max-w-7xl px-6 pt-14 text-center md:px-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Welcome to ERP Suite
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-navy" />
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-mute md:text-base">
          Access your integrated business solutions from one central platform.
          Choose a software below to get started.
        </p>
      </section>

      {/* Module cards */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} delay={i * 55} />
          ))}
        </div>
      </main>

      {/* Feature strip */}
      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-8">
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-card p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={ShieldCheck}
            title="Secure"
            text="Enterprise-grade security to protect your data"
          />
          <Feature
            icon={Rocket}
            title="Scalable"
            text="Built to scale with your business growth"
          />
          <Feature
            icon={Clock}
            title="Real-time"
            text="Get real-time insights and stay ahead"
          />
          <Feature
            icon={Users}
            title="Reliable"
            text="Reliable system with high availability"
          />
        </div>
      </section>

      <footer className="pb-10 text-center text-xs text-mute">
        © 2026 ERP Suite. All rights reserved.
      </footer>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const Icon = project.icon;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="panel-rise group flex flex-col items-center rounded-2xl bg-card px-6 py-8 text-center shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="grid size-16 place-items-center rounded-full"
        style={{ backgroundColor: project.tintSoft, color: project.tint }}
      >
        <Icon className="size-7" />
      </div>

      <h3 className="mt-5 font-display text-lg font-bold">{project.name}</h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-mute">
        {project.blurb}
      </p>

      <span
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-transform group-hover:gap-3"
        style={{ backgroundColor: project.tintSoft, color: project.tint }}
      >
        Open
        <ArrowRight className="size-4" />
      </span>
    </a>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-navy/10 text-navy">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-sm font-bold text-navy">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-mute">{text}</p>
      </div>
    </div>
  );
}
