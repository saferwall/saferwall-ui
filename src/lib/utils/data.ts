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
