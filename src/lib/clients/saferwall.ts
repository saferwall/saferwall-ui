import { env } from '$env/dynamic/public';
import { DEFAULT_PAGINATION_ITEMS } from '$lib/config';
import type {
	ApiTraceBufferDto,
	ChangePasswordDto,
	LoginDto,
	Pagination,
	RegisterDto,
	Saferwall,
	UpdateEmailDto,
	UpdatePasswordDto,
	UpdateProfileDto
} from '$lib/types';
import { fileMenu } from '$lib/data/menu';
import { fileMenuStore, peMenuStore } from '$lib/utils/fileMenu';

type DBI<T> = { main: T, default_behavior_report: { id: string } }

export class SaferwallClient {
	session?: Saferwall.Session;
	fetch?: (...args: any[]) => Promise<Response>;
	get authorization() {
		if (this.session && this.session.token) {
			return `Bearer ${this.session.token}`;
		}

		return undefined;
	}

	public with(fetch: (...args: any[]) => Promise<any>) {
		return new SaferwallClient(this.session, fetch);
	}

	private config: Saferwall.Config = {
		url: `${env.PUBLIC_API_URL}`,
		artifactsUrl: `${env.PUBLIC_ARTIFACTS_URL}`
	};

	private get isLoggedIn(): boolean {
		return this.authorization !== undefined;
	}

	constructor(session?: Saferwall.Session, fetch?: (...args: any[]) => Promise<any>) {
		this.fetch = fetch;
		this.setSession(session);
	}

	public setSession(session?: Saferwall.Session) {
		this.session = session;
	}

	public removeSession() {
		this.session = undefined;
	}
	public async request<T>(endpoint: string, args: RequestInit = {}, toJson = true, mimicBrowser = true): Promise<T> {
		const urlString = `${endpoint.startsWith("https://") ? "" : this.config.url}${endpoint}`;
		const init: RequestInit = {
			headers: {
				...(mimicBrowser ? { "User-Agent": "Chromium" } : {}),
				...(args.headers ?? {})
			},
			...args
		};
		if (init.method === "POST") {
			init.headers = {
				...init.headers,
				"Content-Type": "application/json"
			};
		}
		const _fetch = this.fetch ?? fetch;
		const response: any = await _fetch(urlString, 
			this.setAuthHeaders(init)
		);

		if (!response.ok) {
			throw response;
		}

		
		if (toJson) {
			let ret = await response.json();
			if (endpoint.match(/^\/?files\/[0-9a-f]{64}/)) {
				let ui = ret.ui;
				if (ui) {
					let ui_tabs: string[] = ui.tabs;
					let pe_meta: string[] = ui.pe;
					let newFileMenu = fileMenu
						.filter(el => ui_tabs.includes(el.realPath ?? el.path))
					fileMenuStore.set(newFileMenu);
					peMenuStore.set(pe_meta);
				}
			}
			return ret;
		}

		return response;
	}

	public async getActivities(pagination?: Pagination) {
		return this.request<Saferwall.Pagination<Saferwall.Activity>>(
			`users/activities` + this.generatePaginateQuery(pagination)
		);
	}

	public async getUserSectionItems<T = Saferwall.Activities.Root>(
		username: string,
		section: string,
		pagination?: Pagination
	) {
		return this.request<Saferwall.Pagination<T>>(
			`users/${username}/${section}` + this.generatePaginateQuery(pagination)
		);
	}

	public async getFileStatus(hash: string): Promise<number> {
		return this.request<{ status: number }>(`files/${hash}?fields=status&${Date.now()}`).then(
			(res) => res.status
		);
	}

	public async uploadFile(file: File): Promise<Saferwall.File> {
		const data: any = new FormData();
		data.append('file', file);

		return this.request<Saferwall.File>(`files/`, {
			method: 'POST',
			headers: {
				'Content-Length': `${file.size}`
			},
			body: data
		});
	}

	public async getFile(hash: string) {
		return this.request<Saferwall.File>(`files/${hash}`);
	}

	public async getFileMeta(hash: string) {
		const fields = [
			'first_seen',
			'submissions',
			'sha256',
			'last_scanned',
			'multiav',
			'file_format',
			'pe.meta'
		];

		return this.request<Saferwall.File>(
			`files/${hash}?${new URLSearchParams({
				fields: fields.join(',')
			})}`
		);
	}

	public async getFileSummary(hash: string) {
		return this.request<Saferwall.File & Saferwall.Summary>(`files/${hash}/summary`).then(
			(file) => {
				return {
					...file,
					default_behavior_report: file.default_behavior_report
						? {
								...file.default_behavior_report,
								screenshots: Array(file.default_behavior_report.screenshots_count || 0)
									.fill(null)
									.map((_, index) => {
										return {
											preview: `${this.config.artifactsUrl}${hash}/${
												file.default_behavior_report!.id
											}/screenshots/${index}.min.jpeg`,
											original: `${this.config.artifactsUrl}${hash}/${
												file.default_behavior_report!.id
											}/screenshots/${index}.jpeg`
										};
									})
							}
						: undefined
				};
			}
		);
	}

	public async getFileApiTrace(
		behaviorId: string,
		pagination?: Pagination & Partial<{ pid: string[] }>
	) {
		return this.request<Saferwall.Pagination<Saferwall.Behaviors.ApiTrace.Item>>(
			`behaviors/${behaviorId}/api-trace` + this.generatePaginateQuery(pagination)
		);
	}

	public async getFileApiTraceHash(
		hash: string,
		pagination?: Pagination & Partial<{ pid: string[] }>
	) {
		const ret = await (this.fetch ?? fetch)(`/api/default_behavior_id/${hash}/api-trace` + this.generatePaginateQuery(pagination));
		return await ret.json() as DBI<Saferwall.Pagination<Saferwall.Behaviors.ApiTrace.Item>>;
	}

	public async getFileProcessTree(behaviorId: string) {
		return this.request<{ proc_tree: Saferwall.Behaviors.ProcessItem[] }>(
			`behaviors/${behaviorId}?fields=proc_tree`
		).then((res) => res.proc_tree ?? []);
	}

	public async getFileProcessTreeHash(hash: string) {
		return await (this.fetch ?? fetch)(`/api/default_behavior_id/${hash}?fields=proc_tree`)
		.then((res) => res.json())
		.then(res => res.proc_tree ?? []) as Promise<DBI<Saferwall.Behaviors.ProcessItem[]>>;
	}

	public async getFileSystemEvents(behaviorId: string, pid?: string) {
		const params = new URLSearchParams();
		if (pid) {
			params.append('pid', pid);
		}

		return this.request<Saferwall.Pagination<Saferwall.Behaviors.SystemEvent>>(
			`behaviors/${behaviorId}/sys-events${(params && '?' + params.toString()) || ''}`
		).then((res) => res.items ?? []);
	}

	public async getBehaviorArtifacts(
		behaviorId: string,
		categories?: string[],
		pagination?: Pagination,
		query?: string,
	) {
		const params = this.generatePaginationParams(pagination);
		if (categories && categories.length > 0) {
			params.append('kind', categories.join(","));
		}
		if (query) {
			params.append("q", query);
		}

		return this.request<Saferwall.Pagination<Saferwall.Behaviors.Artifacts>>(
			`behaviors/${behaviorId}/artifacts?` + params.toString()
		);
	}

	public async getBehaviorArtifactsHash(
		hash: string,
		categories?: string[],
		pagination?: Pagination
	) {
		const params = this.generatePaginationParams(pagination);
		if (categories && categories.length > 0) {
			categories.forEach((kind) => params.append('kind', kind));
			// params.append('kind', categories.join(","));
		}

		let ret = await (this.fetch ?? fetch)(`/api/default_behavior_id/${hash}/artifacts?` + params.toString());
		return await ret.json() as DBI<Saferwall.Pagination<Saferwall.Behaviors.Artifacts>>;
	}

	// TODO: (API) Implement pid filtering
	public async getFileCapabilities(behaviorId: string, pid?: string) {
		const params = new URLSearchParams();
		if (pid) {
			params.append('pid', pid);
		}

		return this.request<{ capabilities: Saferwall.Behaviors.Capability[] }>(
			`behaviors/${behaviorId}?fields=capabilities`
		).then((res) => res.capabilities ?? []);
	}

	public async getFileBuffData({
		hash,
		behaviorId,
		procName,
		pid,
		tid,
		buffId
	}: ApiTraceBufferDto) {
		return this.request<Response>(
			`${this.config.artifactsUrl}${hash}/${behaviorId}/api-buffers/${procName}__${pid}__${tid}__${buffId}.buff`,
			{
				headers: {}
			},
			false
		).then((res) => res.arrayBuffer());
	}

	public async rescanFile(hash: string) {
		return this.request<unknown>(`files/${hash}/rescan`, {
			method: 'POST'
		});
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

	public async login(data: LoginDto) {
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
			this.removeSession();
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

	private generatePaginationParams(pagination?: Pagination): URLSearchParams {
		const params = {
			per_page: String(DEFAULT_PAGINATION_ITEMS),
			...(pagination ?? {})
		} as Pagination<string>;

		const query = new URLSearchParams({ ...params });

		if (this.isLoggedIn && query.size > 0) {
			// query.append('logged', '');
		}

		return query;
	}

	private generatePaginateQuery(pagination?: Pagination): string {
		const query = this.generatePaginationParams(pagination);

		if (query.size === 0) {
			return '';
		}
		return '?' + query.toString();
	}
}
