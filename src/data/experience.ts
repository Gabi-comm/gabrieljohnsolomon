/**
 * Experience, awards and affiliations shown on the home page.
 *
 * Sourced from Gabriel's own résumé (`public/SOLOMON.pdf`). Contact details and the
 * character references in that document are deliberately NOT reproduced here — the
 * site is public.
 *
 * Dates are only filled in where the résumé actually states them; the rest are left
 * blank rather than guessed. Set `period` on any entry and it renders automatically.
 */
export interface Experience {
	role: string;
	org: string;
	/** Free text, e.g. '2026'. Rendered only when set. */
	period?: string;
	/** Adds a "Current" badge and a filled timeline marker. */
	current?: boolean;
	description: string;
	/** Optional link for the organisation or the work itself. */
	url?: string;
}

export interface Organization {
	name: string;
	role: string;
}

export interface Highlight {
	/** The headline fact, kept short — it is set in large type. */
	label: string;
	detail: string;
}

/** Roles and engagements, most substantial first. */
export const experiences: Experience[] = [
	{
		role: 'AI Security Intern',
		org: 'RivanAI Cybersecurity Inc.',
		// Résumé gives the start year; the internship is ongoing.
		period: '2026 – Present',
		current: true,
		description:
			'Ran adversarial simulations against large language models — direct and indirect prompt injection, data poisoning — and built the safeguards to mitigate them across data pipelines, training and inference. Also developed ransomware executables for realistic threat modelling of the organisation’s incident response.',
	},
	{
		role: 'President',
		org: 'Association of Computer Studies Students — UE Caloocan',
		current: true,
		description:
			'Leads technical initiatives and programmes for the computer studies student body.',
	},
	{
		// Current role at the club. Listed above the completed VCOO term below, so the
		// two read as a progression.
		role: 'Vice President',
		org: 'AWS Learning Club — UE Caloocan',
		current: true,
		description:
			'Helps lead the campus cloud community, organising sessions that get students hands-on with AWS services and cloud fundamentals.',
	},
	{
		role: 'Vice-Chief Operation Officer',
		org: 'AWS Learning Club — UE Caloocan',
		description:
			'Completed a term running day-to-day operations for the club, coordinating its events and programme delivery.',
	},
	{
		role: 'Data Analyst',
		org: 'AWS Cloud Club Philippines',
		current: true,
		description:
			'Turns community and programme data into reporting that informs how the national cloud club plans and measures its events.',
	},
	{
		role: 'Data Science Lead',
		org: 'Google Developer Student Club — UE Caloocan',
		description:
			'Led the data science track for the campus GDSC chapter, running sessions on practical analysis and modelling.',
	},
	{
		role: 'Ambassador',
		org: 'AWS User Group e:Novators Philippines',
		current: true,
		description:
			'Represents the user group in the wider Philippine AWS community, supporting its events and outreach.',
	},
];

/** Competition results and recognition, from the résumé's awards line. */
export const awards: string[] = [
	'Philippine Junior Data Science Challenge 2024 — Top 10 Finalist',
	'CodeChum National Programming Challenge 2025 — Semifinalist',
	'Caffeine AI Manila Hackathon — Judge & Mentor',
	'Devcon Game Jam — Top 8',
	'AWS Community Day Manila — Event Co-Organizer',
];

/** Standing affiliations, shown as a compact row beneath the timeline. */
export const organizations: Organization[] = [
	{ name: 'ACSS UE–Caloocan', role: 'President' },
	{ name: 'AWS Learning Club UE–C', role: 'Vice President' },
	{ name: 'AWS Cloud Club Philippines', role: 'Data Analyst' },
	{ name: 'GDSC UE–Caloocan', role: 'Data Science Lead' },
	{ name: 'AWS UG e:Novators PH', role: 'Ambassador' },
	{ name: 'Quantum Computing Society of the Philippines', role: 'Member' },
	{ name: 'Jesus Is Lord — Caloocan', role: 'Technical Support' },
];

/** Stand-out facts, shown as large-type stat cards. */
export const highlights: Highlight[] = [
	{
		label: 'Full Scholar',
		detail: 'University Full Scholar · GPA 1.04/1.00 · Latin Honor standing',
	},
	{ label: 'Top 10', detail: 'Philippine Junior Data Science Challenge 2024' },
	{ label: '7 orgs', detail: 'Leadership and community roles held' },
];
