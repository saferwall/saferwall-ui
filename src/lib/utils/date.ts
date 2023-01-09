/**
 * Return the year from a timestamp
 * @param time timestamp
 * @returns year
 */
export function getMemberSince(time: number): number {
    const date = new Date();
    date.setTime(time * 1000);
    return date.getFullYear();
}

/**
 * Converts a timestamp to a formatted date string.
 * @param timestamp The timestamp to convert.
 * @returns The formatted date string in the format "YYYY-MM-DD H:i:s".
 */
export const timestampToFormattedDate = (timestamp: number): string => {
    return new Date(timestamp).toISOString().slice(0, -5).replace('T', ' ');
}