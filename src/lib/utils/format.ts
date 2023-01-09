import type { ActivityType } from "$lib/types";

const labels: { [key: string]: string } = {
    benign: 'safe',
    malicious: 'unsafe',
    unknown: 'unsafe',
}

const activityTypes: { [key: string]: string } = {
    comment: 'commented on file',
    like: 'liked a file',
    submit: 'submitted a file',
}

/**
 * get activity title by giving activity type
 * @param type activity type
 * @returns title
 */
export function getActivityTitle(type: ActivityType): string {
    return activityTypes[type];
}

/**
 * Parse label class
 * @param classification label
 * @returns classfication
 */
export function getLabelClass(classification?: string): string {
    if (!classification) {
        return `unknown`;
    }
    return classification.split('.')[1].toLowerCase();
}

/**
 * Returns the icon for a given classification label.
 * @param classification label
 * @returns icon
 */
export function getLabelIcon(classification?: string): string {
    return labels[getLabelClass(classification)];
}

/**
 * Returns a string representing the time elapsed since the given timestamp.
 * @param timestamp The timestamp to calculate the elapsed time from. Can be a number or a Date object.
 * @returns A string in the format "X time ago", where X is the elapsed time and time is a unit of time (e.g. "2 weeks ago").
 */
export function timeSince(timestamp: number | Date) {
    const date = (timestamp instanceof Date) ? timestamp : new Date(timestamp);
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
 * Converts bytes to kilobytes, megabytes, or gigabytes, depending on the size of the input value.
 * @param bytes The number of bytes to convert.
 * @returns The size in the appropriate unit (kilobytes, megabytes, or gigabytes). The result is rounded to two decimal places.
 */
export const convertBytes = (bytes: number): string => {
    if (bytes < 1024) {
        return bytes + 'B';
    }
    if (bytes < 1048576) {
        return (bytes / 1024).toFixed(2) + 'KB';
    }
    if (bytes < 1073741824) {
        return (bytes / 1048576).toFixed(2) + 'MB';
    }

    return (bytes / 1073741824).toFixed(2) + 'GB';
}

/**
 * Converts a timestamp to an ISO string.
 * @param timestamp The timestamp to convert.
 * @returns The ISO string representation of the timestamp.
 */
export function timeToDateISO(timestamp: number): string {
    const date = new Date();
    date.setTime(timestamp);

    return date.toISOString();
}

export function getFileTypeIcon(type: string | undefined): string {
    return `tmp`;
}