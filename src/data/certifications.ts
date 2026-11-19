/**
 * Certifications, seminars and participation.
 *
 * Every image lives in `public/certs/` (PDFs were converted to PNG, large scans
 * downscaled to 1600px wide). Each entry renders as a certificate card grouped
 * under its `category`; clicking a card opens the full-resolution image. The
 * credential details (issuer, date, signatories) are visible on the certificate
 * itself, so cards show the title and let the image carry the rest.
 *
 * To add one: drop the image in `public/certs/` and append an entry below.
 */
export type CertCategory = 'Certification' | 'Seminar' | 'Participation';

export interface Certification {
	/** Display title. */
	name: string;
	category: CertCategory;
	/** Image under `public/`, e.g. '/certs/intro-to-python.png'. */
	image: string;
	/** Optional verifiable-credential link (Credly, Coursera, etc.). */
	credentialUrl?: string;
	/** Surfaced on the home page's 3-up highlight row. Keep exactly three. */
	featured?: boolean;
}

/** Order the category groups appear in on the page. */
export const CATEGORY_ORDER: CertCategory[] = ['Certification', 'Seminar', 'Participation'];

/** Plural, human-facing heading for each group. */
export const CATEGORY_LABEL: Record<CertCategory, string> = {
	Certification: 'Certifications',
	Seminar: 'Seminars & Webinars',
	Participation: 'Participation & Badges',
};

/** Where the full, authoritative list of credentials lives. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/gabrieljohnsolomon/';

export const certifications: Certification[] = [
	// ---- Certifications ----
	{
		name: 'AI Engineer for Data Scientists (Associate)',
		category: 'Certification',
		image: '/certs/ai-engineer-for-data-scientists-associate.png',
		credentialUrl: 'https://www.datacamp.com/certificate/AEDS0013014169367',
		featured: true,
	},
	{
		name: 'AI Fluency: Framework & Foundations',
		category: 'Certification',
		image: '/certs/ai-fluency-framework-and-foundation.png',
		credentialUrl: 'https://verify.skilljar.com/c/96pfwdwa28ir',
		featured: true,
	},
	{
		name: 'Proofpoint Certified AI Agent Security Specialist',
		category: 'Certification',
		image: '/certs/certified-ai-agent-security-specialist-certification.png',
		credentialUrl: 'https://www.credly.com/badges/b26c9836-0de8-410e-9a84-f34d02dffa97',
		featured: true,
	},
	{
		name: 'Proofpoint Certified AI Data Security Specialist',
		category: 'Certification',
		image: '/certs/certified-ai-data-security-specialist-certification.png',
		credentialUrl: 'https://www.credly.com/badges/33ec10b0-c03d-4f02-b305-a13294818075',
	},
	{
		name: 'CodeChum Competition 2024 — Certificate of Completion',
		category: 'Certification',
		image: '/certs/codechum-competition-2024-certification-of-completion.png',
	},
	{
		name: 'Supervised Learning with scikit-learn',
		category: 'Certification',
		image: '/certs/supervised-learning-with-scikit-learn.png',
		credentialUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/1e4cbf857cea392519e0658ceb8c42e794c7ba7a',
	},
	{
		name: 'Understanding Machine Learning',
		category: 'Certification',
		image: '/certs/understanding-machine-learning.png',
		credentialUrl: 'https://www.datacamp.com/completed/statement-of-accomplishment/course/6b4fe1a163a6c86332fd8779e2e20f2ea04b6730',
	},
	{
		name: 'Introduction to Machine Learning',
		category: 'Certification',
		image: '/certs/gabriel-john-solomon-intro-to-machine-learning.png',
	},
	{
		name: 'Introduction to Programming',
		category: 'Certification',
		image: '/certs/gabriel-john-solomon-intro-to-programming.png',
	},
	{
		name: 'Introduction to Data Science',
		category: 'Certification',
		image: '/certs/introduction-to-data-science.png',
	},
	{
		name: 'Introduction to Python',
		category: 'Certification',
		image: '/certs/introduction-to-python.png',
	},

	// ---- Seminars & Webinars ----
	{
		name: 'Cyber-Resilience: Defending the Future',
		category: 'Seminar',
		image: '/certs/cyber-resilience-defending-the-future-seminar.png',
	},
	{
		name: 'Cybersecurity Fundamentals',
		category: 'Seminar',
		image: '/certs/cybersecurity-fundamentals-seminar-certificate.png',
	},
	{
		name: 'Fundamentals of Ethical Hacking — CTF-Based Approach',
		category: 'Seminar',
		image: '/certs/fundamentals-of-ethical-hacking-ctf-based-approach-seminar.png',
	},
	{
		name: 'Hack The Box Meetup 6 — Cybersecurity Fundamentals',
		category: 'Seminar',
		image: '/certs/hack-the-box-meetup-6-cybersecurity-fundamentals.png',
	},
	{
		name: 'Product Development in the Age of AI',
		category: 'Seminar',
		image: '/certs/product-development-in-the-age-of-artificial-intelligence-seminar.png',
	},
	{
		name: 'Quantum Computing with Superconductors & Josephson Junctions',
		category: 'Seminar',
		image: '/certs/quantum-computing-with-superconductors-and-josephson-junctions-webinar-certificate.png',
	},
	{
		name: 'The AI Trifecta: Create · Predict · Act',
		category: 'Seminar',
		image: '/certs/the-ai-trifecta-create-predict-act-seminar.png',
	},
	{
		name: 'What is Product Operations?',
		category: 'Seminar',
		image: '/certs/what-is-product-operations-seminar.png',
	},

	// ---- Participation & Badges ----
	{
		name: 'NASA Space Apps Challenge 2026 — Galactic Problem Solver',
		category: 'Participation',
		image: '/certs/nasa-space-apps-challenge-2026-galactic-problem-solver.jpg',
	},
	{
		name: 'Copilot for Microsoft 365 — KPMG Innovation Challenge',
		category: 'Participation',
		image: '/certs/copilot-m365-kpmg-innovation-challenge.png',
	},
	{
		name: 'CodeChum National Programming Challenge 2024',
		category: 'Participation',
		image: '/certs/codechum-national-programming-challenge-2024-certification.png',
	},
	{
		name: 'QNLP Certificate of Participation (QCSP)',
		category: 'Participation',
		image: '/certs/gabriel-john-solomon-qnlp-certificate-of-participation-qcsp.png',
	},
	{
		name: 'International Year of Quantum Science & Technology',
		category: 'Participation',
		image: '/certs/international-year-of-quantum-science-and-technology-certificate-of-participation.png',
	},
];
