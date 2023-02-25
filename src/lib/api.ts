import { browser } from "$app/environment";
import type { APIFile } from "./types/files";
import type { APIUser } from "./types/users";
import { env } from "$env/dynamic/public";

export type APIConfig = {
    url: string;
}

export class APIClient {
    private static apiConfig: APIConfig = {
        url: `${env.PUBLIC_API_URL}`
    }

    private static get cacheMode(): RequestCache {
        return browser ? "force-cache" : "default";
    }

    public static async request<T>(
        endpoint: string,
        ...args: any
    ): Promise<T> {
        const url = `${this.apiConfig.url}/${endpoint}`;
        const init: RequestInit = {
            cache: this.cacheMode,
            headers: {
                "Content-Type": "application/json"
            },
            ...args,
        };
        const response = await fetch(url, init);
        return response.json();
    }

    static async getFile(id: string): Promise<APIFile> {
        return this.request<APIFile>(`files/${id}`);
    }

    static async getUser(username: string): Promise<APIUser> {
        return this.request<APIUser>(`users/${username}`);
    }
}
