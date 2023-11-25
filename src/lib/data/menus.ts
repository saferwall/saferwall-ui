import type { Menus } from '$lib/types';

export const fileMenu: Menus.File[] = [
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

export const peMenu: Menus.PE[] = [
	{ field: 'dos_header', path: 'dos-header', title: 'DOS Header' },
	{ field: 'nt_header', path: 'nt-header', title: 'NT Header' },
	{ field: 'rich_header', path: 'rich-header', title: 'Rich Header' },
	{ field: 'sections', path: 'sections', title: 'Sections' },
	{ field: 'export', path: 'export', title: 'Export' },
	{ field: 'import', path: 'imports', title: 'Imports' },
	{ field: 'resource', path: 'resource', title: 'Resource' },
	{ field: 'exceptions', path: 'exceptions', title: 'Exceptions' },
	{ field: 'security', path: 'certificate', title: 'Certificate' },
	{ field: 'reloc', path: 'relocations', title: 'Relocations' },
	{ field: 'debug', path: 'debugs', title: 'Debugs' },
	{ field: 'tls', path: 'tls', title: 'TLS' },
	{ field: 'load_config', path: 'load-config', title: 'Load config' },
	{ field: 'bound_import', path: 'bound-imports', title: 'Bound imports' },
	{ field: 'iat', path: 'iat', title: 'IAT' },
	{ field: 'delay_import', path: 'delay-imports', title: 'Delay import' },
	{ field: 'clr', path: 'clr', title: 'CLR' }
];
