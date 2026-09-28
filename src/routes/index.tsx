import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { projects, type Project } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Operations Console — Vantage ERP" },
      {
        name: "description",
        content:
          "Eight linked project workspaces in one console: Asset Reckoner, Repair Tracker, Asset Infinity, Cloud Stationery, eDistributor, Circular Curetor, Fex Responder and Bills 360.",
      },
      { property: "og:title", content: "Operations Console — Vantage ERP" },
      {
        property: "og:description",
        content:
          "One console, eight project links. Jump straight into any ERP workspace from the service module directory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [syncedAt, setSyncedAt] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }).format(new Date());
    setSyncedAt(format());
    const timer = window.setInterval(() => setSyncedAt(format()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
          <div className="flex items-center gap-4">
            <div className="grid size-9 place-items-center bg-brand font-display text-lg text-brand-foreground">
              V
            </div>
            <div>
              <p className="font-display text-xl leading-none">Vantage ERP</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                Operations Console
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              Modules
            </span>
            <span className="font-mono text-[11px] text-brand">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-end justify-between gap-8 px-6 pb-6 md:px-8">
          <div className="band-rise">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
              / Project Directory
            </p>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
              Service Modules
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mute">
              Eight linked workspaces covering the full lifecycle — from
              requisition through to settlement.
            </p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                Synced
              </p>
              <p className="font-mono text-sm text-brand">
                Today {syncedAt ?? "—"} UTC
              </p>
            </div>
            <span className="size-2 rounded-full bg-sage" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.index}
              project={project}
              delay={i * 55}
            />
          ))}
        </div>
      </main>

      <footer className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-12 md:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          Vantage ERP · v4.2
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
          All systems nominal
        </p>
      </footer>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const isLive = project.status === "live";

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="panel-rise group flex flex-col border border-line bg-paper p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-panel focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/60"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-mute">{project.index}</span>
        <span
          className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide ${
            isLive ? "text-sage" : "text-mute"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${isLive ? "bg-sage" : "bg-mute"}`}
          />
          {isLive ? "Live" : "Idle"}
        </span>
      </div>

      <div className="mt-8 flex-1">
        <h3 className="font-display text-2xl leading-tight">{project.name}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-mute">
          {project.blurb}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4">
        <span className="font-mono text-xs text-ink">{project.metric}</span>
        <span className="font-mono text-xs text-ember transition-transform group-hover:translate-x-1">
          Open →
        </span>
      </div>
    </a>
  );
}
