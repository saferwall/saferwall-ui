import {
	certificateTypesMap,
	dataDirectoryMap,
	fileHeaderCharacteristicsMap,
	machinesMap,
	magicMap,
	prodIdsMap,
	publicAlgoMap,
	relocationTypesMap,
	sectionFlagMap,
	signaturesAlgoMap,
	subSystemsMap,
	unwFlagsMap,
	unwOpcodesMap
} from '$lib/data/translates';
import type { Saferwall } from '$lib/types';

const labels: { [key: string]: string } = {
	benign: 'safe',
	malicious: 'unsafe',
	unknown: 'unsafe'
};

const activityTypes: { [key: string]: string } = {
	comment: 'commented on file',
	like: 'liked a file',
	submit: 'submitted a file'
};

export const artifcatsKinds = {
	memdmp: 'Memory Dumps',
	filecreate: 'Dropped Files',
	codeinject: 'Injected Code',
	memfree: 'Freed Buffers'
};

/**
 * Parse mixed tags to basic tag name & category
 * @param fileTags mix of tags with value type string|array
 * @returns list of simple tag name & category
 */
export function parseTags(fileTags: any): Saferwall.Tag[] {
	const visitedTags: string[] = [];
	return Object.keys(fileTags ?? {}).reduce((tags: Saferwall.Tag[], category: string) => {
		let items: string | string[] | undefined = fileTags[category];

		if (!items) {
			return tags;
		}

		if (!Array.isArray(items)) {
			items = [items];
		}

		items.forEach((name) => {
			const uniqueName = name.toLowerCase();

			if (!visitedTags.includes(uniqueName)) {
				visitedTags.push(uniqueName);

				tags.push({
					name: name,
					category: category.toLowerCase()
				});
			}
		});

		return tags;
	}, []);
}

/**
 * get activity title by giving activity type
 * @param type activity type
 * @returns title
 */
export function getActivityTitle(type: Saferwall.Activities.All): string {
	return activityTypes[type];
}

/**
 * Parse label class
 * @param classification label
 * @returns classfication
 */
export function getLabelClass(classification?: string): string {
	if (!classification) {
		return `unknown`;
	}
	return classification.split('.')[1].toLowerCase();
}

/**
 * Parse artifcats kind
 */
export function getArtifcatKind(kind?: keyof typeof artifcatsKinds): string {
	if (!kind) {
		return 'Unknown';
	}

	return artifcatsKinds[kind];
}

/**
 * Returns the icon for a given classification label.
 * @param classification label
 * @returns icon
 */
export function getLabelIcon(classification?: string): string {
	return labels[getLabelClass(classification)];
}

/**
 * Converts bytes to kilobytes, megabytes, or gigabytes, depending on the size of the input value.
 * @param bytes The number of bytes to convert.
 * @returns The size in the appropriate unit (kilobytes, megabytes, or gigabytes). The result is rounded to two decimal places.
 */
export const convertBytes = (bytes: number): string => {
	if (bytes < 1024) {
		return bytes + 'B';
	}
	if (bytes < 1048576) {
		return (bytes / 1024).toFixed(2) + 'KB';
	}
	if (bytes < 1073741824) {
		return (bytes / 1048576).toFixed(2) + 'MB';
	}

	return (bytes / 1073741824).toFixed(2) + 'GB';
};

export function cleanUndefinedKeyValue(data: object = {}) {
	return Object.entries(data)
		.filter(([key, value]) => value !== 0 && value)
		.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}

/**
 * Function to split a camel case string into separate words and join them with space
 *
 * @param {string} text - The input string to be split
 * @returns {string}
 */
export function translateKeyToTitle(text: string): string {
	if (!text || text.length === 0) {
		return '';
	}
	const title = String(text).split('_').join(' ');
	return title.charAt(0).toUpperCase() + title.slice(1, title.length);
}

export function asciiReversed(value: string) {
	if (value.includes('ZM') || value.includes('EP')) {
		return value.split('').reverse().join('').replace(/\s+/g, '').toUpperCase();
	}

	return value;
}

export function hexToASCII(hex: string): string {
	return new TextDecoder('utf-8').decode(
		new Uint8Array(
			hex
				.replace(/\s/g, '')
				.match(/.{1,2}/g)!
				.map((byte) => parseInt(byte, 16))
		)
	);
}

/**
 * Function to get the label of data directory for a given index
 *
 * @param {number} index - The input index
 * @returns {string} - label
 */
export function getDataDirectoryLabel(index: number): string {
	return dataDirectoryMap[index] || 'Unknown';
}

export function stringToHex(value: any) {
	return value.toString(16);
}

export function valueToHex(value: any): string {
	if (typeof value !== 'number' || isNaN(value)) {
		return value;
	}
	return `0x${stringToHex(value)}`;
}

function getValuesByAndOperator(list: Record<number, string>, value: number): string[] {
	const values = [];
	for (const key in list) {
		const kkey: any = key;
		if (kkey & value) {
			values.push(list[key]);
		}
	}
	return values;
}

export function getFileCharacteristics(value: number): string[] {
	return getValuesByAndOperator(fileHeaderCharacteristicsMap, value);
}

export function getSectionFlags(value: number): string[] {
	return getValuesByAndOperator(sectionFlagMap, value);
}

export function getUnwFlags(value: number): string[] {
	return getValuesByAndOperator(unwFlagsMap, value);
}

export function getUnwOpcodes(value: number): string {
	return unwOpcodesMap[value];
}

export function getSignatureAlgo(value: number): string {
	return signaturesAlgoMap[value];
}

export function getPublicAlgo(value: number): string {
	return publicAlgoMap[value];
}

export function getCertificateType(value: number): string {
	return certificateTypesMap[value];
}

export function getMachineName(machine: number): string {
	return machinesMap[machine] || 'Unknown';
}

export function prodIdToVsVersion(prod: number): string {
	if (prod > 0x010e || prod < 0) return '';
	if (prod >= 0x00fd && prod < 0x010e + 1) return 'Visual Studio 2015 14.00';
	if (prod >= 0x00eb && prod < 0x00fd) return 'Visual Studio 2013 12.10';
	if (prod >= 0x00d9 && prod < 0x00eb) return 'Visual Studio 2013 12.00';
	if (prod >= 0x00c7 && prod < 0x00d9) return 'Visual Studio 2012 11.00';
	if (prod >= 0x00b5 && prod < 0x00c7) return 'Visual Studio 2010 10.10';
	if (prod >= 0x0098 && prod < 0x00b5) return 'Visual Studio 2010 10.00';
	if (prod >= 0x0083 && prod < 0x0098) return 'Visual Studio 2008 09.00';
	if (prod >= 0x006d && prod < 0x0083) return 'Visual Studio 2005 08.00';
	if (prod >= 0x005a && prod < 0x006d) return 'Visual Studio 2003 07.10';
	if (prod === 1) return 'Visual Studio';

	return '';
}

export const translateGroupValue = (value: any, name: string, sub?: string): any => {
	if (name === 'file_header') {
		if (sub === 'characteristics') {
			return getFileCharacteristics(value).join(',\n') || value;
		}
		if (sub === 'machine') {
			return getMachineName(value);
		}
		if (sub === 'signature') {
			return asciiReversed(hexToASCII(stringToHex(value)));
		}
	}
	if (name === 'sections') {
		if (sub === 'characteristics') {
			return getSectionFlags(value).join(',\n') || value;
		}
	}

	if (sub === 'magic') {
		return magicMap[value] || `?`;
	}
	if (sub === 'time_date_stamp') {
		try {
			const date = new Date(value * 1000);
			return date.toISOString().split('T').join(' ');
		} catch (error) {
			return;
		}
	}
	if (sub?.includes('size_of') || sub?.includes('size')) {
		return convertBytes(value);
	}
	if (sub?.includes('subsystem')) {
		return subSystemsMap[value] || '?';
	}

	if (sub === 'prod_id') {
		return prodIdsMap[value] || value;
	}
	if (sub === 'ms_internal_name') {
		return prodIdToVsVersion(value);
	}
	if (name === 'relocations') {
		if (sub === 'type') {
			return relocationTypesMap[value] || value;
		}
		if (sub === 'virtual_address') {
			return valueToHex(value);
		}
	}

	if (name === 'export') {
		if (sub === 'characteristics') {
			return getFileCharacteristics(value).join(',\n') || value;
		}

		return value;
	}

	if (name === 'exceptions') {
		if (sub === 'flags') {
			const flags = getUnwFlags(value).join(',\n');
			return `${valueToHex(value)} ( ${flags || 'No Flags'} )`;
		}

		if (sub === 'unwind_op') {
			return getUnwOpcodes(value) || value;
		}

		return valueToHex(value);
	}

	if (name === 'certificate') {
		if (sub === 'signature_algorithm') {
			return getSignatureAlgo(value);
		}
		if (sub === 'public_key_algorithm') {
			return getPublicAlgo(value);
		}
		if (sub === 'certificate_type') {
			return getCertificateType(value);
		}
	}

	return value;
};

enum ResourceType {
	RTCursor = 1,
	RTBitmap,
	RTIcon,
	RTMenu,
	RTDialog,
	RTString,
	RTFontDir,
	RTFont,
	RTAccelerator,
	RTRCdata,
	RTMessageTable,
	RTGroupCursor = RTCursor + 11,
	RTGroupIcon = RTIcon + 11,
	RTVersion = 16,
	RTDlgInclude = 17,
	RTPlugPlay = 19,
	RTVxD = 20,
	RTAniCursor = 21,
	RTAniIcon = 22,
	RTHtml = 23,
	RTManifest = 24
}

// Stringify the resource type.
export const getResourceTypeName = (type: ResourceType): string => {
	const rsrcTypeMap: { [key in ResourceType]: string } = {
		[ResourceType.RTCursor]: 'Cursor',
		[ResourceType.RTBitmap]: 'Bitmap',
		[ResourceType.RTIcon]: 'Icon',
		[ResourceType.RTMenu]: 'Menu',
		[ResourceType.RTDialog]: 'Dialog box',
		[ResourceType.RTString]: 'String',
		[ResourceType.RTFontDir]: 'Font directory',
		[ResourceType.RTFont]: 'Font',
		[ResourceType.RTAccelerator]: 'Accelerator',
		[ResourceType.RTRCdata]: 'RC Data',
		[ResourceType.RTMessageTable]: 'Message Table',
		[ResourceType.RTGroupCursor]: 'Group Cursor',
		[ResourceType.RTGroupIcon]: 'Group Icon',
		[ResourceType.RTVersion]: 'Version',
		[ResourceType.RTDlgInclude]: 'Dialog Include',
		[ResourceType.RTPlugPlay]: 'Plug & Play',
		[ResourceType.RTVxD]: 'VxD',
		[ResourceType.RTAniCursor]: 'Animated Cursor',
		[ResourceType.RTAniIcon]: 'Animated Icon',
		[ResourceType.RTHtml]: 'HTML',
		[ResourceType.RTManifest]: 'Manifest'
	};

	return rsrcTypeMap[type] ?? '?';
};

export const byteToHex = (byte: number) => {
	const unsignedByte = byte & 0xff;
	if (unsignedByte < 16) {
		return '0' + unsignedByte.toString(16).toUpperCase();
	} else {
		return unsignedByte.toString(16).toUpperCase();
	}
};

export const toHexString = (bytes: number[]) => {
	return Array.from(bytes).map((byte) => byteToHex(byte));
};

export const signatureToGuid = (signature: {
	data1: number;
	data2: number;
	data3: number;
	data4: Array<number>;
}) => {
	const { data1, data2, data3, data4 } = signature;
	const guidStr = `${byteToHex(data1).padStart(8, '0')}-${byteToHex(data2).padStart(
		4,
		'0'
	)}-${byteToHex(data3).padStart(4, '0')}-${data4
		.map((b) => byteToHex(b).padStart(2, '0'))
		.join('')}`;
	return guidStr.toUpperCase();
};
