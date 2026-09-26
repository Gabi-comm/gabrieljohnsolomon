/**
 * Build-time GitHub metadata.
 *
 * This runs during `astro build`, not in the visitor's browser. Unauthenticated
 * GitHub allows 60 requests/hour *per IP*, so fetching client-side would rate-limit
 * real visitors sitting behind a shared connection. The trade-off is that numbers go
 * stale until the next deploy, which is fine here — the useful signal is the language
 * mix and recency, not the star count.
 *
 * Every function in this module is failure-tolerant on purpose: if GitHub is down,
 * rate-limiting, or the repo was renamed, we return `null` and the card falls back to
 * the locally authored copy in `src/data/featured.ts`. A portfolio that deploys with
 * slightly less detail beats a build that fails.
 *
 * Set `GITHUB_TOKEN` in the environment (or a local `.env`) to raise the rate limit
 * on CI. It is optional — builds work without it.
 */
import { GITHUB_USER } from '../data/featured';

export interface RepoMeta {
	/** Canonical repo URL. */
	url: string;
	/** Upstream description, if the repo has one. */
	description: string | null;
	stars: number;
	forks: number;
	/** ISO timestamp of the last push. */
	pushedAt: string | null;
	/** Language names ordered by bytes, most-used first. */
	languages: string[];
	isFork: boolean;
	/** True when GitHub reports the repo has no commits yet. */
	isEmpty: boolean;
}

const API = 'https://api.github.com';

/** One network round-trip per repo per build, even if a repo is referenced twice. */
const cache = new Map<string, RepoMeta | null>();

function headers(): Record<string, string> {
	const h: Record<string, string> = {
		Accept: 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		// GitHub rejects API requests without a User-Agent.
		'User-Agent': `${GITHUB_USER}-portfolio-build`,
	};
	const token = import.meta.env.GITHUB_TOKEN;
	if (token) h.Authorization = `Bearer ${token}`;
	return h;
}

async function getJson(path: string): Promise<unknown | null> {
	try {
		const res = await fetch(`${API}${path}`, { headers: headers() });
		if (!res.ok) {
			// 404 on /contents just means "empty repo", which callers handle; anything
			// else is worth a line in the build log.
			console.warn(`[github] ${res.status} ${res.statusText} for ${path}`);
			return null;
		}
		return await res.json();
	} catch (err) {
		console.warn(`[github] request failed for ${path}:`, err instanceof Error ? err.message : err);
		return null;
	}
}

/**
 * Fetch metadata for one repository. Returns `null` if it could not be read for any
 * reason — callers must render from local data in that case.
 */
export async function fetchRepo(slug: string): Promise<RepoMeta | null> {
	if (cache.has(slug)) return cache.get(slug) ?? null;

	const repo = (await getJson(`/repos/${GITHUB_USER}/${slug}`)) as Record<string, any> | null;
	if (!repo) {
		cache.set(slug, null);
		return null;
	}

	const langs = (await getJson(`/repos/${GITHUB_USER}/${slug}/languages`)) as Record<
		string,
		number
	> | null;

	const languages = langs
		? Object.entries(langs)
				.sort((a, b) => b[1] - a[1])
				.map(([name]) => name)
		: repo.language
			? [repo.language as string]
			: [];

	const meta: RepoMeta = {
		url: (repo.html_url as string) ?? `https://github.com/${GITHUB_USER}/${slug}`,
		description: (repo.description as string | null) ?? null,
		stars: (repo.stargazers_count as number) ?? 0,
		forks: (repo.forks_count as number) ?? 0,
		pushedAt: (repo.pushed_at as string | null) ?? null,
		languages,
		isFork: Boolean(repo.fork),
		// A repo with no commits reports size 0 and no language at all.
		isEmpty: languages.length === 0 && !repo.language,
	};

	cache.set(slug, meta);
	return meta;
}

/** Fetch several repos concurrently. Order matches the input. */
export function fetchRepos(slugs: string[]): Promise<(RepoMeta | null)[]> {
	return Promise.all(slugs.map(fetchRepo));
}

/**
 * "3 months ago" style label for the last push. Returns `null` for missing input so
 * the card can simply omit the line.
 */
export function relativeDate(iso: string | null): string | null {
	if (!iso) return null;
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return null;

	const days = Math.floor((Date.now() - then) / 86_400_000);
	if (days < 1) return 'today';
	if (days < 2) return 'yesterday';
	if (days < 30) return `${days} days ago`;

	const months = Math.floor(days / 30);
	if (months < 12) return months === 1 ? 'last month' : `${months} months ago`;

	const years = Math.floor(days / 365);
	return years === 1 ? 'last year' : `${years} years ago`;
}
