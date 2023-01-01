export interface Author {
    member_since: number;
    username: string;
}

export interface Multiav {
    count: number;
    value: number;
}

export interface Tags {
    [key: string]: any;
}

export interface File {
    filename: string;
    hash: string;
    multiav: Multiav;
    tags?: Tags;
    class?: string;
}

export interface Activity {
    id: string;
    file?: File;
    author: Author;
    date: number;
    type: string;
    follow: boolean;
    target?: string;
}
