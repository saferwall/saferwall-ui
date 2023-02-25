import { APIClient } from '$lib/api';
import { fileMenu } from '$lib/data/menus';
import type { FileMenu } from '$lib/types';
import type { APIFile } from '$lib/types/files';
import type { LayoutLoad } from './$types';

export const load = (async ({ params, url }): Promise<{
    file: any,
    activeMenu: FileMenu,
    fileMenu: FileMenu[],
    hash: string,
    paths: string[]
}> => {
    const { hash } = params;

    const file = await APIClient.request<APIFile>(`files/${hash}?fields=first_seen,submissions,sha256,last_scanned,multiav,file_format,pe.meta`);

    const paths = url.pathname.toString().split(`/files/`)[1].split('/');

    const activePath = paths[1];
    const activeMenu = fileMenu.find(menu => menu.path === activePath)! || {};

    const menus = [...fileMenu].filter(menu => {
        if (
            `${menu.name}`.toLowerCase() === 'pe' &&
            `${file.file_format}`.toLowerCase() !== 'pe'
        ) {
            return false;
        }

        return true;
    });


    return {
        hash,
        file,
        paths,
        activeMenu,
        fileMenu: menus
    };

}) satisfies LayoutLoad;