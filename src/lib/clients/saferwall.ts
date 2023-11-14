import { env } from '$env/dynamic/public';
import { DEFAULT_PAGINATION_ITEMS } from '$lib/config';

import type {
	ChangePasswordDto,
	LoginDto,
	Pagination,
	RegisterDto,
	Saferwall,
	UpdateEmailDto,
	UpdatePasswordDto,
	UpdateProfileDto
} from '$lib/types';

export class SaferwallClient {
	private authorization?: string;

	private config: Saferwall.Config = {
		url: `${env.PUBLIC_API_URL}`
	};

	private get isLoggedIn(): boolean {
		return this.authorization !== undefined;
	}

	constructor(session?: Saferwall.Session) {
		if (session && session.token) {
			this.authorization = `Bearer ${session.token}`;
		}
	}

	public async request<T>(endpoint: string, args: any = {}): Promise<T> {
		const url = `${this.config.url}${endpoint}`;
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

	public async getActivities(pagination?: Pagination) {
		return this.request<Saferwall.Pagination<Saferwall.Activity>>(
			`users/activities` + (pagination ? '?' + this.generatePaginateQuery(pagination) : '')
		);
	}

	public async getUserSectionItems<T>(username: string, section: string, pagination?: Pagination) {
		return this.request<Saferwall.Pagination<T>>(
			`users/${username}/${section}?` + this.generatePaginateQuery(pagination)
		);
	}

	public async getFileStatus(hash: string): Promise<number> {
		return this.request<{ status: number }>(`files/${hash}?fields=status`).then(
			(res) => res.status
		);
	}

	public async uploadFile(file: File): Promise<Saferwall.File> {
		const data: any = new FormData();
		data.append('file', file);

		return this.request<Saferwall.File>(`files/`, {
			method: 'POST',
			headers: {
				'Content-Length': file.size
			},
			body: data
		});
	}

	public async getFile(hash: string) {
		return this.request<Saferwall.File>(`files/${hash}`);
	}

	public async getFileMeta(hash: string) {
		return this.request<Saferwall.File>(
			`files/${hash}?fields=first_seen,submissions,sha256,last_scanned,multiav,file_format,pe.meta,liked`
		);
	}

	public async getFileSummary(hash: string) {
		return this.request<Saferwall.File & Saferwall.Summary>(`files/${hash}/summary`);
	}

	public async getFileReport(report_id: string, pagination?: Pagination) {
		return this.request<Saferwall.Pagination<Saferwall.Report.Item>>(
			`behaviors/${report_id}/api-trace?` + this.generatePaginateQuery(pagination)
		);
	}

	public async getUser(username: string) {
		return this.request<Saferwall.User>(`users/${username}`);
	}

	public async followUser(username: string, follow: boolean = true) {
		const type = follow ? 'follow' : 'unfollow';

		return this.request<unknown>(`users/${username}/${type}`, {
			method: 'POST'
		});
	}

	public async likeFile(hash: string, like: boolean = true) {
		const type = like ? 'like' : 'unlike';

		return this.request<unknown>(`files/${hash}/${type}`, {
			method: 'POST'
		});
	}

	public async singIn(data: LoginDto) {
		return this.request<Saferwall.Session>('auth/login', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	public async signUp(data: RegisterDto) {
		return this.request<Saferwall.Session>('users/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	public async sendConfirmation(email: string) {
		return this.request<Saferwall.Session>('auth/resend-confirmation', {
			method: 'POST',
			body: JSON.stringify({
				email
			})
		});
	}

	public async resetPassword(email: string) {
		return this.request<Saferwall.Session>('auth/reset-password', {
			method: 'POST',
			body: JSON.stringify({
				email
			})
		});
	}

	public async changePassword(data: ChangePasswordDto) {
		return this.request<Saferwall.Session>('auth/password', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	public async updateProfile(data: UpdateProfileDto) {
		return this.request<Saferwall.Session>(`users/${data.username}`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	public async updateEmail(data: UpdateEmailDto) {
		return this.request<Saferwall.Session>(`users/${data.username}/email`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	public async updatePassword(data: UpdatePasswordDto) {
		return this.request<Saferwall.Session>(`users/${data.username}/password`, {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
	}

	public async deleteAccount(username: string) {
		return this.request<any>(`users/${username}`, {
			method: 'DELETE'
		});
	}

	public async logOut() {
		return this.request('auth/logout', {
			method: 'DELETE'
		}).then(() => {
			this.authorization = undefined;
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
		const params = {
			per_page: String(DEFAULT_PAGINATION_ITEMS),
			...pagination
		} as Pagination<string>;

		const query = new URLSearchParams({ ...params });

		if (this.isLoggedIn) {
			query.append('logged', '');
		}

		return query.toString();
	}
}
