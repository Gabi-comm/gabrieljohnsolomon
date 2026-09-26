/**
 * Repositories highlighted on the home page.
 *
 * These are the six currently pinned on github.com/Gabi-comm. Live metadata
 * (language mix, last push, stars) is fetched at build time by `src/lib/github.ts`;
 * everything below is authored locally because most of these repos have no
 * description on GitHub and the raw slugs don't read well as headings.
 *
 * To reorder the grid, reorder this array. To feature a different repo, change
 * `slug` to match the repository name exactly.
 */
export interface FeaturedRepo {
	/** Repository name on GitHub, exactly as it appears in the URL. */
	slug: string;
	/** Display heading. Written out properly rather than using the slug. */
	title: string;
	/** One- or two-sentence summary shown on the card. */
	blurb: string;
	/** Short capability tags. Kept to 3-4 so cards stay the same height. */
	tags: string[];
	/** Optional live demo / deployed URL, shown as a second link. */
	demoUrl?: string;
}

export const GITHUB_USER = 'Gabi-comm';

export const featuredRepos: FeaturedRepo[] = [
	{
		slug: 'Road-Damage-and-Defect-Recognition-Model',
		title: 'Road Damage & Defect Recognition',
		blurb:
			'A deep learning model that detects and classifies road defects from street imagery, built to support data-driven infrastructure maintenance decisions.',
		tags: ['Deep Learning', 'Computer Vision', 'Jupyter'],
	},
	{
		slug: 'Network-Log-RAG-Chatbot',
		title: 'Network Log RAG Chatbot',
		blurb:
			'Indexes network logs into a ChromaDB vector store so a local Ollama language model can query them conversationally, analyse activity and surface security anomalies.',
		tags: ['RAG', 'ChromaDB', 'Ollama', 'Security'],
	},
	{
		slug: 'HanginThere',
		title: 'HanginThere',
		blurb:
			'A mobile app helping commuters choose cleaner routes, turning real-time air quality and carbon emission data into an interactive dashboard.',
		tags: ['Mobile', 'Data Viz', 'Sustainability'],
	},
	{
		slug: 'Ransomware-Simulation',
		title: 'Endpoint Extortion Simulation',
		blurb:
			'A blue-team training build that mimics a ransomware host-lockdown screen — input suppression, forced audio escalation and a timed shutdown — so SOC analysts can study endpoint hijacking behaviour in a controlled lab.',
		tags: ['Security', 'Python', 'SOC Training', 'Windows API'],
	},
	{
		slug: 'Argus_Platform',
		title: 'Argus Platform',
		blurb:
			'A data-driven observability solution for monitoring environmental standards compliance across cloud-native operations.',
		tags: ['Observability', 'Python', 'Docker'],
	},
	{
		// Gabriel's fork of the team repo — the card shows a "Fork" chip automatically.
		slug: 'Alvin',
		title: 'ALVIN',
		blurb:
			'A 3D digital twin that scores the real-time comfort of every space in a building from IoT sensor data, and during an emergency routes occupants by GPS to the nearest evacuation centre. Backend work on a SparkFest 2026 team entry.',
		tags: ['Digital Twin', 'IoT', 'FastAPI', 'Firestore'],
	},
];

/**
 * TODO(gabriel): `Filipino-Sign-Language-Detection-Using-Roboflow-and-Ultralytics`
 * is pinned on your GitHub profile but the repository is currently EMPTY — the API
 * reports "This repository is empty." Anyone clicking through from your portfolio
 * would land on a blank repo, so it is deliberately not featured here yet.
 *
 * Once you push the notebooks and weights, add it back:
 *
 *   {
 *     slug: 'Filipino-Sign-Language-Detection-Using-Roboflow-and-Ultralytics',
 *     title: 'Filipino Sign Language Detection',
 *     blurb: 'Real-time FSL gesture recognition trained with Roboflow datasets and YOLO models from Ultralytics.',
 *     tags: ['YOLO', 'Roboflow', 'Computer Vision'],
 *   },
 *
 * `Network-Log-RAG-Chatbot` is standing in for it in the meantime.
 */
