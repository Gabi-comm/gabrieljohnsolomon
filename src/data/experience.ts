/**
 * Experience, awards and affiliations.
 *
 * Sourced from Gabriel's own résumé (`public/Resume-SOLOMON.pdf`). Contact details and the
 * character references in that document are deliberately NOT reproduced here — the
 * site is public.
 *
 * Dates are only filled in where the résumé actually states them; the rest are left
 * blank rather than guessed. Set `period` on any entry and it renders automatically.
 */
export type ExperienceKind = 'professional' | 'leadership';

export interface Experience {
	role: string;
	org: string;
	/** Which timeline group the role sits in. */
	kind: ExperienceKind;
	/** Free text, e.g. '2026'. Rendered only when set. */
	period?: string;
	/** Fills the timeline marker and adds an "Active" status. */
	current?: boolean;
	/** One-line summary, always shown. */
	description: string;
	/** Optional concrete achievements, rendered as a list under the summary. */
	bullets?: string[];
	/** Optional skill tags for the role. */
	tags?: string[];
	/** Full-colour logo in `public/logos/`, shown as the timeline avatar. */
	logo?: string;
	/**
	 * For square, edge-to-edge marks (like Gabriel's own "G."), which a circle would
	 * crop: shows the logo inset on a white disc instead of filling the avatar.
	 */
	logoInset?: boolean;
	/** Monogram when no logo exists. */
	initials?: string;
	/** Optional link for the organisation or the work itself. */
	url?: string;
}

export interface Organization {
	name: string;
	role: string;
	/** Full-colour logo in `public/logos/`, rendered as an <img>. */
	logo?: string;
	/** Fallback monogram when no logo could be sourced. */
	initials?: string;
}

export interface Award {
	/** The result, set large: 'Best Research Paper', 'Top 10 Finalist'. */
	result: string;
	/** The event it was earned at. */
	event: string;
	year?: string;
}

export interface Competition {
	name: string;
	/** Category or organiser, shown muted under the name. */
	detail?: string;
	/** One or more editions taken part in, newest last. */
	years?: string[];
}

export interface Highlight {
	/** The headline fact, kept short — it is set in large type. */
	label: string;
	detail: string;
}

export const KIND_LABEL: Record<ExperienceKind, string> = {
	professional: 'Professional',
	leadership: 'Leadership & community',
};

/** Roles and engagements, most substantial first within each kind. */
export const experiences: Experience[] = [
	{
		role: 'AI Security Intern',
		org: 'RivanAI Cybersecurity Inc.',
		kind: 'professional',
		period: 'May 2026',
		current: true,
		logo: '/logos/rivan.png',
		description:
			'Project-based internship securing large language model applications across data pipelines, training and inference.',
		bullets: [
			'Engineered and ran adversarial simulations — direct and indirect prompt injection and data-poisoning vectors — to surface vulnerabilities in LLM applications.',
			'Supported secure LLM development and deployment with technical safeguards across hybrid infrastructure.',
			'Built controlled ransomware-behaviour simulations for SOC training to strengthen incident-response readiness.',
		],
		tags: ['LLM Security', 'Prompt Injection', 'Data Poisoning', 'SOC'],
	},
	{
		role: 'Freelance Developer',
		org: 'Self-employed · Client projects',
		kind: 'professional',
		period: 'Oct 2026',
		current: true,
		logo: '/logo.png',
		logoInset: true,
		description: 'Designs and ships AI-powered web apps for clients, from first sketch to deployed product.',
		bullets: [
			'Built Nibble for SOLIDSTRUK: turns a floor plan into a SketchUp-style 3D model, then AI-rendered visualizations, then a cinematic walkthrough, with a client-approval gate between every step.',
			'Kept the geometry deterministic: the plan is structured data, so the AI only adds materials and light and never invents walls or rooms.',
		],
		tags: ['Next.js', 'Three.js', 'Gemini', 'Generative AI'],
	},
	{
		role: 'President',
		org: 'Association of Computer Studies Students — UE Caloocan',
		kind: 'leadership',
		period: 'Jun 2025',
		current: true,
		logo: '/logos/acss.png',
		description: 'Leads technical initiatives and programmes for the computer studies student body.',
	},
	{
		role: 'Vice President',
		org: 'AWS Learning Club — UE Caloocan',
		kind: 'leadership',
		period: 'Jun 2026',
		current: true,
		logo: '/logos/aws-learning-club.png',
		description:
			'Helps lead the campus cloud community, organising sessions that get students hands-on with AWS services and cloud fundamentals.',
	},
	{
		role: 'Data Analyst',
		org: 'AWS Cloud Club Philippines',
		kind: 'leadership',
		period: 'Dec 2025',
		current: true,
		logo: '/logos/aws-cloud-club.png',
		description:
			'Turns community and programme data into reporting that shapes how the national cloud club plans and measures its events.',
	},
	{
		role: 'Ambassador',
		org: 'AWS User Group e:Novators Philippines',
		kind: 'leadership',
		period: 'Feb 2026',
		current: true,
		logo: '/logos/awsug-enovators.png',
		description:
			'Represents the user group in the wider Philippine AWS community, supporting its events and outreach.',
	},
	{
		role: 'Technical Support',
		org: 'Jesus Is Lord Church — Caloocan',
		kind: 'leadership',
		current: true,
		logo: '/logos/jil.png',
		description: 'Provides technical and audiovisual support for services and events.',
	},
	{
		role: 'Member',
		org: 'Quantum Computing Society of the Philippines',
		kind: 'leadership',
		current: true,
		logo: '/logos/qcsp.png',
		description:
			'Part of the national quantum computing community, joining its sessions on quantum natural language processing (QNLP) and quantum science outreach.',
	},
	// ---- Completed roles ----
	{
		role: 'Vice-Chief Operations Officer',
		org: 'AWS Learning Club — UE Caloocan',
		kind: 'leadership',
		period: 'Jun 2025 – Jun 2026',
		logo: '/logos/aws-learning-club.png',
		description:
			'Ran day-to-day operations for the campus cloud community, coordinating its events and programme delivery.',
	},
	{
		role: 'Data Science Lead',
		org: 'Google Developer Student Club — UE Caloocan',
		kind: 'leadership',
		period: 'Aug 2024 – Dec 2024',
		logo: '/logos/gdsc.png',
		description:
			'Led the data science track for the campus GDSC chapter, running sessions on practical analysis and modelling.',
	},
];

/**
 * Honors and recognition, newest first. Aligned to LinkedIn's Honors & awards
 * section; the PJDSC and AWS Community Day entries come from the résumé only.
 */
export const awards: Award[] = [
	{ result: 'Best Research Paper', event: 'Technify 2026 · Computer Science', year: '2026' },
	{ result: 'Best Pitch Presentation', event: 'Technify 2026 · Computer Science', year: '2026' },
	{
		result: '2nd Place, Student Choice Award',
		event: 'University of the East – Caloocan · Computer Science',
		year: '2026',
	},
	{
		result: 'Exemplary Academic Performance',
		event: 'University of the East – Caloocan',
		year: 'Since Aug 2024',
	},
	{
		result: 'Top 10 Finalist',
		event: 'Zero Vector Ventures: Build Nothing, Prove Everything Hackathon',
		year: '2026',
	},
	{ result: 'Top 10 Finalist', event: 'Sparkfest: GDG PUP Hackathon', year: '2026' },
	{ result: 'Semifinalist', event: 'CodeChum National Programming Challenge', year: '2025' },
	{ result: 'Top 7', event: 'DevCon Manila Game-On', year: '2025' },
	{ result: 'Judge & Mentor', event: 'Caffeine AI Manila Hackathon', year: '2025' },
	{ result: 'Top 10 Finalist', event: 'Philippine Junior Data Science Challenge', year: '2024' },
	{ result: 'Event Co-Organizer', event: 'AWS Community Day Manila' },
];

/** Hackathons and competitions taken part in, newest first. */
export const competitions: Competition[] = [
	{
		name: 'UMak IT Olympics',
		detail: 'Mobile Application · Game Development Category',
		years: ['2027'],
	},
	{ name: 'Philippine Junior Data Science Challenge', years: ['2025', '2026', '2027'] },
	{
		name: 'UMak IT Olympics',
		detail: 'Mobile Application · Productivity Category',
		years: ['2026'],
	},
	{ name: 'Global Game Jam', years: ['2026'] },
	{ name: 'CodeKada: The Innovation Hackathon' },
	{ name: 'Copilot for Microsoft 365 Innovation Challenge', detail: 'by KPMG' },
];

/**
 * Memberships that have no role on the timeline. Orgs already shown as a timeline
 * entry are not repeated here.
 */
export const organizations: Organization[] = [];

/** Stand-out facts, shown as large-type stat cards. */
export const highlights: Highlight[] = [
	{ label: '1.04 GPA', detail: 'University Full Scholar · Latin Honor standing' },
	{ label: 'Best Paper', detail: 'Technify 2026 · Computer Science' },
	{ label: '8 roles', detail: 'Active at once across industry and community' },
];
