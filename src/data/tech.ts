/**
 * Tech stack, grouped into the categories shown on the home page.
 *
 * `icon`  - basename of an SVG in `public/icons/`. Rendered as a CSS mask so the
 *           glyph takes its color from the surrounding text (see TechStack.astro).
 * `brand` - official brand hex, used on hover.
 * `brandLight` - optional override for light mode. Only needed when `brand` is so
 *           dark or so pale that it disappears against one of the two backgrounds
 *           (e.g. GitHub's near-black #181717 is invisible on the dark theme, so
 *           `brand` is white there and `brandLight` carries the real mark color).
 *
 * To add a tool: drop `<name>.svg` into `public/icons/` and add an entry here.
 */
export interface Tech {
	name: string;
	icon: string;
	brand: string;
	brandLight?: string;
}

export interface TechCategory {
	label: string;
	items: Tech[];
}

export const techCategories: TechCategory[] = [
	{
		label: 'Languages',
		items: [
			{ name: 'Python', icon: 'python', brand: '#3776AB' },
			{ name: 'C++', icon: 'cplusplus', brand: '#00599C' },
			{ name: 'TypeScript', icon: 'typescript', brand: '#3178C6' },
			{ name: 'JavaScript', icon: 'javascript', brand: '#F7DF1E' },
			{ name: 'MySQL', icon: 'mysql', brand: '#4479A1' },
			{ name: 'PostgreSQL', icon: 'postgresql', brand: '#4169E1' },
			{ name: 'HTML', icon: 'html5', brand: '#E34F26' },
			{ name: 'CSS', icon: 'css3', brand: '#1572B6' },
		],
	},
	{
		label: 'ML & Computer Vision',
		items: [
			{ name: 'PyTorch', icon: 'pytorch', brand: '#EE4C2C' },
			{ name: 'TensorFlow', icon: 'tensorflow', brand: '#FF6F00' },
			{ name: 'scikit-learn', icon: 'scikitlearn', brand: '#F7931E' },
			{ name: 'Ultralytics YOLOv8', icon: 'ultralytics', brand: '#0BFFE6', brandLight: '#00B3A4' },
			{ name: 'OpenCV', icon: 'opencv', brand: '#5C3EE8' },
			{ name: 'Roboflow', icon: 'roboflow', brand: '#A855F7', brandLight: '#6706CE' },
		],
	},
	{
		label: 'Generative AI & LLM',
		items: [
			{ name: 'LangChain', icon: 'langchain', brand: '#7FC8FF', brandLight: '#1C3C3C' },
			{ name: 'Hugging Face', icon: 'huggingface', brand: '#FFD21E' },
			{ name: 'Ollama', icon: 'ollama', brand: '#FFFFFF', brandLight: '#000000' },
			{ name: 'Claude', icon: 'claude', brand: '#D97757' },
			{ name: 'Gemini', icon: 'googlegemini', brand: '#886FBF' },
			{ name: 'Pydantic', icon: 'pydantic', brand: '#E92063' },
		],
	},
	{
		label: 'Infrastructure & MLOps',
		items: [
			{ name: 'FastAPI', icon: 'fastapi', brand: '#009688' },
			{ name: 'Next.js', icon: 'nextdotjs', brand: '#FFFFFF', brandLight: '#000000' },
			{ name: 'Supabase', icon: 'supabase', brand: '#3FCF8E' },
			{ name: 'Azure', icon: 'microsoftazure', brand: '#3CA9F0', brandLight: '#0078D4' },
			{ name: 'AWS', icon: 'amazonwebservices', brand: '#FF9900' },
			{ name: 'Elasticsearch', icon: 'elasticsearch', brand: '#00BFB3', brandLight: '#005571' },
			{ name: 'n8n', icon: 'n8n', brand: '#EA4B71' },
			{ name: 'Vitest', icon: 'vitest', brand: '#6E9F18' },
			{ name: 'Playwright', icon: 'playwright', brand: '#2EAD33' },
		],
	},
	{
		label: 'Data & Visualization',
		items: [
			{ name: 'pandas', icon: 'pandas', brand: '#E70488', brandLight: '#150458' },
			{ name: 'NumPy', icon: 'numpy', brand: '#4DABCF', brandLight: '#013243' },
			{ name: 'Matplotlib', icon: 'matplotlib', brand: '#4A8BC2', brandLight: '#11557C' },
			{ name: 'Plotly', icon: 'plotly', brand: '#7B88C9', brandLight: '#3F4F75' },
			{ name: 'Power BI', icon: 'powerbi', brand: '#F2C811' },
			{ name: 'Power Platform', icon: 'powerplatform', brand: '#B985C4', brandLight: '#742774' },
		],
	},
	{
		label: 'Tools',
		items: [
			{ name: 'Git & GitHub', icon: 'github', brand: '#FFFFFF', brandLight: '#181717' },
			{ name: 'GitHub Copilot', icon: 'githubcopilot', brand: '#FFFFFF', brandLight: '#000000' },
			{ name: 'VS Code', icon: 'visualstudiocode', brand: '#007ACC' },
			{ name: 'Jupyter', icon: 'jupyter', brand: '#F37626' },
			{ name: 'Google Colab', icon: 'googlecolab', brand: '#F9AB00' },
			{ name: 'Kaggle', icon: 'kaggle', brand: '#20BEFF' },
		],
	},
];
