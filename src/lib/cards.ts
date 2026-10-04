import { createClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import type { Database } from "@/integrations/supabase/types";

export type Card = {
  id: string;
  name: string;
  href: string;
  blurb: string;
  tint: string;
  tintSoft: string;
};

/** Pastel badge tints offered in the "Add card" form. */
export const CARD_TINTS = [
  { label: "Blue", tint: "oklch(0.55 0.2 262)", tintSoft: "oklch(0.94 0.04 262)" },
  { label: "Green", tint: "oklch(0.6 0.17 155)", tintSoft: "oklch(0.94 0.05 155)" },
  { label: "Purple", tint: "oklch(0.5 0.18 290)", tintSoft: "oklch(0.94 0.04 290)" },
  { label: "Amber", tint: "oklch(0.7 0.15 70)", tintSoft: "oklch(0.95 0.05 85)" },
  { label: "Cyan", tint: "oklch(0.65 0.13 200)", tintSoft: "oklch(0.94 0.04 200)" },
  { label: "Pink", tint: "oklch(0.6 0.2 350)", tintSoft: "oklch(0.95 0.04 350)" },
] as const;

function publicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

type CardRow = {
  id: string;
  name: string;
  href: string;
  blurb: string;
  tint: string;
  tint_soft: string;
};

function toCard(row: CardRow): Card {
  return {
    id: row.id,
    name: row.name,
    href: row.href,
    blurb: row.blurb,
    tint: row.tint,
    tintSoft: row.tint_soft,
  };
}

/** All dashboard cards, in display order. Public read — no session needed. */
export const listCards = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("project_cards")
    .select("id,name,href,blurb,tint,tint_soft")
    .order("position", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map(toCard);
});

export const cardsQuery = queryOptions({
  queryKey: ["project-cards"],
  queryFn: () => listCards(),
});

/** Adds a new card at the end of the dashboard. */
export const addCard = createServerFn({ method: "POST" })
  .validator(
    (input: { name: string; href: string; blurb?: string; tint: string; tintSoft: string }) =>
      input,
  )
  .handler(async ({ data }): Promise<Card> => {
    const supabase = publicClient();

    const { data: last, error: posError } = await supabase
      .from("project_cards")
      .select("position")
      .order("position", { ascending: false })
      .limit(1);
    if (posError) throw new Error(posError.message);
    const position = (last?.[0]?.position ?? 0) + 1;

    const { data: row, error } = await supabase
      .from("project_cards")
      .insert({
        name: data.name.trim(),
        href: data.href.trim(),
        blurb: (data.blurb ?? "").trim(),
        tint: data.tint,
        tint_soft: data.tintSoft,
        position,
      })
      .select("id,name,href,blurb,tint,tint_soft")
      .single();
    if (error) throw new Error(error.message);
    return toCard(row);
  });
