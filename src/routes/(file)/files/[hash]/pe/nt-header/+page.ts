import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }): Promise<{
    ntHeader: any
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache, body?: any } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }
    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}?fields=pe.nt_header`, initReq);

    const { pe } = await fileReq.json();


    const signature = pe.nt_header?.Signature;
    if (signature) {
        pe.nt_header.FileHeader.Signature = signature;
        delete pe.nt_header?.Signature;
    }

    const dataDirectory = pe.nt_header?.OptionalHeader?.DataDirectory;
    if (dataDirectory) {
        pe.nt_header.DataDirectory = dataDirectory;
        delete pe.nt_header?.OptionalHeader?.DataDirectory;
    }

    return {
        ntHeader: pe.nt_header
    };

}) satisfies PageLoad;