import type { Tag } from "$lib/types";

/**
 * Parse mixed tags to basic tag name & category
 * @param fileTags mix of tags with value type string|array
 * @returns list of simple tag name & category
 */
export function parseTags(fileTags: any): Tag[] {
    const visitedTags: string[] = [];
    return Object.keys(fileTags).reduce((tags: Tag[], category: string) => {
        let items: string | string[] | undefined = fileTags[category];

        if (!items) {
            return tags;
        }

        if (!Array.isArray(items)) {
            items = [items];
        }

        items.forEach((name) => {
            const uniqueName = name.toLowerCase();

            if (!visitedTags.includes(uniqueName)) {
                visitedTags.push(uniqueName);

                tags.push({
                    name: name,
                    category: category.toLowerCase()
                });
            }

        });

        return tags;
    }, [])
}

/**
 * Returns a randomly selected, friendly error message
 * @returns {string} A randomly selected error quote.
 */
export const randomErrorQuote = (): string => {
    const quotes = [
        "Oops! It looks like we've hit a glitch in the system. Our team is working to resolve it. Please contact us if the issue persists.",
        "Something seems to have gone wrong. We are investigating and will get back to you soon. Please let us know if you continue to experience problems.",
        "We apologize for the inconvenience. Our team is addressing the issue and will have it resolved shortly. If you need further assistance, please reach out to us.",
        "We're sorry for the trouble. We're working to fix the problem as soon as possible. If you're still having trouble, please don't hesitate to contact us.",
        "Whoops! It looks like something has gone wrong. We're on it and will have everything back to normal soon. Please reach out to us if you still need help."
    ];
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
}

