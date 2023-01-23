export interface Author {
    member_since: number;
    username: string;
}

export interface APIComment {
    author: Author;
    comment: string;
    date: number;
    id: string;
}