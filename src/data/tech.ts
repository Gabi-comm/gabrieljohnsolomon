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
			{ name: 'MySQL', icon: 'mysql', brand: '#4479A1' },
			{ name: 'HTML', icon: 'html5', brand: '#E34F26' },
			{ name: 'CSS', icon: 'css3', brand: '#1572B6' },
		],
	},
	{
		label: 'Machine Learning & AI',
		items: [
			{ name: 'TensorFlow', icon: 'tensorflow', brand: '#FF6F00' },
			{ name: 'scikit-learn', icon: 'scikitlearn', brand: '#F7931E' },
			{ name: 'Ultralytics', icon: 'ultralytics', brand: '#0BFFE6', brandLight: '#00B3A4' },
			{ name: 'OpenCV', icon: 'opencv', brand: '#5C3EE8' },
			{ name: 'LangChain', icon: 'langchain', brand: '#7FC8FF', brandLight: '#1C3C3C' },
			{ name: 'Hugging Face', icon: 'huggingface', brand: '#FFD21E' },
			{ name: 'Roboflow', icon: 'roboflow', brand: '#A855F7', brandLight: '#6706CE' },
		],
	},
	{
		label: 'Data & Visualization',
		items: [
			{ name: 'NumPy', icon: 'numpy', brand: '#4DABCF', brandLight: '#013243' },
			{ name: 'pandas', icon: 'pandas', brand: '#E70488', brandLight: '#150458' },
			{ name: 'Matplotlib', icon: 'matplotlib', brand: '#4A8BC2', brandLight: '#11557C' },
			{ name: 'Power BI', icon: 'powerbi', brand: '#F2C811' },
			{ name: 'Power Platform', icon: 'powerplatform', brand: '#B985C4', brandLight: '#742774' },
			{ name: 'Kaggle', icon: 'kaggle', brand: '#20BEFF' },
		],
	},
	{
		label: 'Tools',
		items: [
			{ name: 'GitHub', icon: 'github', brand: '#FFFFFF', brandLight: '#181717' },
			{ name: 'VS Code', icon: 'visualstudiocode', brand: '#007ACC' },
			{ name: 'Jupyter', icon: 'jupyter', brand: '#F37626' },
			{ name: 'Google Colab', icon: 'googlecolab', brand: '#F9AB00' },
			{ name: 'GitHub Copilot', icon: 'githubcopilot', brand: '#FFFFFF', brandLight: '#000000' },
			{ name: 'Claude Code', icon: 'claude', brand: '#D97757' },
		],
	},
];
