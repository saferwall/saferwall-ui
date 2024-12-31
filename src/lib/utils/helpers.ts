export const isStringSHA256 = (str: string): boolean => {
	return typeof str === 'string' && str.match(/\b[A-Fa-f0-9]{64}\b/) !== null;
};

/**
 * Returns a randomly selected, friendly error message
 * @returns {string} A randomly selected error quote.
 */
export const randomErrorQuote = (): string => {
	const quotes = [
		"Oops! It looks like we've hit a glitch in the system. Our team is working to resolve it. Please contact us if the issue persists.",
		'Something seems to have gone wrong. We are investigating and will get back to you soon. Please let us know if you continue to experience problems.',
		'We apologize for the inconvenience. Our team is addressing the issue and will have it resolved shortly. If you need further assistance, please reach out to us.',
		"We're sorry for the trouble. We're working to fix the problem as soon as possible. If you're still having trouble, please don't hesitate to contact us.",
		"Whoops! It looks like something has gone wrong. We're on it and will have everything back to normal soon. Please reach out to us if you still need help."
	];

	return quotes[Math.floor(Math.random() * quotes.length)];
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error('(Clipboard) Failed to copy:', error);
		return false;
	}
};

export const orderObjectKeys = (obj: any) => {
	return Object.keys(obj)
		.sort()
		.reduce(
			(currentObj, key) => {
				currentObj[key] = obj[key];
				return currentObj;
			},
			{} as typeof obj
		);
};

export function cssClamp(min: string, max: string, rest: [minWidth?: number, maxWidth?: number] = [360, 1024]): string {
	rest[0] ??= 360;
	rest[1] ??= 1024;
	let [minWidth, maxWidth] = rest;
	// const slope = (parseInt(max) - parseInt(min)) / (maxWidth - minWidth);

	// // Construct the calc formula to reverse the incline if needed
	// const calcValue = `calc(${min} + ${slope} * (100vw - ${minWidth}px))`;

	// // Generate the CSS clamp string
	// return `clamp(${Math.min(parseInt(min), parseInt(max))}px, ${calcValue}, ${Math.max(parseInt(min), parseInt(max))}px)`;
	const slope = (parseInt(max) - parseInt(min)) / (maxWidth - minWidth);

	// Generate the calc formula
	const calcValue = `calc(${min} + ${slope} * (100vw - ${minWidth}px))`;
  
	// Use min and max functions to constrain the calc value
	return `calc(min(max(${calcValue}, ${Math.min(parseInt(min), parseInt(max))}px), ${Math.max(parseInt(min), parseInt(max))}px))`;
}

export function clamp(min: number, max: number) {
	return cssClamp(min + "px", max + "px");
}