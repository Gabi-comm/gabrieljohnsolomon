/**
 * GitHub contribution calendar, fetched at build time.
 *
 * GitHub has no unauthenticated JSON for the contribution graph, but the HTML
 * fragment behind the profile calendar (`/users/<user>/contributions`) is public
 * and carries every day as a cell (`data-date`, `data-level`) plus a tooltip
 * with the exact count. We parse that, so no token is needed.
 *
 * Numbers are as of the last build. Every failure path returns null and the
 * profile section simply leaves the calendar out.
 */

export interface Day {
	date: string; // YYYY-MM-DD
	count: number;
	level: number; // 0–4, GitHub's own quartiles
}

export interface Calendar {
	/** Label for the tab, e.g. "Last year" or "2025". */
	label: string;
	/** Days in date order. */
	days: Day[];
	total: number;
}

export interface ContributionStats {
	today: number;
	yesterday: number;
	thisWeek: number;
	last7: number;
	streak: number;
	thisMonth: number;
	lastMonth: number;
	last30: number;
	last3Months: number;
	lastYear: number;
	asOf: string;
}

const UA = 'Mozilla/5.0 (portfolio build; contribution calendar)';

async function fetchCalendar(user: string, label: string, range?: { from: string; to: string }) {
	const qs = range ? `?from=${range.from}&to=${range.to}` : '';
	try {
		const res = await fetch(`https://github.com/users/${user}/contributions${qs}`, {
			headers: { 'User-Agent': UA, Accept: 'text/html' },
			signal: AbortSignal.timeout(15000),
		});
		if (!res.ok) return null;
		return parse(await res.text(), label);
	} catch {
		return null;
	}
}

function parse(html: string, label: string): Calendar | null {
	const cells = new Map<string, { date: string; level: number }>();
	for (const m of html.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g)) {
		const tag = m[0];
		const date = /data-date="([^"]+)"/.exec(tag)?.[1];
		const id = /id="([^"]+)"/.exec(tag)?.[1];
		const level = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0);
		if (date && id) cells.set(id, { date, level });
	}
	if (cells.size === 0) return null;

	const counts = new Map<string, number>();
	for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)</g)) {
		const n = /^(\d[\d,]*) contribution/.exec(m[2].trim());
		counts.set(m[1], n ? Number(n[1].replace(/,/g, '')) : 0);
	}

	const days = [...cells.entries()]
		.map(([id, c]) => ({ date: c.date, level: c.level, count: counts.get(id) ?? 0 }))
		.sort((a, b) => a.date.localeCompare(b.date));
	return { label, days, total: days.reduce((s, d) => s + d.count, 0) };
}

const addDays = (iso: string, n: number) => {
	const d = new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + n);
	return d.toISOString().slice(0, 10);
};

export function computeStats(cal: Calendar): ContributionStats {
	const byDate = new Map(cal.days.map((d) => [d.date, d.count]));
	// The last cell is "today" in the profile's own timezone.
	const today = cal.days[cal.days.length - 1].date;
	const sumRange = (from: string, to: string) =>
		cal.days.filter((d) => d.date >= from && d.date <= to).reduce((s, d) => s + d.count, 0);

	// Days since Monday (the week used by most contribution-stat cards).
	const weekday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
	const monthStart = `${today.slice(0, 7)}-01`;
	const prevMonthEnd = addDays(monthStart, -1);
	const prevMonthStart = `${prevMonthEnd.slice(0, 7)}-01`;

	// Streak: consecutive days with activity, ending today (or yesterday if today is still empty).
	let streak = 0;
	let cursor = (byDate.get(today) ?? 0) > 0 ? today : addDays(today, -1);
	while ((byDate.get(cursor) ?? 0) > 0) {
		streak++;
		cursor = addDays(cursor, -1);
	}

	return {
		today: byDate.get(today) ?? 0,
		yesterday: byDate.get(addDays(today, -1)) ?? 0,
		thisWeek: sumRange(addDays(today, -weekday), today),
		last7: sumRange(addDays(today, -6), today),
		streak,
		thisMonth: sumRange(monthStart, today),
		lastMonth: sumRange(prevMonthStart, prevMonthEnd),
		last30: sumRange(addDays(today, -29), today),
		last3Months: sumRange(addDays(today, -89), today),
		lastYear: cal.total,
		asOf: today,
	};
}

/**
 * The rolling last-year calendar plus one calendar per year (newest first,
 * back to `sinceYear`), with stats computed from the rolling one.
 */
export async function fetchContributions(user: string, sinceYear: number) {
	const rolling = await fetchCalendar(user, 'Last year');
	if (!rolling) return null;

	const thisYear = Number(rolling.days[rolling.days.length - 1].date.slice(0, 4));
	const years = await Promise.all(
		Array.from({ length: thisYear - sinceYear + 1 }, (_, i) => thisYear - i).map((y) =>
			fetchCalendar(user, String(y), { from: `${y}-01-01`, to: `${y}-12-31` })
		)
	);

	return {
		calendars: [rolling, ...years.filter((c): c is Calendar => c !== null)],
		stats: computeStats(rolling),
	};
}
