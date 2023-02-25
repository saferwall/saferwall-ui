import type { APIFile } from "./types/files";

export interface FileMenu {
    name: string;
    fullName?: string;
    path: string;
}

export interface Author {
    member_since: number;
    username: string;
}

export interface Activity {
    id: string;
    file?: APIFile;
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

export type ProfileSection = 'likes' | 'comments' | 'submissions' | 'followers' | 'following';