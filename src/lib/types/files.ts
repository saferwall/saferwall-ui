export interface FileMultiav {
    count: number;
    value: number;
}

export interface FileTags {
    [key: string]: any;
}


export interface APIFile {
    filename: string;
    hash: string;
    multiav: FileMultiav;
    tags?: FileTags;
    class?: string;
    file_format?: string;
    pe?: any;
    submissions?: any[];
    liked?: boolean;
}