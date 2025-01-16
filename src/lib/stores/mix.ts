import { writable } from 'svelte/store';

export type Mix = {
    name: string;
    color: string;
};

export const mixes = writable<Mix[]>([]);

export const changed = writable(false);
