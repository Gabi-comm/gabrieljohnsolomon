/// <reference types="astro/client" />

declare global {
	interface Window {
		/** The theme button lives in the persisted header; bind its listener once. */
		themeToggleInitialized?: boolean;
		/** Pending timeout that removes the theme cross-fade class after a toggle. */
		themeAnimTimer?: number;
		/** Set when the reveal observer is running; the head script's fallback checks it. */
		__revealReady?: boolean;
	}
}

export {};
