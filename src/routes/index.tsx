import { useState } from "react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  Clock,
  Layers,
  Loader2,
  Plus,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  addCard,
  cardsQuery,
  CARD_TINTS,
  type Card,
} from "@/lib/cards";
import { DEFAULT_ICON, PROJECT_ICONS } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const { data: cards } = useSuspenseQuery(cardsQuery);

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
          {cards.map((card, i) => (
            <ProjectCard key={card.id} card={card} delay={i * 55} />
          ))}
          <AddCardTile delay={cards.length * 55} />
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

function ProjectCard({ card, delay }: { card: Card; delay: number }) {
  const Icon = PROJECT_ICONS[card.name] ?? DEFAULT_ICON;

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noreferrer"
      className="panel-rise group flex flex-col items-center rounded-2xl bg-card px-6 py-8 text-center shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="grid size-16 place-items-center rounded-full"
        style={{ backgroundColor: card.tintSoft, color: card.tint }}
      >
        <Icon className="size-7" />
      </div>

      <h3 className="mt-5 font-display text-lg font-bold">{card.name}</h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-mute">
        {card.blurb}
      </p>

      <span
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-transform group-hover:gap-3"
        style={{ backgroundColor: card.tintSoft, color: card.tint }}
      >
        Open
        <ArrowRight className="size-4" />
      </span>
    </a>
  );
}

function AddCardTile({ delay }: { delay: number }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [href, setHref] = useState("");
  const [tintIndex, setTintIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-cards"] });
      setOpen(false);
      setName("");
      setHref("");
      setTintIndex(0);
      setError(null);
    },
    onError: (e) =>
      setError(
        e instanceof Error && e.message
          ? e.message
          : "Could not add the card. Please try again.",
      ),
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please enter a card name.");
      return;
    }
    if (!href.trim()) {
      setError("Please enter the web address for this project.");
      return;
    }
    const tint = CARD_TINTS[tintIndex];
    mutation.mutate({
      name: name.trim(),
      href: href.trim(),
      blurb: "",
      tint: tint.tint,
      tintSoft: tint.tintSoft,
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="panel-rise group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line bg-card/60 px-6 py-8 text-center text-mute transition-colors hover:border-navy/40 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
        style={{ animationDelay: `${delay}ms` }}
      >
        <span className="grid size-16 place-items-center rounded-full bg-navy/10">
          <Plus className="size-7" />
        </span>
        <span className="font-display text-lg font-bold">Add Card</span>
        <span className="text-[13px] leading-relaxed">
          Add a new project link to the dashboard
        </span>
      </button>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setError(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add a project card</DialogTitle>
            <DialogDescription>
              The new card appears at the end of the dashboard and adjusts its
              place with the others automatically.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="mt-2 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-name">Card name</Label>
              <Input
                id="card-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Agent Plus"
                maxLength={60}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-link">Web address</Label>
              <Input
                id="card-link"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://agent-plus.example.com"
                type="url"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon color</Label>
              <div className="flex flex-wrap gap-3">
                {CARD_TINTS.map((tint, i) => (
                  <button
                    key={tint.label}
                    type="button"
                    aria-label={tint.label}
                    aria-pressed={tintIndex === i}
                    onClick={() => setTintIndex(i)}
                    className={`grid size-9 place-items-center rounded-full transition-shadow ${
                      tintIndex === i
                        ? "ring-2 ring-navy ring-offset-2"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: tint.tintSoft }}
                  >
                    <span
                      className="size-4 rounded-full"
                      style={{ backgroundColor: tint.tint }}
                    />
                  </button>
                ))}
              </div>
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Adding…
                  </>
                ) : (
                  "Add card"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
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
