import type { APIFile } from "./files";

export interface APIUser {
    type: string;
    username: string;
    name: string;
    location: string;
    url: string;
    bio: string;
    confirmed: boolean;
    member_since: number;
    last_seen: number;
    admin: boolean;
    following: string[];
    following_count: number;
    followers: string[];
    followers_count: number;
    likes: string[];
    likes_count: number;
    submissions_count: number;
    comments_count: number;
}

export interface APIBaseItem {
    id: string;
    file: File;
    date: number;
    liked: boolean;
}
export interface APIItemFollow {
    id: string;
    username: string;
    follow: boolean;
    member_since: number;
}

export interface APILike extends APIBaseItem { }
export interface APISubmission extends APIBaseItem { }
export interface APIComment extends APIBaseItem {
    comment: string;
}

export interface APIFollower extends APIItemFollow { }
export interface APIFollowing extends APIItemFollow { }


export type APIItem = APILike | APIComment | APISubmission | APIFollower | APIFollowing | any;