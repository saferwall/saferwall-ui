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
