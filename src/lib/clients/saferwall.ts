import { env } from '$env/dynamic/public';

import type { APIPagination, Pagination } from '$lib/types/pagination';
import type {
	Activity,
	ChangePasswordData,
	LoginData,
	RegisterData,
	SaferwallConfig,
	Session,
	UpdateEmailData,
	UpdatePasswordData,
	UpdateProfileData,
	User
} from '../types';
import type { APIFile } from '../types/files';
import type APISummary from '../types/summary';

export class SaferwallClient {
	private authorization: string | undefined;
	private config: SaferwallConfig = {
		url: `${env.PUBLIC_API_URL}`
	};

	private get isLoggedIn(): boolean {
		return !!this.authorization;
	}

	constructor(session?: Session) {
		if (session && session.token) {
			this.authorization = `Bearer ${session.token}`;
		}
	}

	public async request<T>(endpoint: string, args: any = {}): Promise<T> {
		const url = `${this.config.url}/${endpoint}`;
		const init: RequestInit = {
			headers: {
				'Content-Type': 'application/json'
			},
			...args
		};

		this.setAuthHeaders(init);

		const response: any = await fetch(url, init);

		if (!response.ok) {
			throw response;
		}

		return response.json();
	}

	public async getActivities(pagination?: Pagination): Promise<APIPagination<Activity>> {
		return this.request(`users/activities?` + this.generatePaginateQuery(pagination));
	}

	public async getUserSectionItems<T>(
		username: string,
		section: string,
		pagination?: Pagination
	): Promise<APIPagination<T>> {
		return this.request(`users/${username}/${section}?` + this.generatePaginateQuery(pagination));
	}

	public async getFileStatus(hash: string): Promise<number> {
		return this.request<{ status: number }>(`files/${hash}?fields=status`).then(
			(res) => res.status
		);
	}
	public async uploadFile(file: File): Promise<APIFile> {
		const data: any = new FormData();
		data.append('file', file);

		return this.request<APIFile>(`files/`, {
			method: 'POST',
			headers: {
				'Content-Length': file.size
			},
			body: data
		});
	}

	public async getFile(hash: string): Promise<APIFile> {
		return this.request<APIFile>(`files/${hash}`);
	}

	public async getFileMeta(hash: string): Promise<APIFile> {
		return this.request<APIFile>(
			`files/${hash}?fields=first_seen,submissions,sha256,last_scanned,multiav,file_format,pe.meta,liked`
		);
	}

	public async getFileSummary(hash: string): Promise<APIFile & APISummary> {
		return this.request<APIFile & APISummary>(`files/${hash}/summary`);
	}

	public async getUser(username: string): Promise<User> {
		return this.request<User>(`users/${username}`);
	}

	public async followUser(username: string, follow: boolean = true): Promise<unknown> {
		const type = follow ? 'follow' : 'unfollow';

		return this.request<unknown>(`users/${username}/${type}`, {
			method: 'POST'
		});
	}

	public async likeFile(hash: string, like: boolean = true): Promise<unknown> {
		const type = like ? 'like' : 'unlike';

		return this.request<unknown>(`files/${hash}/${type}`, {
			method: 'POST'
		});
	}

	public async singIn(data: LoginData): Promise<Session> {
		return this.request<Session>('auth/login', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	public async signUp(data: RegisterData): Promise<Session> {
		return this.request<Session>('users/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	public async sendConfirmation(email: string): Promise<Session> {
		return this.request<Session>('auth/resend-confirmation', {
			method: 'POST',
			body: JSON.stringify({
				email
			})
		});
	}

	public async resetPassword(email: string): Promise<Session> {
		return this.request<Session>('auth/reset-password', {
			method: 'POST',
			body: JSON.stringify({
				email
			})
		});
	}

	public async changePassword(data: ChangePasswordData): Promise<Session> {
		return this.request<Session>('auth/password', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	public async updateProfile(data: UpdateProfileData): Promise<Session> {
		return this.request<Session>(`users/${data.username}`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	public async updateEmail(data: UpdateEmailData): Promise<Session> {
		return this.request<Session>(`users/${data.username}/email`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	public async updatePassword(data: UpdatePasswordData): Promise<Session> {
		return this.request<Session>(`users/${data.username}/password`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	public async deleteAccount(username: string): Promise<any> {
		return this.request<any>(`users/${username}`, {
			method: 'DELETE'
		});
	}

	public async logOut(): Promise<any> {
		return this.request('auth/logout', {
			method: 'DELETE'
		});
	}

	private setAuthHeaders(init: RequestInit): RequestInit {
		if (this.isLoggedIn) {
			init.headers = {
				...init.headers,
				Authorization: this.authorization!
			};
		}

		return init;
	}

	private generatePaginateQuery(pagination?: Pagination): string {
		const query = new URLSearchParams({
			per_page: '1'
		});

		if (pagination) {
			const { page, per_page } = pagination || {};
			query.append('page', `${page}`);
			query.append('per_page', `${per_page}`);

			if (this.isLoggedIn) {
				query.append('logged', '');
			}
		}

		return query.toString();
	}
}
