import { env } from "$env/dynamic/public";
import { browser } from "$app/environment";

import type { APIFile } from "./types/files";
import type { APIUser } from "./types/users";
import type { LoginData, RegisterData, Session, User } from "./types";

export type APIConfig = {
    url: string;
}

export class APIClient {
    private static apiConfig: APIConfig = {
        url: `${env.PUBLIC_API_URL}`
    }

    private static cacheRequest(init: RequestInit): RequestInit {
        if (browser) {
            init.cache = "force-cache";
        }

        return init;
    }

    public static async request<T>(
        endpoint: string,
        cache: boolean = false,
        args: any = {}
    ): Promise<T> {
        const url = `${this.apiConfig.url}/${endpoint}`;
        const init: RequestInit = {
            headers: {
                "Content-Type": "application/json"
            },
            ...args,
        };
        if (cache) {
            this.cacheRequest(init);
        }
        const response = await fetch(url, init);

        if (!response.ok) {
            throw response;
        }

        return response.json();
    }

    static async getFile(id: string): Promise<APIFile> {
        return this.request<APIFile>(`files/${id}`, true);
    }

    static async getUser(username: string): Promise<User> {
        return this.request<User>(`users/${username}`, true);
    }

    static async singIn(data: LoginData): Promise<Session> {
        return this.request<Session>('auth/login', false, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    static async signUp(data: RegisterData): Promise<Session> {
        return this.request<Session>('users/', false, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    static async logOut(): Promise<any> {
        return this.request('auth/logout', false, {
            method: 'DELETE'
        });
    }
}
