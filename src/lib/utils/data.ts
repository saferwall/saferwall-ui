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


export const randomErrorQuote = (): string => {
    return [
        "Oops! It looks like we've hit a glitch in the system. Don't worry, our team is on it. If you're still experiencing errors, please don't hesitate to contact us.",
        "Something's not quite right...but don't worry, we're on the case! If you're still having issues, please get in touch with our team.",
        "Uh oh, it looks like we've encountered a bit of a snag. Our team is hard at work fixing it as we speak. If you're still experiencing errors, please reach out to us.",
        "Looks like we've run into a bit of a hiccup. Hang tight while we work on getting things back to normal. If you're still encountering issues, please contact our team.",
        "Whoops, it looks like something's gone awry. Don't worry, we're on it and everything will be up and running again soon. If you're still experiencing errors, please don't hesitate to reach out to us."
    ][Math.floor(Math.random() * 5)];
}