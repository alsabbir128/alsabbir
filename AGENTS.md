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

- Keep the portfolio as a single TanStack Start index route with anchored sections, because its navigation is a one-page flow.
- Track the active section from its actual scroll position and hold clicked navigation during smooth scrolling, because intersection ratios can highlight the next section too early.
- Define portfolio visual tokens and responsive layout rules in `src/styles.css`, because consistent theming and breakpoint behavior prevent the source site's fixed-shell gap.
- Keep the contact form as a mailto draft instead of claiming delivery, because no mail service is connected.
