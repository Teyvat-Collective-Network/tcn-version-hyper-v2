"use server";

import trpc from "../../lib/trpc";
import ContactBody from "./page-body";

export default async function Contact() {
    const observers = await trpc.getObservers.query();
    return <ContactBody observers={observers}></ContactBody>;
}
