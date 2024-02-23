"use server";

import api from "@tcn/bot/src/api"
import ContactBody from "./page-body"

export default async function Contact() {
    const observers = await api.getObservers.query();
    return <ContactBody observers={observers}></ContactBody>;
}
