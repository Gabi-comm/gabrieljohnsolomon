/**
 * Every project shown on the /projects gallery.
 *
 * Unlike `featured.ts` (which pulls live GitHub metadata at build time for the six
 * pinned repos), this list is authored entirely by hand. The projects page is a
 * client-filtered gallery, so it needs stable, offline data — language, year and
 * category — that never depends on a network call or GitHub's 60 req/hour limit.
 *
 * Course forks and class exercises (CCNA, devop, DNS labs, the LLM-engineering
 * course repo, etc.) are deliberately excluded: this is *things Gabriel built*,
 * not a mirror of the whole account. Empty repos are excluded too.
 *
 * To add a project: append an object below. `categories` drives the filter pills;
 * use the shared vocabulary in CATEGORY_ORDER so a new value doesn't create a
 * one-off pill. Keep `blurb` to one or two sentences so cards stay even.
 */

export const GITHUB_USER = 'Gabi-comm';

/** The controlled category vocabulary, in the order the filter pills appear. */
export const CATEGORY_ORDER = [
	'Machine Learning',
	'Computer Vision',
	'Neural Networks',
	'NLP & RAG',
	'AI Agents',
	'Cybersecurity',
	'Cloud & DevOps',
	'Automation',
	'IoT & Digital Twin',
	'Web',
	'Mobile',
] as const;

export type Category = (typeof CATEGORY_ORDER)[number];

export interface Project {
	/** GitHub repo name, exactly as in the URL. */
	slug: string;
	title: string;
	/** One- or two-sentence summary. */
	blurb: string;
	/** Filter categories — most-defining first. */
	categories: Category[];
	/** Short capability tags shown on the card. */
	tags: string[];
	/** Primary language, for the footer dot. */
	language: string;
	/** Year of most recent meaningful work. */
	year: number;
	/** Optional short status chip, e.g. "Thesis", "Hackathon". */
	status?: string;
	/** Optional live/deployed URL. */
	demoUrl?: string;
	/** Pulled out visually at the top of the grid. */
	featured?: boolean;
}

export const projects: Project[] = [
	{
		slug: 'NeuroSymbolic',
		title: 'OASYS — Neurosymbolic Road Assessment',
		blurb:
			'Undergraduate thesis system that grades road damage from a single photo: a neural stage segments the defect, a symbolic fuzzy engine measures it in real-world units and grades severity against DPWH standards — with an auditable trace, not a black box.',
		categories: ['Machine Learning', 'Computer Vision', 'Neural Networks', 'Web'],
		tags: ['YOLOv8', 'Fuzzy Logic', 'FastAPI', 'Next.js', 'Supabase'],
		language: 'TypeScript',
		year: 2026,
		status: 'Thesis',
		featured: true,
	},
	{
		slug: 'Road-Damage-and-Defect-Recognition-Model',
		title: 'Road Damage & Defect Recognition',
		blurb:
			'The deep-learning detector behind OASYS: finds and classifies road defects from street imagery to support data-driven infrastructure maintenance decisions.',
		categories: ['Machine Learning', 'Computer Vision', 'Neural Networks'],
		tags: ['Deep Learning', 'Object Detection', 'Jupyter'],
		language: 'Jupyter Notebook',
		year: 2026,
	},
	{
		slug: 'GOATS',
		title: 'GOATS — Filipino Sign Language to Speech',
		blurb:
			'You sign in front of a webcam, a YOLO model reads the gesture, and the app builds words and reads them aloud — a two-way bridge where the hearing person can type or dictate a reply on the same screen.',
		categories: ['Computer Vision', 'Neural Networks', 'Machine Learning', 'Web'],
		tags: ['YOLO', 'Real-time CV', 'TypeScript', 'Accessibility'],
		language: 'TypeScript',
		year: 2026,
		featured: true,
	},
	{
		slug: 'MAT-AH',
		title: 'MAT-AH — Offline File Finder',
		blurb:
			'One private place to find the files scattered across your laptop in English, Filipino or Taglish. Agents search documents, photos and video by meaning, answer with page citations and tidy folders — fully offline, nothing uploaded.',
		categories: ['AI Agents', 'NLP & RAG', 'Computer Vision', 'Web'],
		tags: ['Ollama', 'CLIP', 'Whisper', 'RAG', 'Local-first'],
		language: 'TypeScript',
		year: 2026,
		featured: true,
	},
	{
		slug: 'Gabo',
		title: 'Gabo — Local Multi-Agent Harness',
		blurb:
			'A web-based harness on the Claude Agent SDK where twelve role agents study, brainstorm and ship together in purpose-built rooms. Runs on a Claude, OpenAI or Gemini key — or a free local model in Ollama.',
		categories: ['AI Agents', 'Web'],
		tags: ['Claude Agent SDK', 'Multi-Agent', 'Ollama', 'TypeScript'],
		language: 'TypeScript',
		year: 2026,
		featured: true,
	},
	{
		slug: 'ARCH---SOLIDSTRUK',
		title: 'Nibble — SOLIDSTRUK Design Flow',
		blurb:
			'Turns a floor plan into a B&W SketchUp-style 3D model, then an AI visualization, then a cinematic walkthrough — with a client-approval gate between each step. The plan is structured data, so the AI only adds materials and light and never invents geometry.',
		categories: ['Machine Learning', 'Computer Vision', 'Web'],
		tags: ['Next.js', 'Three.js', 'Gemini', 'Generative AI'],
		language: 'TypeScript',
		year: 2026,
		status: 'Freelance',
		featured: true,
	},
	{
		slug: 'Network-Log-RAG-Chatbot',
		title: 'Network Log RAG Chatbot',
		blurb:
			'Embeds raw network logs into a ChromaDB vector store so a local Ollama model can query them conversationally, analyse activity and surface security anomalies — a privacy-first RAG pipeline.',
		categories: ['NLP & RAG', 'Cybersecurity', 'Machine Learning'],
		tags: ['RAG', 'ChromaDB', 'Ollama', 'Embeddings'],
		language: 'Python',
		year: 2026,
	},
	{
		slug: 'Naive-RAG-Model-Chatbot',
		title: 'Naive RAG Chatbot',
		blurb:
			'A from-scratch retrieval-augmented chatbot notebook — embeddings, a vector index and grounded answers — built to learn the RAG pipeline end to end.',
		categories: ['NLP & RAG', 'Machine Learning'],
		tags: ['RAG', 'Embeddings', 'Jupyter'],
		language: 'Jupyter Notebook',
		year: 2026,
	},
	{
		slug: 'Rivan-OWASP',
		title: 'Rivan Simulation — LLM Security Labs',
		blurb:
			'Runnable, in-browser labs that teach OWASP-style LLM attacks such as indirect prompt injection against a simulated site — briefing, hands-on simulation and debrief for each track.',
		categories: ['Cybersecurity', 'NLP & RAG', 'Web'],
		tags: ['LLM Security', 'OWASP', 'Prompt Injection', 'React'],
		language: 'JavaScript',
		year: 2026,
	},
	{
		slug: 'Alvin',
		title: 'ALVIN — Building Digital Twin',
		blurb:
			'A human-centered 3D digital twin that scores the real-time comfort of every space in a building from IoT sensor data, and during an emergency routes occupants to the nearest evacuation centre. SparkFest 2026 team entry.',
		categories: ['IoT & Digital Twin', 'Web'],
		tags: ['Digital Twin', 'IoT', 'FastAPI', 'Firestore'],
		language: 'JavaScript',
		year: 2026,
		status: 'Hackathon',
	},
	{
		slug: 'HanginThere',
		title: 'HanginThere',
		blurb:
			'A mobile app helping commuters choose cleaner routes, turning real-time air quality and carbon-emission data into an interactive sustainability dashboard.',
		categories: ['Mobile'],
		tags: ['Mobile', 'Data Viz', 'Sustainability'],
		language: 'JavaScript',
		year: 2026,
	},
	{
		slug: 'Argus_Platform',
		title: 'Argus Platform',
		blurb:
			'A data-driven observability stack for monitoring environmental-standards compliance across cloud-native operations, wiring an agent UI to Prometheus and Grafana in Docker.',
		categories: ['Cloud & DevOps'],
		tags: ['Observability', 'Prometheus', 'Grafana', 'Docker'],
		language: 'Python',
		year: 2025,
	},
	{
		slug: 'Ransomware-Simulation',
		title: 'Endpoint Extortion Simulation',
		blurb:
			'A blue-team training build that mimics a host-lockdown screen in a controlled lab, so SOC analysts can study endpoint-hijacking behaviour and incident response without a real threat.',
		categories: ['Cybersecurity'],
		tags: ['SOC Training', 'Blue Team', 'Python'],
		language: 'Python',
		year: 2026,
	},
	{
		slug: 'TheHive-Deployment',
		title: 'TheHive SOC Deployment',
		blurb:
			'A reproducible, container-based deployment of TheHive incident-response platform on Windows via WSL 2 + Docker, with a small Python deployer that automates the clone → init → compose-up sequence.',
		categories: ['Cybersecurity', 'Cloud & DevOps'],
		tags: ['SOC', 'Docker', 'WSL 2', 'Python'],
		language: 'Python',
		year: 2026,
	},
	{
		slug: 'OTRS-and-ELK-STACK-Azure-Linux-Deployment',
		title: 'OTRS + ELK Stack on Azure',
		blurb:
			'A SOC support stack built from scratch on a single Azure Linux VM: Znuny/OTRS ticketing plus the Elastic Stack for log collection and search, with a Cisco router forwarding syslog end to end.',
		categories: ['Cybersecurity', 'Cloud & DevOps'],
		tags: ['ELK', 'Azure', 'SIEM', 'Linux'],
		language: 'Shell',
		year: 2026,
	},
	{
		slug: 'Network-Automation',
		title: 'SecureCRT Network Automation',
		blurb:
			'A Python automation script for SecureCRT that streamlines device configuration, VLAN provisioning and post-deployment verification, with auto-ping checks and fail-safe dictionary lookups.',
		categories: ['Automation'],
		tags: ['Python', 'Networking', 'SecureCRT'],
		language: 'Python',
		year: 2026,
	},
	{
		slug: 'Costing',
		title: 'Cost Calculator',
		blurb:
			'A standalone Next.js cost-calculator built for a freelance client to price work transparently, with a billing-oriented UI.',
		categories: ['Web'],
		tags: ['Next.js', 'TypeScript', 'Freelance'],
		language: 'TypeScript',
		year: 2026,
	},
	{
		slug: 'ACSS_Website',
		title: 'ACSS Organisation Website',
		blurb:
			'The website for the Alliance of Computer Science Students chapter — an org site built and maintained as a student leader.',
		categories: ['Web'],
		tags: ['JavaScript', 'Org Site'],
		language: 'JavaScript',
		year: 2026,
	},
	{
		slug: 'Enrollment-form-RivanCyber',
		title: 'RivanCyber Enrollment Form',
		blurb:
			'A deployed enrollment form for the RivanCyber programme — a focused, single-purpose web form shipped to production.',
		categories: ['Web'],
		tags: ['HTML', 'Forms', 'Vercel'],
		language: 'HTML',
		year: 2026,
		demoUrl: 'https://rivancyber-enrollment-form.vercel.app',
	},
];
