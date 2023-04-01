
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