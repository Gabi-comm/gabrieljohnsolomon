/**
 * Certifications.
 *
 * Gabriel's credentials live on LinkedIn, so the section leads with a link there
 * rather than duplicating them by hand — one profile to keep up to date instead of
 * two. `certifications` is still honoured: add an entry and it renders as a card
 * above the LinkedIn link, no other changes needed.
 *
 *   {
 *     name: 'AWS Certified Cloud Practitioner',
 *     issuer: 'Amazon Web Services',
 *     date: 'March 2026',                                  // free text, shown as-is
 *     credentialUrl: 'https://www.credly.com/badges/...',   // optional - adds "Verify"
 *     image: '/certs/aws-ccp.png',                          // optional - put file in public/certs/
 *   }
 */
export interface Certification {
	name: string;
	issuer: string;
	/** Free-form, e.g. 'March 2026' or '2025 – 2028'. Displayed verbatim. */
	date: string;
	/** Link to the verifiable credential (Credly, Coursera, etc.). */
	credentialUrl?: string;
	/** Badge or certificate image under `public/`, e.g. '/certs/aws-ccp.png'. */
	image?: string;
}

/** Where the full, authoritative list of credentials lives. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/gabrieljohnsolomon/';

/** Optional: surface a few certificates directly on the page. Empty is fine. */
export const certifications: Certification[] = [];
