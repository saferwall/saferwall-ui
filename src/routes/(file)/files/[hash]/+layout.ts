import { browser } from '$app/environment';
import { fileMenu } from '$lib/data/menus';
import type { FileMenu } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, url }): Promise<{
    file: any,
    activeMenu: FileMenu,
    hash: string
}> => {
    const { hash } = params;

    const headers: { cache?: RequestCache | undefined } = {};
    if (browser) {
        headers.cache = "force-cache";
    }

    const fileReq = await fetch(`https://api.saferwall.com/v1/files/${hash}?fields=first_seen,submissions,sha256,last_scanned,multiav`, { ...headers });

    const file = await fileReq.json();

    const paths = url.pathname.toString().split('/');
    const activePath = paths[paths.length - 1];
    const activeMenu = fileMenu.find(menu => menu.path === activePath)!;

    return {
        hash,
        file,
        activeMenu,
    };

}) satisfies LayoutLoad;