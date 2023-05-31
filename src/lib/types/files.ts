export interface FileMultiav {
    count: number;
    value: number;
}

export interface FileTags {
    [key: string]: any;
}


export interface APIFile {
    filename: string;
    sha256: string;
    multiav: FileMultiav;
    tags?: FileTags;
    class?: string;
    file_format?: string;
    pe?: any;
    submissions?: any[];
    liked?: boolean;
    type?: string | 'file';
    status?: number;
}