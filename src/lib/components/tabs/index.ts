export interface TabItem {
	label: string;
	count?: number;
	url?: string;
	selected?: boolean;
}

import Header from './TabHeader.svelte';
import Root from './Tabs.svelte';

export default {
	Header,
	Root
};
