"use server";

import trpc from "../../lib/trpc";
import MembersBody from "./page-body";

export default async function Members() {
    const members = await trpc.getMembersPage.query();
    return <MembersBody members={members}></MembersBody>;
}
