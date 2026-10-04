import {
  Boxes,
  Cloud,
  FileText,
  Infinity as InfinityIcon,
  LayoutGrid,
  RefreshCcw,
  ShoppingCart,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons per module, keyed by card name (the database rows in Lovable Cloud
 * are the source of truth for the card list).
 */
export const PROJECT_ICONS: Record<string, LucideIcon> = {
  "Asset Reckoner": InfinityIcon,
  "Repair Tracker": Wrench,
  "Asset Infinity": Boxes,
  "Cloud Stationery": Cloud,
  eDistributor: ShoppingCart,
  "Circular Curetor": RefreshCcw,
  "Fex Responder": Zap,
  "Bills 360": FileText,
};

/** Fallback icon for cards added later from the dashboard. */
export const DEFAULT_ICON = LayoutGrid;
