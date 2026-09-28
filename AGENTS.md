<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Project links live in `src/lib/projects.ts` as one typed array; the dashboard maps over it. Add or reorder modules there so card order stays the single source of truth.
- Colors come only from the oklch tokens in `src/styles.css` (navy, page, ink, mute, line). Components use semantic classes — never hex or `bg-white`/`text-black` utilities. Per-module pastel tints live on each entry in `src/lib/projects.ts` and are applied via inline style.

