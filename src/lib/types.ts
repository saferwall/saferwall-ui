import type { APIFile } from "./types/files";

export interface Error {
    details: unknown;
    message: string;
    status: number;
}

export interface FileMenu {
    name: string;
    fullName?: string;
    path: string;
}

export interface PEMenu {
    path: string;
    title: string;
    field: string;
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

export interface Session {
    token: string;
    username: string;
}

export interface User {
    admin: boolean;
    type: string;
    email: string;
    username: string;
    confirmed: boolean;
    location: string;
    name: string;
    url: string;
    bio: string;
    has_avatar: boolean;
    likes_count: number;
    comments_count: number;
    following_count: number;
    followers_count: number;
    submissions_count: number;
    likes: string[];
    following: string[];
    followers: string[];
    last_seen: number;
    member_since: number;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
}

export interface ChangePasswordData {
    guid: string;
    token: string;
    password: string;
}

export interface UpdateProfileData {
    username: string;
    name: string;
    bio: string;
    location: string;
    url: string;
}

export interface UpdateEmailData {
    username: string;
    email: string;
    password: string;
}

export interface UpdatePasswordData {
    username: string;
    old: string;
    new_password: string;
}


export interface QueueFile {
    file: File;
    status: number;
    hash?: string;
    error?: string;
    updateStatus: () => void;
    uploadFile: () => void;
}