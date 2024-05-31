import type { artifactsKinds } from '$lib/utils';

export namespace Saferwall {
	export type ActivityType = 'comment' | 'like' | 'submit';
	export type ProfileSection = 'likes' | 'comments' | 'submissions' | 'followers' | 'following';

	export type Config = {
		url: string;
		artifactsUrl: string;
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
		pe: Pe.Root;
		submissions?: any[];
		liked?: boolean;
		type?: string | 'file';
		status?: number;
		default_behavior_id?: string;
		default_behavior_report?: Behaviors.DefaultReport;
	}

	export namespace Pe {
		export interface Root {
			sections: any[];
			exception: any[];
			delay_import: any[];
			boundImport: any[];
			iat?: any;
			debug?: Debug;
			dos_header?: any;
			security?: Security;
			rich_header?: RicheHeader;
			load_config?: LoadConfig.Root;
			clr?: CLR.Root;
			tls: {
				struct: any;
				callbacks: any;
			};
			[key: string]: any;
		}

		export namespace LoadConfig {
			export interface Root {
				cfgiat: Cfgiat[];
				gfids: Gfids[];
				load_cfg_struct: LoadCfgStruct;
				seh: SEH[];
				cfg_long_jump: CFGLongJump[];
				volatile_metadata: VolatileMetadata;
				dvrt: DVRT.Root[];
				chpe: unknown;
				enclave: unknown;
				struct: unknown;
			}

			export interface Sutrct {
				cast_guard_os_determined_failure_mode: number;
				chpe_metadata_pointer: number;
				code_integrity: CodeIntegrity;
				critical_section_default_timeout: number;
				csd_version: number;
				de_commit_free_block_threshold: number;
				de_commit_total_free_threshold: number;
				dependent_load_flags: number;
				dynamic_value_reloc_table: number;
				dynamic_value_reloc_table_offset: number;
				dynamic_value_reloc_table_section: number;
				edit_list: number;
				enclave_configuration_pointer: number;
				global_flags_clear: number;
				global_flags_set: number;
				guard_address_taken_iat_entry_count: number;
				guard_address_taken_iat_entry_table: number;
				guard_cf_check_function_pointer: number;
				guard_cf_dispatch_function_pointer: number;
				guard_cf_function_count: number;
				guard_cf_function_table: number;
				guard_eh_continuation_count: number;
				guard_eh_continuation_table: number;
				guard_flags: number;
				guard_long_jump_target_count: number;
				guard_long_jump_target_table: number;
				guard_memcpy_function_pointer: number;
				guard_rf_failure_routine: number;
				guard_rf_failure_routine_function_pointer: number;
				guard_rf_verify_stack_pointer_function_pointer: number;
				guard_xfg_check_function_pointer: number;
				guard_xfg_dispatch_function_pointer: number;
				guard_xfg_table_dispatch_function_pointer: number;
				hot_patch_table_offset: number;
				lock_prefix_table: number;
				major_version: number;
				maximum_allocation_size: number;
				minor_version: number;
				process_affinity_mask: number;
				process_heap_flags: number;
				reserved_2: number;
				reserved_3: number;
				se_handler_count: number;
				se_handler_table: number;
				security_cookie: number;
				size: number;
				time_date_stamp: number;
				virtual_memory_threshold: number;
				volatile_metadata_pointer: number;
			}

			export namespace DVRT {
				export interface Root {
					entries: Entry[];
					imgdyn_reloc_table: ImgDynRelocTable;
				}

				export interface Entry {
					img_dyn_reloc: ImgDynReloc;
					reloc_blocks: RelocBlock[];
				}

				export interface ImgDynReloc {
					base_reloc_size: number;
					symbol: number;
				}

				export interface RelocBlock {
					img_base_reloc: ImgBaseReloc;
					type_offsets: TypeOffset[];
				}

				export interface ImgBaseReloc {
					size_of_block: number;
					virtual_address: number;
				}

				export interface TypeOffset {
					dynamic_symbol_offset: number;
					type: number;
					value: number;
				}

				export interface ImgDynRelocTable {
					size: number;
					version: number;
				}
			}

			export type SEH = number;
			export type CFGLongJump = number;

			export interface Cfgiat {
				description: string;
				iat_value: number;
				int_value: number;
				rva: number;
			}

			export interface Gfids {
				description: string;
				flags: number;
				target: number;
			}

			export interface LoadCfgStruct {
				cast_guard_os_determined_failure_mode: number;
				chpe_metadata_pointer: number;
				code_integrity: CodeIntegrity;
				critical_section_default_timeout: number;
				csd_version: number;
				de_commit_free_block_threshold: number;
				de_commit_total_free_threshold: number;
				dependent_load_flags: number;
				dynamic_value_reloc_table: number;
				dynamic_value_reloc_table_offset: number;
				dynamic_value_reloc_table_section: number;
				edit_list: number;
				enclave_configuration_pointer: number;
				global_flags_clear: number;
				global_flags_set: number;
				guard_address_taken_iat_entry_count: number;
				guard_address_taken_iat_entry_table: number;
				guard_cf_check_function_pointer: number;
				guard_cf_dispatch_function_pointer: number;
				guard_cf_function_count: number;
				guard_cf_function_table: number;
				guard_eh_continuation_count: number;
				guard_eh_continuation_table: number;
				guard_flags: number;
				guard_long_jump_target_count: number;
				guard_long_jump_target_table: number;
				guard_memcpy_function_pointer: number;
				guard_rf_failure_routine: number;
				guard_rf_failure_routine_function_pointer: number;
				guard_rf_verify_stack_pointer_function_pointer: number;
				guard_xfg_check_function_pointer: number;
				guard_xfg_dispatch_function_pointer: number;
				guard_xfg_table_dispatch_function_pointer: number;
				hot_patch_table_offset: number;
				lock_prefix_table: number;
				major_version: number;
				maximum_allocation_size: number;
				minor_version: number;
				process_affinity_mask: number;
				process_heap_flags: number;
				reserved_2: number;
				reserved_3: number;
				se_handler_count: number;
				se_handler_table: number;
				security_cookie: number;
				size: number;
				time_date_stamp: number;
				virtual_memory_threshold: number;
				volatile_metadata_pointer: number;
			}

			export interface CodeIntegrity {
				catalog: number;
				catalog_offset: number;
				flags: number;
				reserved: number;
			}

			export interface VolatileMetadata {
				access_rva_table: number[];
				info_range_table: InfoRangeTable[];
				struct: Struct;
			}

			export interface InfoRangeTable {
				rva: number;
				size: number;
			}

			export interface Struct {
				size: number;
				version: number;
				volatile_access_table: number;
				volatile_access_table_size: number;
				volatile_info_range_table: number;
				volatile_info_range_table_size: number;
			}
		}

		export namespace CLR {
			export interface Root {
				clr_header: ClrHeader;
				metadata_header: MetadataHeader;
				metadata_stream_headers: MetadataStreamHeader[];
				metadata_tables: MetadataTables;
				metadata_tables_stream_header: MetadataTablesStreamHeader;
			}

			export interface ClrHeader {
				cb: number;
				code_manager_table: CodeManagerTable;
				entry_point_rva_or_token: number;
				export_address_table_jumps: ExportAddressTableJumps;
				flags: number;
				major_runtime_version: number;
				managed_native_header: ManagedNativeHeader;
				metadata: MetaData;
				minor_runtime_version: number;
				resources: Resources;
				strong_name_signature: StrongNameSignature;
				v_table_fixups: VtableFixups;
			}

			export interface CodeManagerTable {
				size: number;
				virtual_address: number;
			}

			export interface ExportAddressTableJumps {
				size: number;
				virtual_address: number;
			}

			export interface ManagedNativeHeader {
				size: number;
				virtual_address: number;
			}

			export interface MetaData {
				size: number;
				virtual_address: number;
			}

			export interface Resources {
				size: number;
				virtual_address: number;
			}

			export interface StrongNameSignature {
				size: number;
				virtual_address: number;
			}

			export interface VtableFixups {
				size: number;
				virtual_address: number;
			}

			export interface MetadataHeader {
				extra_data: number;
				flags: number;
				major_version: number;
				minor_version: number;
				signature: number;
				streams: number;
				version: string;
				version_string: number;
			}

			export interface MetadataStreamHeader {
				name: string;
				offset: number;
				size: number;
			}

			export type MetadataTables = Record<string, MetadataTable>;

			export interface Content {
				enc_base_id: number;
				enc_id: number;
				generation: number;
				mvid: number;
				name: number;
			}

			export interface MetadataTable {
				content: any;
				count_cols: number;
				name: string;
				size_record: number;
			}

			export interface MetadataTablesStreamHeader {
				heaps: number;
				major_version: number;
				mask_valid: number;
				minor_version: number;
				reserved: number;
				rid: number;
				sorted: number;
			}
		}

		export type Debug = Debug.All;
		export type Security = Record<string, any>;
		export type RicheHeader = Record<string, any>;
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
			size: number;
			Name: string;

			Characteristics: number;
			MajorVersion: number;
			MinorVersion: number;
			NumberOfIDEntries: number;
			NumberOfNamedEntries: number;
			time_date_stamp: number;
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

	export namespace Behaviors {
		export interface DefaultReport {
			id: string;
			capabilities: Capability[];
			screenshots_count: number;
			screenshots?: Screenshots;
		}

		export namespace ApiTrace {
			export interface Entry {
				name: string;
				type: string;
				value: EntryValue;
			}

			export type EntryValue = Partial<{
				val: any;
				in: any;
				out: any;
				buf_id: any;
				in_id: any;
				out_id: any;
			}>;

			export interface Item {
				args: Array<{
					value: string;
				}>;
				name: string;
				pid: string;
				ret: string;
				tid: string;
				ts: number;

				values: Entry[];

				// virtual
				_open?: boolean;
				_args?: string;
			}
		}

		export enum Detection {
			CLEAN = 'clean',
			UNKNWON = 'unknown',
			MALICIOUS = 'malicious'
		}
		export interface ProcessItem {
			detection: Detection;
			file_type: string;
			parent_link: string;
			parent_pid: string;
			path: string;
			pid: string;
			proc_name: string;
		}
		export type ProcessTree = ProcessItem[];
		export type NestedProcessTree = ProcessItem & { children: NestedProcessTree[] };

		export interface SystemEvent {
			op: 'create' | 'read' | 'write' | 'string';
			path: string;
			pid: string;
			type: string;
		}

		export interface Capability {
			category: string;
			description: string;
			module: string;
			pid: string;
			rule_id: string;
			severity: string;
		}

		export interface Artifacts {
			detection: string;
			file_type: string;
			kind: keyof typeof artifactsKinds;
			matched_rules: string[];
			name: string;
			sha256: string;
			size: number;

			// Virtual
			_open?: boolean;
		}
	}

	export type Exif = Partial<{
		CodeSize: string;
		EntryPoint: string;
		ExifToolVersionNumber: string;
		Filesize: number | string;
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
		size: number;
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

	export enum PeMeta {
		DOS_HEADER = 'dos_header',
		RICH_HEADER = 'rich_header',
		NT_HEADER = 'nt_header',
		SECTIONS = 'sections',
		EXPORT = 'export',
		IMPORT = 'import',
		RESOURCE = 'resource',
		RELOC = 'reloc',
		DEBUG = 'debug',
		TLS = 'tls',
		LOAD_CONFIG = 'load_config',
		IAT = 'iat',
		DELAY_IMPORT = 'delay_import',
		SECURITY = 'security',
		EXCEPTIONS = 'exceptions',
		BOUND_IMPORT = 'bound_import',
		CLR = 'clr'
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
		pe_meta: PeMeta[];
		properties: Properties;
		sha256: string;
		signature: string;
		submissions: Submission[];
	}

	export interface Screenshot {
		preview: string;
		original: string;
	}

	export type Screenshots = Saferwall.Screenshot[];

	export namespace Activities {
		export interface Root {
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

		export interface Like extends Root {}
		export interface Submission extends Root {}
		export interface Comment extends Root {
			comment: string;
		}

		export interface Follower extends Follow {}
		export interface Following extends Follow {}

		export type All = Like | Comment | Submission | Follower | Following | any;
	}

	export namespace Debug {
		export enum Type {
			EX_DLL_CHAR = 20,
			CODE_VIEW = 2,
			REPRO = 16,
			VC_FEATURE = 12,
			FPO = 3,
			POGO = 13
		}

		export type Struct<K> = {
			address_if_raw_data: number;
			characteristics: number;
			major_version: number;
			minor_version: number;
			pointer_to_raw_data: number;
			size_of_data: number;
			time_date_stamp: number;
			type: K;
		};

		export type EX_DLL_CHAR = Data<Type.EX_DLL_CHAR, 1>;

		export type POGO = Data<
			Type.POGO,
			{
				entries: Array<{
					name: string;
					rva: number;
					size: number;
				}>;
				signature: number;
			}
		>;

		export type CODE_VIEW = Data<
			Type.CODE_VIEW,
			{
				age: number;
				cv_signature: number;
				pdb_file_name: string;
				signature: {
					data1: number;
					data2: number;
					data3: number;
					data4: Array<number>;
				};
			}
		>;

		export type REPRO = Data<
			Type.REPRO,
			{
				hash: string;
				size: number;
			}
		>;

		export type VC_FEATURE = Data<
			Type.VC_FEATURE,
			{
				'/GS': number;
				'/sdl': number;
				'C/C++': number;
				GuardN: number;
				'Pre VC 11': number;
			}
		>;

		export type FPO = Data<
			Type.FPO,
			{
				frame_type: number;
				has_seh: number;
				num_locals: number;
				off_start: number;
				params_size: number;
				proc_size: number;
				prolog_length: number;
				reserved: number;
				saved_regs_count: number;
				use_bp: number;
			}[]
		>;

		export interface Data<K, T> {
			info: T;
			struct: Struct<K>;
		}

		export type List<T> = Array<T>;
		export type All =
			| List<CODE_VIEW>
			| List<EX_DLL_CHAR>
			| List<POGO>
			| List<REPRO>
			| List<VC_FEATURE>
			| List<FPO>;
	}
}
