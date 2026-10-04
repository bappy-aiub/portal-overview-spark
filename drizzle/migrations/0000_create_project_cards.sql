CREATE TABLE public.project_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  href text NOT NULL,
  blurb text NOT NULL DEFAULT '',
  tint text NOT NULL,
  tint_soft text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.project_cards TO anon, authenticated;
GRANT ALL ON public.project_cards TO service_role;

ALTER TABLE public.project_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public dashboard can read cards"
  ON public.project_cards FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public dashboard can add cards"
  ON public.project_cards FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

INSERT INTO public.project_cards (name, href, blurb, tint, tint_soft, position) VALUES
  ('Asset Reckoner', 'https://asset-reckoner.example.com', 'Manage fixed assets from acquisition to disposal efficiently.', 'oklch(0.55 0.2 262)', 'oklch(0.94 0.04 262)', 1),
  ('Repair Tracker', 'https://repair-tracker.example.com', 'Track repair requests, maintenance and service workflows.', 'oklch(0.6 0.17 155)', 'oklch(0.94 0.05 155)', 2),
  ('Asset Infinity', 'https://asset-infinity.example.com', 'Perpetual inventory with real-time stock reconciliation.', 'oklch(0.5 0.18 290)', 'oklch(0.94 0.04 290)', 3),
  ('Cloud Stationery', 'https://cloud-stationery.example.com', 'Manage stationery inventory and requests digitally.', 'oklch(0.7 0.15 70)', 'oklch(0.95 0.05 85)', 4),
  ('eDistributor', 'https://edistributor.example.com', 'Manage distributors, orders, deliveries and performance.', 'oklch(0.5 0.2 300)', 'oklch(0.94 0.04 300)', 5),
  ('Circular Curetor', 'https://circular-curetor.example.com', 'Create, manage and distribute circulars efficiently.', 'oklch(0.65 0.13 200)', 'oklch(0.94 0.04 200)', 6),
  ('Fex Responder', 'https://fex-responder.example.com', 'Field escalation queue with live SLA countdown.', 'oklch(0.6 0.2 350)', 'oklch(0.95 0.04 350)', 7),
  ('Bills 360', 'https://bills-360.example.com', 'Bill management, approval workflow and payment tracking.', 'oklch(0.75 0.13 90)', 'oklch(0.96 0.05 95)', 8);
