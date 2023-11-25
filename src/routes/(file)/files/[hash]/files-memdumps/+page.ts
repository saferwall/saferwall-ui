import type { PageLoad } from './$types';

const categoriesList = [
	{ label: 'Simples files', name: 'simple' },
	{ label: 'Embeddeds files', name: 'embedded' },
	{ label: 'Modified files', name: 'modified' },
	{ label: 'Dropped files', name: 'dropped' },
	{ label: 'Memory buffers', name: 'memory' },
	{ label: 'Downloaded files', name: 'download' }
];

export const load = (async ({ url, parent }) => {
	const search = url.searchParams.get('search');
	const categories = url.searchParams
		.get('categories')
		?.toLowerCase()
		?.split(',')
		?.filter((c) => categoriesList.find((_) => _.name === c));

	const pagination = {
		items: Array(10)
			.fill(null)
			.map((_, i) => {
				return {
					filename: 'C:\\Users\\trojan.exe',
					category: 'Simple file',
					type: 'Binary',
					veridict: Math.random() > 0.5 ? 'malicious' : 'clean',
					link: '#',
					metadata: {
						CRC32: '0x7017fca6',
						'File Size': '92.50 KB',
						Type: 'application/vnd.microsoft.portable-executable',
						MD5: '6468ee100d88c71d55dfdcf4e30f991e',
						SHA1: '5c520d2d7dc4c9e5d536d3aff998185657d40ac8',
						SSDeep: '5c520d2d7dc4c9e5d536d3aff998185657d40ac8',
						SHA256: 'b102ed1018de0b7faea37ca86f27ba3025c0c70f28417ac3e9ef09d32617f801'
					},
					open: i === 3
				};
			})
	};

	return {
		search: typeof search === 'string' ? search : undefined,
		pagination,
		categories: categoriesList,
		filters: {
			categories
		}
	};
}) satisfies PageLoad;
