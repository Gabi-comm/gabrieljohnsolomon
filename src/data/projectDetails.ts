/**
 * README-style write-ups for the /projects/[slug] detail pages.
 *
 * Condensed from each repository's own README, keyed by repo slug. Every
 * project in `projects.ts` should have an entry; a missing one falls back to the
 * card blurb on the detail page.
 */

export interface RunStep {
	/** What this step does, in a few words. */
	label: string;
	/** Shell lines, shown as one code block. */
	code?: string[];
}

export interface ConfigItem {
	/** Env var, file or setting name. */
	key: string;
	desc: string;
}

export interface ProjectDetail {
	/** One to three paragraphs. */
	overview: string[];
	/** Grouped tech stack, e.g. Frontend / Backend / Models. */
	stack: { group: string; items: string[] }[];
	features: string[];
	run: RunStep[];
	config: ConfigItem[];
	/** Short caveats shown under the config table. */
	notes?: string[];
}

export const projectDetails: Record<string, ProjectDetail> = {
	'ML-E': {
		overview: [
			'ML-E is a local studio for learning machine learning and AI engineering by watching it work. Every idea is a scene and every line of code is a picture: chapters from AI Engineering and Hands-On Machine Learning become animated, interactive explanations.',
			'Code typed in the Lab runs in a real Jupyter kernel on your own machine. A small `mle` helper streams training metrics back to the browser, so loss curves, weights and network activity update live while the model trains.',
		],
		stack: [
			{ group: 'Web', items: ['Next.js', 'React', 'TypeScript', 'Monaco Editor'] },
			{ group: 'Visuals', items: ['React Three Fiber', 'Three.js', 'D3'] },
			{ group: 'Engine', items: ['FastAPI', 'Jupyter kernel', 'Python 3.12', 'uv'] },
			{ group: 'ML', items: ['Keras 3', 'NumPy', 'scikit-learn'] },
			{ group: 'Tooling', items: ['pnpm', 'concurrently', 'pytest'] },
		],
		features: [
			'Five sections: Home, Books, Lab, Projects and Analytics.',
			'Chapter scenes that turn book concepts into animated, steppable visuals.',
			'A Monaco-powered Lab that executes code in a live Jupyter kernel.',
			'A 3D view of the network that lights up as data flows through it.',
			'Training metrics streamed in real time through the `mle` helper.',
			'Everything runs locally; no cloud account needed.',
		],
		run: [
			{ label: 'Install web and engine dependencies', code: ['pnpm install', 'pnpm -C web install', 'uv sync --project server'] },
			{ label: 'Start both servers together', code: ['pnpm dev'] },
			{ label: 'Open the studio: http://localhost:3210' },
			{ label: 'Run the engine tests', code: ['pnpm test'] },
		],
		config: [
			{ key: 'Web port', desc: '3210 (Next.js dev server).' },
			{ key: 'Engine port', desc: '8000 (FastAPI + Jupyter kernel).' },
			{ key: 'Python', desc: '3.12, managed by uv in the server/ project.' },
			{ key: 'Host', desc: 'The engine binds to 127.0.0.1 only.' },
		],
	},

	TerraWindow: {
		overview: [
			'TerraWindow is a NASA Space Apps 2026 research workspace for finding Earth terrain where rovers and crews can rehearse for the lunar south pole and Mars. It compares slope, roughness and relief against LOLA and MOLA elevation data criterion by criterion.',
			'It also computes low-sun rehearsal windows with SPICE, so a site can be visited when the lighting matches the target. Every verdict is tied back to the evidence that produced it. Gab built the Layer 3 geospatial engine and API and the Layer 2 data integration in a four-person team.',
		],
		stack: [
			{ group: 'Frontend', items: ['React 19', 'TypeScript', 'Vite 8', 'Tailwind 4', 'MapLibre', 'Recharts'] },
			{ group: 'Backend', items: ['Python 3.12+', 'FastAPI', 'rasterio', 'SpiceyPy'] },
			{ group: 'Data', items: ['LOLA (Moon)', 'MOLA (Mars)', 'Earth DEMs', 'SPICE kernels'] },
		],
		features: [
			'Side-by-side terrain comparison against lunar and Martian reference sites.',
			'Per-criterion scoring for slope, roughness and relief, with the numbers shown.',
			'Low-sun rehearsal windows computed from real ephemerides.',
			'An interactive map workspace for exploring candidate analog sites.',
		],
		run: [
			{
				label: 'Backend environment',
				code: [
					'cd backend',
					'python -m venv .venv',
					'.venv/Scripts/python -m pip install -e "geoprocessing[dev,layer4]" -e "data_integration[dev]" -e "gateway[dev]" -e ../solar_geometry_engine',
				],
			},
			{
				label: 'Fetch datasets (rasters are never committed)',
				code: ['.venv/Scripts/terrawindow-data fetch lola-5mpp-site01'],
			},
			{
				label: 'Run the service (in backend/geoprocessing)',
				code: ['../.venv/Scripts/python -m uvicorn terrawindow_geo.api.app:app --port 8000'],
			},
			{ label: 'Run the frontend', code: ['cd frontend', 'npm ci', 'npm run dev'] },
		],
		config: [
			{ key: 'Node', desc: '22.12 or newer for the Vite 8 frontend.' },
			{ key: 'Python', desc: '3.12 or newer for the geospatial backend.' },
			{ key: 'VITE_TERRAWINDOW_API', desc: 'Where the frontend sends /api calls (default http://localhost:8000).' },
			{ key: 'TWGEO_MARS_MEGDR32_DIR', desc: 'Folder with the 32 px/deg MOLA grid for Mars rehearsal windows.' },
		],
		notes: ['Team entry with Alvin187187, Monodyp and sinagdev.'],
	},

	NeuroSymbolic: {
		overview: [
			'OASYS is an undergraduate thesis system that grades road damage from a single photo. A neural stage finds and segments the defect; a symbolic stage measures it in real-world units and grades its severity against DPWH standards.',
			'Because the grading is done by a fuzzy rule engine rather than a black-box classifier, every result comes with an auditable trace of which measurements fired which rules.',
		],
		stack: [
			{ group: 'Frontend', items: ['Next.js 16', 'React 19', 'Tailwind 4'] },
			{ group: 'Backend', items: ['FastAPI', 'PyTorch', 'Ultralytics YOLOv8', 'SAM', 'OpenCV', 'scikit-fuzzy'] },
			{ group: 'Services', items: ['Supabase', 'Ollama (llama3.2)'] },
		],
		features: [
			'Privacy blur on faces and plates before any analysis.',
			'YOLOv8 road segmentation, then an inverse-perspective warp to a top-down view.',
			'SAM refinement of the defect mask for precise measurement.',
			'Fuzzy-logic severity grading mapped to DPWH maintenance standards.',
			'A plain-language bulletin for each assessment, written by a local LLM.',
		],
		run: [
			{
				label: 'Python environment',
				code: ['python -m venv deps', 'deps\\Scripts\\python.exe -m pip install -r backend\\requirements.txt'],
			},
			{ label: 'Website packages and settings', code: ['npm install', 'copy .env.local.example .env.local'] },
			{ label: 'Terminal 1: local model', code: ['ollama serve'] },
			{
				label: 'Terminal 2: analysis backend',
				code: ['cd backend', '..\\deps\\Scripts\\python.exe -m uvicorn api:app --host 127.0.0.1 --port 8000'],
			},
			{ label: 'Terminal 3: website', code: ['npm run build', 'npx next start -p 3000'] },
		],
		config: [
			{ key: 'NEXT_PUBLIC_SUPABASE_URL', desc: 'Supabase project URL.' },
			{ key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', desc: 'The publishable (anon) key.' },
			{ key: 'API_BASE_URL', desc: 'http://127.0.0.1:8000, the FastAPI backend.' },
			{ key: 'Model weights', desc: 'ultrabestroad.pt, best.pt and the SAM ViT-B checkpoint go in backend/.' },
			{ key: 'Ollama', desc: 'Runs on port 11434 for the bulletin writer.' },
		],
		notes: [
			'Measures area and extent from a single image; it does not measure pothole depth.',
			'Use the production build: the Turbopack dev compile can run out of memory on small machines.',
		],
	},

	'Road-Damage-and-Defect-Recognition-Model': {
		overview: [
			'The deep-learning detector behind OASYS. It finds and classifies road defects such as cracks and potholes in street imagery to support data-driven maintenance decisions.',
			'The model was trained and evaluated in notebooks, then exported for use in the OASYS backend.',
		],
		stack: [
			{ group: 'Model', items: ['YOLOv8', 'PyTorch', 'Ultralytics'] },
			{ group: 'Workflow', items: ['Jupyter', 'Python'] },
		],
		features: [
			'Detection and segmentation of common road-surface defects.',
			'Training and evaluation notebooks with metrics per class.',
			'Exported weights consumed by the OASYS assessment pipeline.',
		],
		run: [{ label: 'Open the training notebooks in Jupyter', code: ['jupyter notebook'] }],
		config: [{ key: 'Weights', desc: 'The trained model file is loaded by the OASYS backend.' }],
		notes: ['The repository is not public, so there is no GitHub link for this one.'],
	},

	GOATS: {
		overview: [
			'GOATS turns Filipino Sign Language into speech. You sign in front of a webcam, a YOLO model reads each gesture, and the app builds words and reads them aloud.',
			'It works both ways: the hearing person can type or dictate a reply on the same screen, so a conversation can happen without an interpreter.',
		],
		stack: [
			{ group: 'Model', items: ['YOLO (FSL-trained)', 'Python'] },
			{ group: 'Server', items: ['FastAPI', 'server.py'] },
			{ group: 'Client', items: ['TypeScript', 'Web Speech API', 'Webcam'] },
		],
		features: [
			'Real-time letter recognition from a webcam feed (~45 ms per frame on CPU).',
			'Builds words from letters and speaks them aloud.',
			'Typed or dictated replies on the same screen for two-way conversation.',
			'TypeScript sources compiled to static JS, served by the Python server.',
		],
		run: [
			{ label: 'Install and start', code: ['pip install -r requirements.txt', 'python server.py'] },
			{ label: 'Open in Chrome: http://localhost:8000' },
			{ label: 'Run the client tests', code: ['npm test'] },
		],
		config: [
			{ key: 'FSL_MODEL_PATH', desc: 'Path to the YOLO weights.' },
			{ key: 'FSL_IMGSZ', desc: 'Inference image size (default 640).' },
			{ key: 'FSL_PORT', desc: 'Server port (default 8000).' },
		],
		notes: ['J and Z need motion, so they are not recognised yet.'],
	},

	'MAT-AH': {
		overview: [
			'MAT-AH is one private place to find the files scattered across a laptop, asked in English, Filipino or Taglish. It searches documents, photos and video by meaning, answers with page citations, and can tidy folders.',
			'It runs fully offline on local models: nothing is uploaded anywhere.',
		],
		stack: [
			{ group: 'Frontend', items: ['React', 'Vite', 'TypeScript'] },
			{ group: 'Backend', items: ['FastAPI', 'SQLite FTS5'] },
			{ group: 'Models', items: ['Ollama (gemma4:e4b)', 'embeddinggemma', 'open_clip', 'faster-whisper'] },
		],
		features: [
			'Five agents: Hanap (search), Sagot (answer), Kilos (act), Linis (tidy) and Tala (notes).',
			'Search across documents, images and video transcripts by meaning.',
			'Answers cite the exact file and page they came from.',
			'Folder clean-up suggestions you approve before anything moves.',
			'English, Filipino and Taglish queries.',
		],
		run: [
			{ label: 'Pull the local models', code: ['ollama pull gemma4:e4b', 'ollama pull embeddinggemma'] },
			{ label: 'Start (Windows)', code: ['./run.ps1'] },
			{ label: 'Open: http://127.0.0.1:8765' },
		],
		config: [{ key: 'MATAH_LLM', desc: 'Which Ollama model the agents use.' }],
		notes: ['Fully offline: no cloud keys, nothing leaves the machine.'],
	},

	Gabo: {
		overview: [
			'Gabo is a web-based harness on the Claude Agent SDK where twelve role agents study, brainstorm and ship together in purpose-built rooms.',
			'It runs on a Claude, OpenAI or Gemini key, or on a free local model through Ollama.',
		],
		stack: [
			{ group: 'App', items: ['TypeScript', 'Node 20.9+', 'Claude Agent SDK'] },
			{ group: 'Providers', items: ['Claude', 'OpenAI', 'Gemini', 'Ollama'] },
			{ group: 'Testing', items: ['Unit tests', 'End-to-end tests', 'tsc typecheck'] },
		],
		features: [
			'Twelve role agents with distinct responsibilities.',
			'Rooms for different work: Library, Arena, Hackathon and Laboratory.',
			'Bring-your-own-key for three providers, or fully local with Ollama.',
			'Binds to 127.0.0.1 only, so the harness is never exposed on the network.',
		],
		run: [
			{ label: 'Install and start', code: ['npm install', 'npm run dev'] },
			{ label: 'Open: http://127.0.0.1:3217' },
			{ label: 'Checks', code: ['npm test', 'npm run test:e2e', 'npm run typecheck'] },
		],
		config: [
			{ key: 'API keys', desc: 'Entered in the app and stored locally in .data/.' },
			{ key: 'Ollama', desc: 'Optional: any local model, no key needed.' },
		],
	},

	'ARCH---SOLIDSTRUK': {
		overview: [
			'Nibble is a design flow built for SOLIDSTRUK. It turns a floor plan into a black-and-white SketchUp-style 3D model, then an AI visualization, then a cinematic walkthrough, with a client-approval gate between each step.',
			'The plan is kept as structured data, so the AI only adds materials and light and never invents geometry.',
		],
		stack: [
			{ group: 'App', items: ['Next.js', 'TypeScript', 'React'] },
			{ group: '3D', items: ['three.js'] },
			{ group: 'AI', items: ['Gemini (image)', 'Veo 3.1 (video)'] },
			{ group: 'Storage', items: ['IndexedDB'] },
		],
		features: [
			'Four steps: floor plan, 3D model, AI visualization and walkthrough.',
			'Approval gate before each step so the client signs off as it goes.',
			'Geometry stays fixed: AI renders cannot change walls or openings.',
			'Projects saved in the browser with IndexedDB.',
			'Preview mode works without an API key.',
		],
		run: [
			{ label: 'Install and configure', code: ['npm install', 'cp .env.example .env.local'] },
			{ label: 'Start (port 3000)', code: ['npm run dev'] },
			{ label: 'Tests', code: ['npm test'] },
		],
		config: [
			{ key: 'GEMINI_API_KEY', desc: 'Server-side key in .env.local.' },
			{ key: 'x-gemini-key', desc: 'Or set a key in the UI; it is sent per request in this header.' },
		],
	},

	'mantika-check': {
		overview: [
			'Mantika Check is a frying-oil advisor for street-food vendors, built for the Philippine Junior Data Science Challenge 2026. Vendors log how long and how hot they fried, what they cooked, top-ups and how the oil looks.',
			'It estimates how worn the oil is, warns the moment a warning sign shows up, and says whether to keep using, filter, top up or replace it. Ollie, the oil-drop mascot, changes with the oil\'s status. The statuses are estimates from logged usage, not lab measurements, and have not yet been validated at real stalls.',
		],
		stack: [
			{ group: 'Web', items: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'TypeScript'] },
			{ group: 'Engine', items: ['Arrhenius kinetic model', 'Mamdani fuzzy rules', 'Hard safety rules'] },
			{ group: 'Data & AI', items: ['Supabase', 'Hugging Face inference', 'Vitest'] },
		],
		features: [
			'A neuro-symbolic engine that runs in the browser: a kinetic model trained on published lab frying data estimates total polar compounds (TPC) from frying hours and heat.',
			'Hard safety rules: smoke, foam, dark or thick oil, or an estimated TPC above 25% always say "replace now".',
			'Fuzzy rules weigh the TPC estimate, breaded food and oil stability to pick one of four statuses.',
			'Optional Hugging Face model that rewords the advice but never changes the decision.',
			'Dashboard with status, forecast and usage charts; session logging, quick checks, top-ups and batch history.',
			'Email or Google sign-in synced to Supabase, or fully on-device without an account.',
			'Experimental colour analyzer that compares an oil photo with printed reference swatches.',
		],
		run: [
			{ label: 'Install (first time)', code: ['npm run install:web'] },
			{ label: 'Start the app: http://localhost:3000', code: ['npm run dev'] },
			{ label: 'Run tests and build', code: ['npm test', 'npm run build'] },
		],
		config: [
			{ key: 'NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', desc: 'Accounts and sync. Optional.' },
			{ key: 'HF_TOKEN, HF_MODEL', desc: 'Optional Hugging Face advice wording; fixed templates are used without them.' },
		],
		notes: ['Works with none of the variables set: data stays on the device and advice uses templates.'],
	},

	Netloop: {
		overview: [
			'Netloop is a mobile-first cybersecurity game. Packets stream toward your server; draw a loop around the malicious ones to drop them and let the legitimate ones through.',
			'Five zones take you from a living-room router through coffee-shop Wi-Fi, a school lab and an office to a data center, with an endless Cloud mode after. Each zone introduces new threats, and each threat behaves like the real thing it is named after.',
		],
		stack: [
			{ group: 'App', items: ['Next.js', 'React 19', 'TypeScript'] },
			{ group: 'Game', items: ['Custom canvas engine and renderer', 'SVG sprites'] },
			{ group: 'Platform', items: ['Installable web app (PWA)', 'Service worker'] },
		],
		features: [
			'Draw-to-select gameplay: one closed loop catches every packet inside it.',
			'Threats with their own rules: ping floods arrive in swarms, worms split in two, ransomware needs two loops, trojans open near the server, spoofers flicker red, a man in the middle hides beside a legit packet, and zero-days cut open lines.',
			'Five hand-tuned zones with three waves each, plus an endless mode.',
			'Power-ups, a shop, a Codex of every threat, and saved progress with stars and unlocks.',
		],
		run: [
			{ label: 'Install and start', code: ['npm install', 'npm run dev'] },
			{ label: 'Production build', code: ['npm run build'] },
		],
		config: [{ key: 'None', desc: 'No environment variables or accounts. Progress is saved in the browser on the device.' }],
	},

	'Network-Log-RAG-Chatbot': {
		overview: [
			'A command-line RAG pipeline that embeds raw network logs into a ChromaDB vector store so a local Ollama model can answer questions about them.',
			'Logs are redacted before embedding, so the pipeline stays privacy-first and fully local.',
		],
		stack: [
			{ group: 'Pipeline', items: ['Python 3.14', 'LangChain'] },
			{ group: 'Retrieval', items: ['Hugging Face embeddings', 'ChromaDB'] },
			{ group: 'Model', items: ['Ollama'] },
		],
		features: [
			'redact.py strips sensitive values from logs before they are stored.',
			'embed.py chunks and embeds the logs into ChromaDB.',
			'retriever.py pulls the most relevant log lines for a question.',
			'chatbot.py answers questions and flags anomalies in plain language.',
		],
		run: [
			{ label: 'Install dependencies', code: ['pip install -r requirements.txt'] },
			{ label: 'Build the index, then chat', code: ['python redact.py', 'python embed.py', 'python chatbot.py'] },
		],
		config: [
			{ key: 'Ollama', desc: 'A local model must be pulled and running.' },
			{ key: 'Log source', desc: 'Point the scripts at your exported log files.' },
		],
	},

	'Naive-RAG-Model-Chatbot': {
		overview: [
			'A from-scratch retrieval-augmented chatbot in one notebook: chunking, embeddings, a vector store and grounded answers, built to learn the RAG pipeline end to end.',
		],
		stack: [
			{ group: 'Notebook', items: ['Jupyter', 'Python'] },
			{ group: 'RAG', items: ['LangChain', 'Chroma', 'Hugging Face embeddings'] },
			{ group: 'Models / UI', items: ['OpenAI', 'Ollama', 'Gradio'] },
		],
		features: [
			'Step-by-step notebook covering every stage of a basic RAG system.',
			'Swap between an OpenAI model and a local Ollama model.',
			'A small Gradio chat UI on top of the retriever.',
		],
		run: [
			{
				label: 'Install dependencies',
				code: ['pip install langchain_openai langchain-chroma langchain-huggingface langchain-ollama gradio'],
			},
			{ label: 'Open the notebook', code: ['jupyter notebook langcha.ipynb'] },
		],
		config: [{ key: 'API_KEY', desc: 'OpenAI key, only needed for the OpenAI model path.' }],
	},

	'Rivan-OWASP': {
		overview: [
			'Rivan Simulation is a set of runnable, in-browser labs that teach OWASP-style LLM attacks against a simulated site.',
			'Each track has a briefing, a hands-on simulation and a debrief, so learners see the attack work and then learn why it worked.',
		],
		stack: [
			{ group: 'App', items: ['React', 'Vite', 'JavaScript'] },
			{ group: 'Model', items: ['Ollama (llama3.2)', 'Vite /ollama proxy'] },
		],
		features: [
			'Indirect Prompt Injection lab: poisoned content steers the assistant.',
			'Direct Prompt Injection lab: the user tries to override the system prompt.',
			'Briefing, simulation and debrief for every track.',
			'Temperature 0 so each run behaves the same for every learner.',
		],
		run: [
			{ label: 'Install and start (port 5173)', code: ['npm install', 'npm run dev'] },
			{ label: 'Production build', code: ['npm run build', 'npm run preview'] },
		],
		config: [
			{ key: 'Ollama', desc: 'llama3.2 pulled and running locally.' },
			{ key: '/ollama proxy', desc: 'Defined in the Vite config; available in dev only.' },
		],
	},

	Alvin: {
		overview: [
			'ALVIN is a human-centred 3D digital twin of a building. It scores the real-time comfort of every space from IoT sensor data, and during an emergency routes occupants to the nearest evacuation centre.',
			'Built by team Malita Bois for SparkFest 2026; Gab built the backend.',
		],
		stack: [
			{ group: 'Frontend', items: ['React 19', 'Vite', 'MapLibre', 'three.js', 'React Three Fiber', 'OSRM'] },
			{ group: 'Backend', items: ['FastAPI', 'Firebase', 'Firestore'] },
			{ group: 'Hardware / chain', items: ['ESP32 sensors', 'Polygon audit log'] },
		],
		features: [
			'A 3D model of the building with live comfort scores per room.',
			'Sensor readings from ESP32 devices feed the twin in real time.',
			'Emergency mode routes people to the nearest evacuation centre.',
			'Key events written to an on-chain audit trail on Polygon.',
		],
		run: [
			{ label: 'Frontend', code: ['npm install', 'cp .env.example .env', 'npm run dev'] },
			{
				label: 'Backend',
				code: [
					'cd alvin-backend',
					'python3 -m venv .venv && source .venv/bin/activate',
					'pip install -r requirements.txt',
					'uvicorn main:app --reload --port 8000',
				],
			},
		],
		config: [
			{ key: 'VITE_API_URL', desc: 'Frontend: where the FastAPI backend lives.' },
			{ key: 'FIREBASE_CREDENTIALS', desc: 'Backend: service-account credentials for Firestore.' },
			{ key: 'OPENWEATHER_API_KEY', desc: 'Backend: outdoor weather for comfort scoring.' },
		],
		notes: ['Place the building .glb models in public/models.'],
	},

	HanginThere: {
		overview: [
			'HanginThere helps commuters choose cleaner routes. It turns real-time air quality and carbon-emission data into an interactive sustainability dashboard.',
		],
		stack: [
			{ group: 'App', items: ['React', 'Vite', 'JavaScript'] },
			{ group: 'UI / data', items: ['styled-components', 'Recharts', 'axios'] },
		],
		features: [
			'Air-quality readings for the places you travel through.',
			'Carbon estimates per route so trips can be compared.',
			'Charts that track exposure and emissions over time.',
		],
		run: [{ label: 'Install and start', code: ['cd hangin', 'npm install', 'npm run dev'] }],
		config: [{ key: 'Data APIs', desc: 'Air-quality and emission endpoints are called through axios.' }],
	},

	Argus_Platform: {
		overview: [
			'Argus is an observability stack for monitoring environmental-standards compliance across cloud-native operations. An agent collects readings, Prometheus stores them, and Grafana shows them.',
		],
		stack: [
			{ group: 'Agent', items: ['Python 3.9', 'Streamlit'] },
			{ group: 'Monitoring', items: ['Prometheus', 'Grafana'] },
			{ group: 'Infra', items: ['Docker Desktop', 'docker-compose'] },
		],
		features: [
			'A Streamlit agent UI for reviewing and pushing readings.',
			'Prometheus scraping and storage for every metric.',
			'Importable Grafana dashboard for compliance at a glance.',
			'One-command start on Windows.',
		],
		run: [
			{ label: 'Start the stack', code: ['./start.ps1', '# or: docker-compose up -d --build'] },
			{ label: 'Start the agent', code: ['streamlit run Agent\\argus_agent.py'] },
		],
		config: [
			{ key: 'Grafana', desc: 'Open http://localhost:3000 and import the dashboard JSON.' },
			{ key: 'Prometheus', desc: 'Scrape targets are set in the bundled config.' },
		],
	},

	'Ransomware-Simulation': {
		overview: [
			'A blue-team training build that mimics a host-lockdown screen inside a controlled lab, so SOC analysts can study endpoint-hijacking behaviour and practise incident response without a real threat.',
			'It encrypts nothing and spreads nowhere. It is meant to run only on a disposable lab VM.',
		],
		stack: [
			{ group: 'App', items: ['Python', 'tkinter'] },
			{ group: 'Effects', items: ['pygame (alarm)', 'pycaw (volume)', 'keyboard hooks'] },
		],
		features: [
			'Full-screen lockdown window that imitates a ransom note.',
			'Alarm audio and forced volume to simulate pressure on the user.',
			'Keyboard hooks that block the usual escape keys.',
			'A timed shutdown of the VM at 60 seconds to end the exercise.',
		],
		run: [{ label: 'Lab VM only', code: ['python app.py'] }],
		config: [{ key: 'Emergency exit', desc: 'Press Esc + 0 to close the simulation.' }],
		notes: [
			'Run it only inside an isolated, disposable virtual machine. It shuts the machine down by design.',
		],
	},

	'TheHive-Deployment': {
		overview: [
			'A reproducible, container-based deployment of TheHive incident-response platform on Windows through WSL 2 and Docker.',
			'A small Python deployer automates the clone, init and compose-up sequence so the stack comes up the same way every time.',
		],
		stack: [
			{ group: 'Platform', items: ['TheHive', 'Docker Compose'] },
			{ group: 'Host', items: ['Windows', 'WSL 2', 'Docker Desktop'] },
			{ group: 'Automation', items: ['Python (src/deploy.py)', 'hive-deployer Dockerfile'] },
		],
		features: [
			'One script to clone, initialise and start the full stack.',
			'Optional containerised deployer image for a clean host.',
			'Step-by-step docs from setup to the first organisation and analyst.',
			'Services bound to localhost only.',
		],
		run: [
			{ label: 'Inside WSL 2', code: ['cd ~/hive', 'docker build -t hive-deployer .', 'python3 src/deploy.py'] },
		],
		config: [
			{ key: 'WSL 2', desc: 'Required, with Docker Desktop using the WSL backend.' },
			{ key: 'Docs 01–04', desc: 'Walk through setup, organisation and user creation.' },
		],
	},

	'OTRS-and-ELK-STACK-Azure-Linux-Deployment': {
		overview: [
			'A SOC support stack built from scratch on a single Azure Linux VM: Znuny/OTRS for ticketing and the Elastic Stack for log collection and search.',
			'A Cisco router forwards syslog into the stack, so the pipeline is proven end to end.',
		],
		stack: [
			{ group: 'Ticketing', items: ['Znuny (OTRS) 6.5'] },
			{ group: 'Logging', items: ['Elasticsearch 8.19', 'Logstash', 'Kibana'] },
			{ group: 'Infra', items: ['Azure Linux VM', 'Cisco syslog'] },
		],
		features: [
			'Ticketing and log search on one VM.',
			'Syslog from network gear indexed and searchable in Kibana.',
			'Config files and screenshots for every step.',
			'No credentials committed to the repo.',
		],
		run: [{ label: 'Follow docs/01 to docs/04 in order; each step has its config files and screenshots.' }],
		config: [
			{ key: '/otrs/index.pl', desc: 'Znuny agent interface.' },
			{ key: 'Kibana :5601', desc: 'Log search and dashboards.' },
		],
	},

	'Network-Automation': {
		overview: [
			'A Python automation script for SecureCRT that streamlines device configuration, VLAN provisioning and post-deployment checks.',
		],
		stack: [{ group: 'Script', items: ['Python', 'SecureCRT', 'Cisco IOS', 'JSON'] }],
		features: [
			'Dictionary-based device config with .get() fallbacks, so missing keys never crash a run.',
			'VLAN and access-point provisioning from a JSON template.',
			'Automatic ping checks after deployment.',
			'try/except around each device so one failure does not stop the batch.',
		],
		run: [{ label: 'In SecureCRT, open Script > Run and pick autocon.py (devices) or autowifi.py (access points).' }],
		config: [{ key: 'autoAP-temp.json', desc: 'Template for access-point settings.' }],
	},

	ACSS_Website: {
		overview: [
			'The website for the Alliance of Computer Science Students chapter, built and maintained as a student leader.',
		],
		stack: [{ group: 'App', items: ['React', 'Vite', 'Tailwind CSS'] }],
		features: ['Organisation pages for the chapter.', 'Responsive layout built with Tailwind.'],
		run: [{ label: 'Install and start', code: ['cd frontend', 'npm install', 'npm run dev'] }],
		config: [{ key: 'Assets', desc: 'Logos and images live in the frontend assets folder.' }],
	},
};
