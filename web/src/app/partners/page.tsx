"use server";

import trpc from "../../lib/trpc";
import PartnersBody from "./page-body";

export default async function Partners() {
    const partners = await trpc.getPartnerPage.query();
    return <PartnersBody partners={partners}></PartnersBody>;
}
