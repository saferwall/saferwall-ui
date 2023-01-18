export interface Scan {
    [key: string]: {
        infected: boolean;
        output: string;
        update: number;
    }
}

export interface Multiav {
    first_scan: Scan;
    last_scan: Scan;
}

export interface APIAntivirus {
    first_seen: number;
    last_scanned: number;
    multiav: Multiav;
    comments_count: number;
}
