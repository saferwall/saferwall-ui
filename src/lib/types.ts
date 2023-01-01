export interface Author {
    member_since: number;
    username: string;
}

export interface FileMultiav {
    count: number;
    value: number;
}

export interface FileTags {
    [key: string]: any;
}

export interface File {
    filename: string;
    hash: string;
    multiav: FileMultiav;
    tags?: FileTags;
    class?: string;
}

export interface Activity {
    id: string;
    file?: File;
    author: Author;
    date: number;
    type: ActivityType;
    follow: boolean;
    target?: string;
}

export interface Tag {
    category: string;
    name: string;
}

export type ActivityType = 'comment' | 'like' | 'submit';