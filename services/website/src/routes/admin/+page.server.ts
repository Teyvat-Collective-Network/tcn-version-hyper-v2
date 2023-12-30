import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ locals: { user } }) => {
    if (!user) throw redirect(303, "/auth/login");
    if (!user.observer) throw redirect(303, "/");
};
