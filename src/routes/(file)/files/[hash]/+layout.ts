import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';
import { fileMenu } from '$lib/data/menus';
import type { FileMenu } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, url }): Promise<{
    file: any,
    activeMenu: FileMenu,
    hash: string
}> => {
    const { hash } = params;

    const initReq: { cache?: RequestCache | undefined } = {};
    if (browser) {
        initReq.cache = "force-cache";
    }

    const fileReq = await fetch(`${env.PUBLIC_API_URL}/files/${hash}?fields=first_seen,submissions,sha256,last_scanned,multiav`, initReq);

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