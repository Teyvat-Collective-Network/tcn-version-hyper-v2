import { StringSelectMenuInteraction } from "discord.js";
import api from "../../../api.js";
import { renderBanshareSettings } from "../../../lib/banshares.js";

export default async function (menu: StringSelectMenuInteraction) {
    await api.setBanshareAutoban.mutate({
        guild: menu.guild!.id,
        items: Object.fromEntries(["DM", "P0", "P1", "P2"].map((x) => [x, [menu.values.includes(`${x}-members`), menu.values.includes(`${x}-non-members`)]])),
    });

    await menu.update(await renderBanshareSettings(menu.guild!));
}
