import type { AuthUser } from "@teyvat-collective-network/shared-hyper-v2";
import { writable } from "svelte/store";

export const token = writable<string | null>();
export const darkMode = writable<boolean>(true);
export const user = writable<AuthUser | undefined>();
