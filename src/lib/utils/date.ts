/**
 * Return the year from a timestamp
 * @param time timestamp
 * @returns year
 */
export function getMemberSince(timestamp: number): number {
	const date = new Date(timestamp * 1000);
	return date.getFullYear();
}

/**
 * Converts a timestamp to a formatted date string.
 * @param timestamp The timestamp to convert.
 * @returns The formatted date string in the format "YYYY-MM-DD H:i:s".
 */
export const timestampToFormattedDate = (timestamp: number): string => {
	return new Date(timestamp * 1000).toISOString().slice(0, -5).replace('T', ' ');
};

/**
 * Returns a string representing the time elapsed since the given timestamp.
 * @param timestamp The timestamp to calculate the elapsed time from. Can be a number or a Date object.
 * @returns A string in the format "X time ago", where X is the elapsed time and time is a unit of time (e.g. "2 weeks ago").
 */
export function timeSince(timestamp: number | Date) {
	const date = timestamp instanceof Date ? timestamp : new Date(timestamp * 1000);
	const formatter = new Intl.RelativeTimeFormat();
	const ranges: any = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1
	};
	const secondsElapsed = (date.getTime() - Date.now()) / 1000;
	for (const key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const rangeKey: any = key;
			const delta = secondsElapsed / ranges[rangeKey];
			return formatter.format(Math.round(delta), rangeKey);
		}
	}
}

/**
 * Converts a timestamp to an ISO string.
 * @param timestamp The timestamp to convert.
 * @returns The ISO string representation of the timestamp.
 */
export function timeToDateISO(timestamp: number): string {
	const date = new Date();
	date.setTime(timestamp * 1000);
	return date.toISOString();
}
