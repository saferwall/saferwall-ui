import { Saferwall, type Menu } from '$lib/types';

export const fileMenu: Menu.File[] = [
	{ name: 'Summary', path: 'summary' },
	{
		name: 'PE',
		fullName: 'PE (Portable Executable)',
		path: 'pe'
	},
	{ name: 'Strings', path: 'strings' },
	{ name: 'Antivirus', path: 'antivirus' },
	{ name: 'Dynamic Overview', path: 'dynamic-overview' },
	{ name: 'API Calls', path: 'api-calls' },
	{ name: 'Files & MemDumps', path: 'files-memdumps' },
	{ name: 'Comments', path: 'comments' }
];

export const peMenu: Menu.PE[] = [
	{ field: Saferwall.PeMeta.DOS_HEADER, path: 'dos-header', title: 'DOS Header' },
	{ field: Saferwall.PeMeta.NT_HEADER, path: 'nt-header', title: 'NT Header' },
	{ field: Saferwall.PeMeta.RICH_HEADER, path: 'rich-header', title: 'Rich Header' },
	{ field: Saferwall.PeMeta.SECTIONS, path: 'sections', title: 'Sections' },
	{ field: Saferwall.PeMeta.EXPORT, path: 'export', title: 'Export' },
	{ field: Saferwall.PeMeta.IMPORT, path: 'imports', title: 'Imports' },
	{ field: Saferwall.PeMeta.RESOURCE, path: 'resource', title: 'Resource' },
	{ field: Saferwall.PeMeta.EXCEPTIONS, path: 'exception', title: 'Exceptions' },
	{ field: Saferwall.PeMeta.SECURITY, path: 'certificate', title: 'Certificate' },
	{ field: Saferwall.PeMeta.RELOC, path: 'relocations', title: 'Relocations' },
	{ field: Saferwall.PeMeta.DEBUG, path: 'debugs', title: 'Debugs' },
	{ field: Saferwall.PeMeta.TLS, path: 'tls', title: 'TLS' },
	{ field: Saferwall.PeMeta.LOAD_CONFIG, path: 'load-config', title: 'Load config' },
	{ field: Saferwall.PeMeta.BOUND_IMPORT, path: 'bound-imports', title: 'Bound imports' },
	{ field: Saferwall.PeMeta.IAT, path: 'iat', title: 'IAT' },
	{ field: Saferwall.PeMeta.DELAY_IMPORT, path: 'delay-imports', title: 'Delay import' },
	{ field: Saferwall.PeMeta.CLR, path: 'clr', title: 'CLR' }
];
