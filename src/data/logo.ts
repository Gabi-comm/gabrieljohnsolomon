/**
 * The "G." mark as a 13×10 dot matrix (Nothing-style glyph). Same geometry as
 * the old pixel logo — each former 1×1 unit is now one dot.
 *
 * `cells` are the lit dots of the G; `period` is the red full stop.
 */
export const LOGO_COLS = 13;
export const LOGO_ROWS = 10;

function on(x: number, y: number): boolean {
	const top = y <= 1 && x <= 9;
	const left = x <= 1;
	const bottom = y >= 8 && x <= 9;
	const right = x >= 8 && x <= 9 && y >= 5 && y <= 7;
	const tab = y >= 5 && y <= 6 && x >= 5 && x <= 9;
	return x <= 9 && (top || left || bottom || right || tab);
}

export interface Dot {
	x: number;
	y: number;
	/** Order in which the dot lights up in the intro (row-major sweep). */
	i: number;
}

const cells: Dot[] = [];
const period: Dot[] = [];
const off: Dot[] = [];
let i = 0;
for (let y = 0; y < LOGO_ROWS; y++) {
	for (let x = 0; x < LOGO_COLS; x++) {
		if (on(x, y)) cells.push({ x, y, i: i++ });
		else if (x >= 11 && y >= 8) period.push({ x, y, i: 0 });
		else off.push({ x, y, i: 0 });
	}
}

export const LOGO_CELLS = cells;
export const LOGO_PERIOD = period;
/** Unlit matrix positions, drawn faintly for the full "display" look. */
export const LOGO_OFF = off;
