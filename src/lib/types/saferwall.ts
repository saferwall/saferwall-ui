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
				Struct: any;
				Callbacks: any;
			};
			[key: string]: any;
		}

		export namespace LoadConfig {
			export interface Root {
				CFGIAT: Cfgiat[];
				GFIDS: Gfids[];
				LoadCfgStruct: LoadCfgStruct;
				SEH: SEH[];
				CFGLongJump: CFGLongJump[];
				VolatileMetadata: VolatileMetadata;
				DVRT: DVRT.Root[];
			}

			export namespace DVRT {
				export interface Root {
					Entries: Entry[];
					ImgDynRelocTable: ImgDynRelocTable;
				}

				export interface Entry {
					ImgDynReloc: ImgDynReloc;
					RelocBlocks: RelocBlock[];
				}

				export interface ImgDynReloc {
					BaseRelocSize: number;
					Symbol: number;
				}

				export interface RelocBlock {
					ImgBaseReloc: ImgBaseReloc;
					TypeOffsets: TypeOffset[];
				}

				export interface ImgBaseReloc {
					SizeOfBlock: number;
					VirtualAddress: number;
				}

				export interface TypeOffset {
					DynamicSymbolOffset: number;
					Type: number;
					Value: number;
				}

				export interface ImgDynRelocTable {
					Size: number;
					Version: number;
				}
			}

			export type SEH = number;
			export type CFGLongJump = number;

			export interface Cfgiat {
				Description: string;
				IATValue: number;
				INTValue: number;
				RVA: number;
			}

			export interface Gfids {
				Description: string;
				Flags: number;
				Target: number;
			}

			export interface LoadCfgStruct {
				CHPEMetadataPointer: number;
				CSDVersion: number;
				CodeIntegrity: CodeIntegrity;
				CriticalSectionDefaultTimeout: number;
				DeCommitFreeBlockThreshold: number;
				DeCommitTotalFreeThreshold: number;
				DependentLoadFlags: number;
				DynamicValueRelocTable: number;
				DynamicValueRelocTableOffset: number;
				DynamicValueRelocTableSection: number;
				EditList: number;
				EnclaveConfigurationPointer: number;
				GlobalFlagsClear: number;
				GlobalFlagsSet: number;
				GuardAddressTakenIatEntryCount: number;
				GuardAddressTakenIatEntryTable: number;
				GuardCFCheckFunctionPointer: number;
				GuardCFDispatchFunctionPointer: number;
				GuardCFFunctionCount: number;
				GuardCFFunctionTable: number;
				GuardEHContinuationCount: number;
				GuardEHContinuationTable: number;
				GuardFlags: number;
				GuardLongJumpTargetCount: number;
				GuardLongJumpTargetTable: number;
				GuardRFFailureRoutine: number;
				GuardRFFailureRoutineFunctionPointer: number;
				GuardRFVerifyStackPointerFunctionPointer: number;
				GuardXFGCheckFunctionPointer: number;
				GuardXFGDispatchFunctionPointer: number;
				GuardXFGTableDispatchFunctionPointer: number;
				HotPatchTableOffset: number;
				LockPrefixTable: number;
				MajorVersion: number;
				MaximumAllocationSize: number;
				MinorVersion: number;
				ProcessAffinityMask: number;
				ProcessHeapFlags: number;
				Reserved2: number;
				Reserved3: number;
				SEHandlerCount: number;
				SEHandlerTable: number;
				SecurityCookie: number;
				Size: number;
				TimeDateStamp: number;
				VirtualMemoryThreshold: number;
				VolatileMetadataPointer: number;
			}

			export interface CodeIntegrity {
				Catalog: number;
				CatalogOffset: number;
				Flags: number;
				Reserved: number;
			}

			export interface VolatileMetadata {
				AccessRVATable: number[];
				InfoRangeTable: InfoRangeTable[];
				Struct: Struct;
			}

			export interface InfoRangeTable {
				Rva: number;
				Size: number;
			}

			export interface Struct {
				Size: number;
				Version: number;
				VolatileAccessTable: number;
				VolatileAccessTableSize: number;
				VolatileInfoRangeTable: number;
				VolatileInfoRangeTableSize: number;
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
				Cb: number;
				CodeManagerTable: CodeManagerTable;
				EntryPointRVAorToken: number;
				ExportAddressTableJumps: ExportAddressTableJumps;
				Flags: number;
				MajorRuntimeVersion: number;
				ManagedNativeHeader: ManagedNativeHeader;
				MetaData: MetaData;
				MinorRuntimeVersion: number;
				Resources: Resources;
				StrongNameSignature: StrongNameSignature;
				VTableFixups: VtableFixups;
			}

			export interface CodeManagerTable {
				Size: number;
				VirtualAddress: number;
			}

			export interface ExportAddressTableJumps {
				Size: number;
				VirtualAddress: number;
			}

			export interface ManagedNativeHeader {
				Size: number;
				VirtualAddress: number;
			}

			export interface MetaData {
				Size: number;
				VirtualAddress: number;
			}

			export interface Resources {
				Size: number;
				VirtualAddress: number;
			}

			export interface StrongNameSignature {
				Size: number;
				VirtualAddress: number;
			}

			export interface VtableFixups {
				Size: number;
				VirtualAddress: number;
			}

			export interface MetadataHeader {
				ExtraData: number;
				Flags: number;
				MajorVersion: number;
				MinorVersion: number;
				Signature: number;
				Streams: number;
				Version: string;
				VersionString: number;
			}

			export interface MetadataStreamHeader {
				Name: string;
				Offset: number;
				Size: number;
			}

			export type MetadataTables = Record<string, MetadataTable>;

			export interface Content {
				EncBaseID: number;
				EncID: number;
				Generation: number;
				Mvid: number;
				Name: number;
			}

			export interface MetadataTable {
				Content: any;
				CountCols: number;
				Name: string;
				SizeRecord: number;
			}

			export interface MetadataTablesStreamHeader {
				Heaps: number;
				MajorVersion: number;
				MaskValid: number;
				MinorVersion: number;
				Reserved: number;
				Rid: number;
				Sorted: number;
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

	export namespace Behaviors {
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
			severity: string;
		}
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
			AddressOfRawData: number;
			Characteristics: number;
			MajorVersion: number;
			MinorVersion: number;
			PointerToRawData: number;
			SizeOfData: number;
			TimeDateStamp: number;
			Type: K;
		};

		export type EX_DLL_CHAR = Data<Type.EX_DLL_CHAR, 1>;

		export type POGO = Data<
			Type.POGO,
			{
				Entries: Array<{
					Name: string;
					Rva: number;
					Size: number;
				}>;
				Signature: number;
			}
		>;

		export type CODE_VIEW = Data<
			Type.CODE_VIEW,
			{
				Age: number;
				CvSignature: number;
				PDBFileName: string;
				Signature: {
					Data1: number;
					Data2: number;
					Data3: number;
					Data4: Array<number>;
				};
			}
		>;

		export type REPRO = Data<
			Type.REPRO,
			{
				Hash: string;
				Size: number;
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
				FrameType: number;
				HasSEH: number;
				NumLocals: number;
				OffStart: number;
				ParamsSize: number;
				ProcSize: number;
				PrologLength: number;
				Reserved: number;
				SavedRegsCount: number;
				UseBP: number;
			}[]
		>;

		export interface Data<K, T> {
			Info: T;
			Struct: Struct<K>;
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
