# gabrieljohnsolomon

Personal portfolio for Gabriel John Solomon — aspiring Machine Learning Engineer and
student leader at the University of the East – Caloocan. Built with [Astro](https://astro.build).

Live sections on the home page: hero, about, featured GitHub work, certifications, and
tech stack.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |
| `npm run astro check` | Type-check `.astro` and `.ts` files      |

## Project structure

```text
src/
├── components/
│   ├── Section.astro         shared section shell (eyebrow + heading + panel)
│   ├── RepoCard.astro        one featured repository card
│   ├── FeaturedRepos.astro   the featured-work grid
│   ├── Certifications.astro  certifications grid with placeholder slots
│   └── TechStack.astro       categorized tech stack
├── data/
│   ├── featured.ts           which repos to feature, and their copy
│   ├── tech.ts               tech stack categories, icons and brand colors
│   └── certifications.ts     certifications (currently empty)
├── layouts/Layout.astro      shell: dock nav, theme toggle, star canvas, SEO meta
├── lib/github.ts             build-time GitHub metadata fetching
└── pages/                    index, projects, exp, resume
public/icons/                 brand SVGs, drawn as CSS masks so they recolor
```

## Editing content

Most updates are one-line changes in `src/data/` — no markup edits needed.

**Add a certification.** Append an object to `certifications` in
`src/data/certifications.ts`:

```ts
{
  name: 'AWS Certified Cloud Practitioner',
  issuer: 'Amazon Web Services',
  date: 'March 2026',
  credentialUrl: 'https://www.credly.com/badges/...',  // optional
  image: '/certs/aws-ccp.png',                          // optional
}
```

While there are fewer than `PLACEHOLDER_SLOTS` (3) entries, the grid fills the remainder
with dashed "coming soon" slots, so the section never looks broken.

**Feature a different repository.** Edit `featuredRepos` in `src/data/featured.ts`. `slug`
must match the repository name on GitHub exactly; `title` and `blurb` are authored locally
because most repos have no description upstream.

**Add a tool to the tech stack.** Drop `<name>.svg` into `public/icons/` (monochrome,
single path, `viewBox="0 0 24 24"` — [Simple Icons](https://simpleicons.org) works as-is),
then add an entry to the relevant category in `src/data/tech.ts`.

## How the GitHub section works

`src/lib/github.ts` fetches repository metadata (language mix, last push, stars) **at build
time**, not in the browser. Unauthenticated GitHub allows 60 requests/hour per IP, so
fetching client-side would rate-limit real visitors.

Every request is failure-tolerant: if GitHub is unreachable or rate-limiting, the fetch
returns `null`, a warning is logged, and cards fall back to the locally authored copy in
`src/data/featured.ts`. **A failed fetch never fails the build.** The trade-off is that
stats go stale until the next deploy.

To raise the rate limit on CI, set `GITHUB_TOKEN` in the environment. It is optional —
builds work without it.
