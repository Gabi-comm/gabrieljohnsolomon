/// <reference types="astro/client" />

declare global {
	interface Window {
		/**
		 * Guards against re-initialising the background canvas. The canvas element is
		 * `transition:persist`, so it survives client-side navigation and its
		 * animation loop must only ever be started once per page load.
		 */
		starCanvasInitialized?: boolean;
		/** Same idea for the theme button's click listener. */
		themeToggleInitialized?: boolean;
	}
}

export {};
