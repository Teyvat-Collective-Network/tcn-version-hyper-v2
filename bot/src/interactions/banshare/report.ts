import { template } from "../../lib/format.js";

export default async function () {
    return template.info(`Please contact us through the [TCN Hub](<${process.env.HUB_INVITE}>) by messaging the modmail bot at the top of the member list.`);
}
