import type { ActivityType, pe, Tag } from "$lib/types";

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
 * Parse label class to icon
 * @param classification label
 * @returns icon
 */
export function getLabelIcon(classification?: string): string {
    return labels[getLabelClass(classification)];
}

/**
 * Parse mixed tags to basic tag name & category
 * @param fileTags mix of tags with value type string|array
 * @returns list of simple tag name & category
 */
export function parseTags(fileTags: any): Tag[] {
    return Object.keys(fileTags).reduce((tags: Tag[], category: string) => {
        let items: string | string[] | undefined = fileTags[category];

        if (!items) {
            return tags;
        }

        if (!Array.isArray(items)) {
            items = [items];
        }

        items.forEach((name) => {
            tags.push({
                name: name,
                category: category.toLowerCase()
            });
        });

        return tags;
    }, [])
}

/**
 *  
 * @param timestamp
 * @returns time ago format
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
 * 
 * @param timestamp
 * @returns ISO date format
 */
export function timeToDateISO(timestamp: number): string {
    const date = new Date();
    date.setTime(timestamp);

    return date.toISOString();
}