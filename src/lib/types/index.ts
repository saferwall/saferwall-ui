import type { Saferwall } from './saferwall';

export * from './dto';
export * from './pagination';
export * from './saferwall';

export interface Error {
	details: unknown;
	message: string;
	status: number;
}

export namespace Menu {
	export interface File {
		realPath?: string;
		name: string;
		path: string;
		fullName?: string;
	}

	export interface PE {
		path: string;
		title: string;
		field: string;
	}
}

export interface QueueFile {
	file: File;
	status: number;
	hash?: string;
	error?: string;

	updateStatus: () => void;
	uploadFile: () => void;
}
