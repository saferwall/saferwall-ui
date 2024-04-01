export const cn = (...classes: any[]): string => {
	return classes.filter(Boolean).map(String).join(' ');
};

export const fileTypeColors = {
	zip: '#1E81CE',
	rar: '#C9774E',
	'7zip': '#5DA318',
	'7z': '#5DA318',
	gzip: '#7E47AA',
	...['gzip', 'gz', 'tar', 'bz2', 'xz', 'lzh'].reduce(
		(acc, name) => ({ ...acc, [name]: '#7E47AA' }),
		{}
	),

	html: '#F5851D',
	xml: '#39969C',
	...['js', 'vbs', 'wsf', 'css', 'php', 'python', 'java', 'ruby', 'swift', 'sql', 'json'].reduce(
		(acc, name) => ({ ...acc, [name]: '#B84FC9' }),
		{}
	),

	ps1: '#61595B',
	bat: '#845ED6',
	sh: '#9F9C62',
	...[
		'bash',
		'csh',
		'ksh',
		'zsh',
		'fish',
		'ps1',
		'psm1',
		'psd1',
		'pssc',
		'psrc',
		'ps2',
		'psm2',
		'pssc',
		'psrc',
		'ps1xml',
		'psc1',
		'psdc'
	].reduce((acc, name) => ({ ...acc, [name]: '#9F9C62' }), {}),

	exe: '#4B74DC',
	dll: '#DC4B4B',
	sys: '#D6AC18',
	sysy: '#D6AC18',
	cpl: '#337968',

	jpg: '#27A96B',
	jpeg: '#27A96B',
	png: '#67948C',
	svg: '#C37070',
	bmp: '#2964BB',
	gif: '#71475B',

	doc: '#D48032',
	xls: '#678194',
	rft: '#95C370',
	ppt: '#926CD0',

	mp4: '#C82761',
	mp3: '#1947C2',
	'mach-o': '#0B0B0B',
	jar: '#F58219',
	apk: '#25BF47',
	lnk: '#55597C',
	elf: '#37373D',
	iso: '#428E36',
	txt: '#563AA6',
	pdf: '#FB3449'
};
