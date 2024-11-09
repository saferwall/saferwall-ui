import { fileMenu } from '$lib/data/menu';
import type { Menu } from '$lib/types';
import { writable } from "svelte/store";

export const fileMenuStore = writable<Menu.File[]>(fileMenu);
export const peMenuStore = writable<string[]>([]);
export const titleExtraStore = writable<string>("");