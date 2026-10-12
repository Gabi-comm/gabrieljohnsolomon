/**
 * Experience, awards and affiliations shown on the home page.
 *
 * Sourced from Gabriel's own résumé (`public/Resume-SOLOMON.pdf`). Contact details and the
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
	/**
	 * Monochrome SVG basename in `public/icons/`, drawn as a CSS mask so it takes the
	 * surrounding text colour and works in both themes. Used for the parent-brand
	 * marks (AWS, Google) of officially affiliated programmes.
	 */
	icon?: string;
	/** Full-colour logo in `public/logos/`, rendered as an <img>. */
	logo?: string;
	/**
	 * Fallback monogram when no logo could be sourced. These orgs publish their
	 * branding only on Facebook, which blocks automated fetching — drop a file into
	 * `public/logos/` and set `logo` to replace the monogram.
	 */
	initials?: string;
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
		period: '2026',
		current: true,
		description:
			'Engineered and ran advanced adversarial simulations — direct and indirect prompt injection and data-poisoning vectors — to proactively surface vulnerabilities in LLM applications. Supported secure LLM development and deployment with technical safeguards across data pipelines, training and inference, and built controlled ransomware-behaviour simulations for SOC training to strengthen defensive posture and incident-response readiness.',
	},
	{
		role: 'President',
		org: 'Association of Computer Studies Students — UE Caloocan',
		current: true,
		description:
			'Leads technical initiatives and programmes for the computer studies student body.',
	},
	{
		role: 'Data Science Lead',
		org: 'Google Developer Student Club — UE Caloocan',
		current: true,
		description:
			'Leads the data science track for the campus GDSC chapter, running sessions on practical analysis and modelling.',
	},
	{
		role: 'Vice-Chief Operations Officer',
		org: 'AWS Learning Club — UE Caloocan',
		current: true,
		description:
			'Runs day-to-day operations for the campus cloud community, coordinating sessions that get students hands-on with AWS services and cloud fundamentals.',
	},
	{
		role: 'Data Analyst',
		org: 'AWS Cloud Club Philippines',
		current: true,
		description:
			'Turns community and programme data into reporting that informs how the national cloud club plans and measures its events.',
	},
	{
		role: 'Ambassador',
		org: 'AWS User Group e:Novators Philippines',
		current: true,
		description:
			'Represents the user group in the wider Philippine AWS community, supporting its events and outreach.',
	},
	{
		role: 'Technical Support',
		org: 'Jesus Is Lord Church — Caloocan',
		current: true,
		description:
			'Provides technical and audiovisual support for services and events.',
	},
];

/** Competition results and recognition, from the résumé's awards line. */
export const awards: string[] = [
	'Technify: Technology Innovation Festival 2026 — Best Research Paper, Computer Science Category',
	'Philippine Junior Data Science Challenge 2024 — Top 10 Finalist',
	'CodeChum National Programming Challenge 2025 — Semifinalist',
	'Caffeine AI Manila Hackathon — Judge & Mentor',
	'Devcon Game Jam — Top 8',
	'AWS Community Day Manila — Event Co-Organizer',
];

/** Standing affiliations, shown as a compact row beneath the timeline. */
export const organizations: Organization[] = [
	{ name: 'ACSS UE–Caloocan', role: 'President', logo: '/logos/acss.png' },
	{ name: 'AWS Learning Club UE–C', role: 'Vice-Chief Ops Officer', logo: '/logos/aws-learning-club.png' },
	{ name: 'AWS Cloud Club Philippines', role: 'Data Analyst', logo: '/logos/aws-cloud-club.png' },
	{ name: 'GDSC UE–Caloocan', role: 'Data Science Lead', logo: '/logos/gdsc.png' },
	{ name: 'AWS UG e:Novators PH', role: 'Ambassador', logo: '/logos/awsug-enovators.png' },
	{
		name: 'Quantum Computing Society of the Philippines',
		role: 'Member',
		logo: '/logos/qcsp.png',
	},
	{ name: 'Jesus Is Lord — Caloocan', role: 'Technical Support', logo: '/logos/jil.png' },
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
