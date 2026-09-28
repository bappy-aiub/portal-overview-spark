export type ProjectStatus = "live" | "idle";

export type Project = {
  /** Two-digit index shown in the card corner. */
  index: string;
  name: string;
  /** One line describing what the system does. */
  blurb: string;
  /** The figure shown in the card footer. */
  metric: string;
  status: ProjectStatus;
  /** Where the card sends you. Swap these for your real project URLs. */
  href: string;
};

/**
 * The eight ERP project links, in the order they appear on the console.
 * Replace each `href` with the live URL for that project.
 */
export const projects: Project[] = [
  {
    index: "01",
    name: "Asset Reckoner",
    blurb: "Depreciation schedules & net book value across the fleet.",
    metric: "142 records",
    status: "live",
    href: "https://asset-reckoner.example.com",
  },
  {
    index: "02",
    name: "Repair Tracker",
    blurb: "Work orders, SLA timers and technician dispatch routing.",
    metric: "31 open",
    status: "live",
    href: "https://repair-tracker.example.com",
  },
  {
    index: "03",
    name: "Asset Infinity",
    blurb: "Perpetual inventory with real-time stock reconciliation.",
    metric: "1,208 SKUs",
    status: "live",
    href: "https://asset-infinity.example.com",
  },
  {
    index: "04",
    name: "Cloud Stationery",
    blurb: "Office supply requisitions and vendor purchase ordering.",
    metric: "6 POs",
    status: "idle",
    href: "https://cloud-stationery.example.com",
  },
  {
    index: "05",
    name: "eDistributor",
    blurb: "B2B order flow from quotation through to delivery proof.",
    metric: "89 orders",
    status: "live",
    href: "https://edistributor.example.com",
  },
  {
    index: "06",
    name: "Circular Curetor",
    blurb: "Return, refurbishment and circular-resale pipeline.",
    metric: "27 units",
    status: "live",
    href: "https://circular-curetor.example.com",
  },
  {
    index: "07",
    name: "Fex Responder",
    blurb: "Field escalation queue with live SLA countdown.",
    metric: "4 priority",
    status: "idle",
    href: "https://fex-responder.example.com",
  },
  {
    index: "08",
    name: "Bills 360",
    blurb: "AP / AR ledger, reconciliations and settlement history.",
    metric: "512 bills",
    status: "live",
    href: "https://bills-360.example.com",
  },
];
