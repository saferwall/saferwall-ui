/**
 * Return the year from a timestamp
 * @param time timestamp
 * @returns year
 */
export function member_since(time: number): number {
    const date = new Date();
    date.setTime(time * 1000);
    return date.getFullYear();
}

export function label_class(classification?: string): string {
    if (!classification) {
        return `Unknown`;
    }
    return classification.split('.')[1].toLowerCase();
}