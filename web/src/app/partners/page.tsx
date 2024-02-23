"use server";

import api from "../../lib/trpc";
import PartnersBody from "./page-body";

export default async function Partners() {
    const partners = await api.getPartnerPage.query();
    return <PartnersBody partners={partners}></PartnersBody>;
}
