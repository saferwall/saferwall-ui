export namespace Saferwall {
	export type ActivityType = 'comment' | 'like' | 'submit';
	export type ProfileSection = 'likes' | 'comments' | 'submissions' | 'followers' | 'following';

	export type Config = {
		url: string;
	};

	export interface Pagination<T = any> {
		page: number;
		per_page: number;
		page_count: number;
		total_count: number;
		items: T[];
	}

	export interface Author {
		member_since: number;
		username: string;
	}

	export interface Activity {
		id: string;
		file?: File;
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

	export interface File {
		filename: string;
		hash?: string;
		sha256: string;
		multiav: Multiav;
		tags?: Tags;
		class?: string;
		file_format?: string;
		pe?: any;
		submissions?: any[];
		liked?: boolean;
		type?: string | 'file';
		status?: number;
		default_behavior_id?: string;
	}

	export interface ScanResult {
		infected: boolean;
		output: string;
		update: number;
	}
	export interface Scan {
		[key: string]: ScanResult;
	}

	export type Multiav = Partial<{
		first_scan: Scan;
		last_scan: Scan;
		count: number;
		value: number;
	}>;

	export interface Antivirus {
		first_seen: number;
		last_scanned: number;
		multiav: Multiav;
		comments_count: number;
	}

	export interface Comment {
		author: Author;
		comment: string;
		date: number;
		id: string;
	}

	export interface Strings {
		[key: string]: string[];
	}

	export namespace Resource {
		export interface Struct {
			CodePage: number;
			OffsetToData: number;
			Reserved: number;
			Size: number;
			Name: string;

			Characteristics: number;
			MajorVersion: number;
			MinorVersion: number;
			NumberOfIDEntries: number;
			NumberOfNamedEntries: number;
			TimeDateStamp: number;
		}

		export interface Data {
			Lang: number;
			Struct: Struct;
			Sublang: number;
		}

		export interface Entry {
			Data: Data;
			Directory: Directory;
			ID: number;
			Name: string;
			Struct: Struct;
			Entries?: Entry[];
		}

		export interface Directory {
			Entries: Entry[];
			Struct: Struct;
		}
	}

	export namespace Report {
		export type Item = {
			args: Array<{
				value: string;
			}>;
			name: string;
			pid: string;
			ret: string;
			tid: string;
			ts: number;

			values: Value[];
		};

		export type Value = {
			name: string;
			type: string;
			value: {
				val?: string;
				in?: string;
				out?: string;
				[key: string]: unknown;
			};
		};
	}

	export type Exif = Partial<{
		CodeSize: string;
		EntryPoint: string;
		ExifToolVersionNumber: string;
		FileSize: number | string;
		FileType: string;
		FileTypeExtension: string;
		ImageFileCharacteristics: string;
		ImageVersion: string;
		InitializedDataSize: string;
		LinkerVersion: string;
		MachineType: string;
		MimeType: string;
		OsVersion: string;
		PeType: string;
		Subsystem: string;
		SubsystemVersion: string;
		UninitializedDataSize: string;
	}> & {
		[key: string]: any;
	};

	export type Tags = Partial<{
		eset: string;
		packer: string[];
		pe: string[];
		windefender: string;
	}> & {
		[key: string]: any;
	};

	export type Properties = Partial<{
		CRC32: string;
		MD5: string;
		Magic: string;
		Packer: string[];
		SHA1: string;
		SHA256: string;
		SHA512: string;
		SSDeep: string;
		Size: number;
		Tags: Tags;
		TrID: string[];
	}> & {
		[key: string]: any;
	};

	export interface Submission {
		country: string;
		filename: string;
		src: string;
		timestamp: number;
	}

	export interface Indicator {
		description: string;
		severity: string;
		category: string;
		module: string;
	}

	export interface Summary {
		class: string;
		comments_count: number;
		exif: Exif;
		file_extension: string;
		file_format: string;
		first_seen: number;
		last_scanned: number;
		liked: boolean;
		multiav: Multiav;
		properties: Properties;
		sha256: string;
		signature: string;
		submissions: Submission[];
	}

	export namespace Activities {
		export interface Base {
			id: string;
			file: File;
			date: number;
			liked: boolean;
		}
		export interface Follow {
			id: string;
			username: string;
			follow: boolean;
			member_since: number;
		}

		export interface Like extends Base {}
		export interface Submission extends Base {}
		export interface Comment extends Base {
			comment: string;
		}

		export interface Follower extends Follow {}
		export interface Following extends Follow {}

		export type All = Like | Comment | Submission | Follower | Following | any;
	}

	export namespace ApiCall {
		export interface Entry {
			name: string;
			type: string;
		}

		export type EntryValue =
			| {
					val: any;
			  }
			| {
					in: any;
					out: any;
			  }
			| {
					in_buf_id: any;
					out_buf_id: any;
			  };
	}
}
