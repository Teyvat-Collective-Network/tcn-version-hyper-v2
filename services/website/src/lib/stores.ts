import { writable } from "svelte/store";

export const token = writable<string | null>();
export const darkMode = writable<boolean>(true);
export const user = writable<App.Locals["user"] | undefined>();
