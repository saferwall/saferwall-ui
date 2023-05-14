import { env } from "$env/dynamic/public";
import { browser } from "$app/environment";

import type { APIFile } from "./types/files";
import type {
    Activity, User, Session,
    ChangePasswordData, LoginData, RegisterData, UpdateProfileData
} from "./types";

export type APIConfig = {
    url: string;
}

export class APIClient {
    private authorization: string | undefined;
    private apiConfig: APIConfig = {
        url: `${env.PUBLIC_API_URL}`
    }

    constructor(session?: Session) {
        if (session && session.token) {
            this.authorization = `Bearer ${session.token}`;
        }
    }

    private cacheRequest(init: RequestInit): RequestInit {
        if (browser) {
            init.cache = "force-cache";
        }

        return init;
    }

    private setAuthHeaders(init: RequestInit): RequestInit {
        if (this.authorization) {
            init.headers = {
                ...init.headers,
                'Authorization': this.authorization
            }
        }

        return init;
    }

    public async request<T>(
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

        this.setAuthHeaders(init);

        const response = await fetch(url, init);
        if (!response.ok) {
            throw response;
        }

        return response.json();
    }

    public async getActivities(): Promise<Activity[]> {
        return this.request<Activity[]>(`users/activities?per_page=10`);
    }

    public async getFile(id: string): Promise<APIFile> {
        return this.request<APIFile>(`files/${id}`, true);
    }

    public async getUser(username: string): Promise<User> {
        return this.request<User>(`users/${username}`, true);
    }

    public async singIn(data: LoginData): Promise<Session> {
        return this.request<Session>('auth/login', false, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    public async signUp(data: RegisterData): Promise<Session> {
        return this.request<Session>('users/', false, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    public async sendConfirmation(email: string): Promise<Session> {
        return this.request<Session>('auth/resend-confirmation', false, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        });
    }

    public async resetPassword(email: string): Promise<Session> {
        return this.request<Session>('auth/reset-password', false, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        });
    }

    public async changePassword(data: ChangePasswordData): Promise<Session> {
        return this.request<Session>('auth/password', false, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    public async updateProfile(data: UpdateProfileData): Promise<Session> {
        if (!data.username) {
            throw new Error('Update profile failed: invalid empty username');
        }

        return this.request<Session>(`users/${data.username}`, false, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    public async logOut(): Promise<any> {
        return this.request('auth/logout', false, {
            method: 'DELETE'
        });
    }
}
