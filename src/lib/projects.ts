import {
  Boxes,
  Wrench,
  Infinity as InfinityIcon,
  Cloud,
  ShoppingCart,
  RefreshCcw,
  Zap,
  FileText,
  type LucideIcon,
} from "lucide-react";

export type Project = {
  name: string;
  /** One line describing what the system does. */
  blurb: string;
  icon: LucideIcon;
  /** Pastel badge + button tint for this module (oklch). */
  tint: string;
  tintSoft: string;
  /** Where the card sends you. Swap these for your real project URLs. */
  href: string;
};

/**
 * The eight ERP project links, in the order they appear on the console.
 * Replace each `href` with the live URL for that project.
 */
export const projects: Project[] = [
  {
    name: "Asset Reckoner",
    blurb: "Manage fixed assets from acquisition to disposal efficiently.",
    icon: InfinityIcon,
    tint: "oklch(0.55 0.2 262)",
    tintSoft: "oklch(0.94 0.04 262)",
    href: "https://asset-reckoner.example.com",
  },
  {
    name: "Repair Tracker",
    blurb: "Track repair requests, maintenance and service workflows.",
    icon: Wrench,
    tint: "oklch(0.6 0.17 155)",
    tintSoft: "oklch(0.94 0.05 155)",
    href: "https://repair-tracker.example.com",
  },
  {
    name: "Asset Infinity",
    blurb: "Perpetual inventory with real-time stock reconciliation.",
    icon: Boxes,
    tint: "oklch(0.5 0.18 290)",
    tintSoft: "oklch(0.94 0.04 290)",
    href: "https://asset-infinity.example.com",
  },
  {
    name: "Cloud Stationery",
    blurb: "Manage stationery inventory and requests digitally.",
    icon: Cloud,
    tint: "oklch(0.7 0.15 70)",
    tintSoft: "oklch(0.95 0.05 85)",
    href: "https://cloud-stationery.example.com",
  },
  {
    name: "eDistributor",
    blurb: "Manage distributors, orders, deliveries and performance.",
    icon: ShoppingCart,
    tint: "oklch(0.5 0.2 300)",
    tintSoft: "oklch(0.94 0.04 300)",
    href: "https://edistributor.example.com",
  },
  {
    name: "Circular Curetor",
    blurb: "Create, manage and distribute circulars efficiently.",
    icon: RefreshCcw,
    tint: "oklch(0.65 0.13 200)",
    tintSoft: "oklch(0.94 0.04 200)",
    href: "https://circular-curetor.example.com",
  },
  {
    name: "Fex Responder",
    blurb: "Field escalation queue with live SLA countdown.",
    icon: Zap,
    tint: "oklch(0.6 0.2 350)",
    tintSoft: "oklch(0.95 0.04 350)",
    href: "https://fex-responder.example.com",
  },
  {
    name: "Bills 360",
    blurb: "Bill management, approval workflow and payment tracking.",
    icon: FileText,
    tint: "oklch(0.75 0.13 90)",
    tintSoft: "oklch(0.96 0.05 95)",
    href: "https://bills-360.example.com",
  },
];
