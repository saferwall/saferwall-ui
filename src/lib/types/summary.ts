export interface Exif {
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
}

export interface Multiav {
    count: number;
    value: number;
}

export interface Tags {
    eset: string;
    packer: string[];
    pe: string[];
    windefender: string;
}

export interface Properties {
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
}

export interface Submission {
    country: string;
    filename: string;
    src: string;
    timestamp: number;
}

export default interface APISummary {
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
