import {
	dataDirectoryMap,
	fileHeaderCharacteristicsMap,
	machinesMap,
	magicMap,
	prodIdsMap,
	relocationTypesMap,
	subSystemsMap
} from '$lib/data/translates';
import type { ActivityType } from '$lib/types';

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

/**
 * get activity title by giving activity type
 * @param type activity type
 * @returns title
 */
export function getActivityTitle(type: ActivityType): string {
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
 * Returns the icon for a given classification label.
 * @param classification label
 * @returns icon
 */
export function getLabelIcon(classification?: string): string {
	return labels[getLabelClass(classification)];
}

/**
 * Returns a string representing the time elapsed since the given timestamp.
 * @param timestamp The timestamp to calculate the elapsed time from. Can be a number or a Date object.
 * @returns A string in the format "X time ago", where X is the elapsed time and time is a unit of time (e.g. "2 weeks ago").
 */
export function timeSince(timestamp: number | Date) {
	const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
	const formatter = new Intl.RelativeTimeFormat();
	const ranges: any = {
		years: 3600 * 24 * 365,
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1
	};
	const secondsElapsed = (date.getTime() - Date.now()) / 1000;
	for (const key in ranges) {
		if (ranges[key] < Math.abs(secondsElapsed)) {
			const rangeKey: any = key;
			const delta = secondsElapsed / ranges[rangeKey];
			return formatter.format(Math.round(delta), rangeKey);
		}
	}
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

/**
 * Converts a timestamp to an ISO string.
 * @param timestamp The timestamp to convert.
 * @returns The ISO string representation of the timestamp.
 */
export function timeToDateISO(timestamp: number): string {
	const date = new Date();
	date.setTime(timestamp);

	return date.toISOString();
}

export function getFileTypeIcon(type: string | undefined): string {
	return `tmp`;
}

/**
 * Function to split a camel case string into separate words and join them with space
 *
 * @param {string} text - The input string to be split
 * @returns {string}
 */
export function splitCamelCase(text: string): string {
	let result = '';
	let currentWord = text[0];
	for (let i = 1; i < text.length; i++) {
		if (text[i] === text[i].toUpperCase() && text[i - 1] === text[i - 1].toLowerCase()) {
			result += currentWord + ' ';
			currentWord = text[i];
		} else {
			currentWord += text[i];
		}
	}
	return (result + currentWord).trim();
}

export function asciiReversed(value: string) {
	if (value.includes('ZM') || value.includes('EP')) {
		return value.split('').reverse().join('').replace(/\s+/g, '').toUpperCase();
	}

	return value;
}

export function hexToASCII(value: string): string {
	var hex = value ? value.toString() : ''; // force conversion
	var str = '';
	for (var i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
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

export function getFileCharacteristics(characteristics: number): string[] {
	const values = [];
	for (const key in fileHeaderCharacteristicsMap) {
		const kkey: any = key;
		if (kkey & characteristics) {
			values.push(fileHeaderCharacteristicsMap[key]);
		}
	}
	return values;
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
	if (name === 'FileHeader') {
		if (sub === 'Characteristics') {
			return getFileCharacteristics(value).join('\n') || value;
		}
		if (sub === 'Machine') {
			return getMachineName(value);
		}
		if (sub === 'Signature') {
			return asciiReversed(hexToASCII(stringToHex(value)));
		}
	}

	if (sub === 'Magic') {
		return magicMap[value] || `?`;
	}
	if (sub === 'TimeDateStamp') {
		const date = new Date();
		date.setSeconds(value);
		return date.toISOString();
	}
	if (sub?.includes('SizeOf')) {
		return convertBytes(value);
	}
	if (sub?.includes('Subsystem')) {
		return subSystemsMap[value] || '?';
	}

	if (sub === 'ProdID') {
		return prodIdsMap[value] || value;
	}
	if (sub === 'MSinternalName') {
		return prodIdToVsVersion(value);
	}
	if (name === 'Relocations') {
		if (sub === 'Type') {
			return relocationTypesMap[value] || value;
		}
		if (sub === 'VirtualAddress') {
			return valueToHex(value);
		}
	}

	return value;
};
