"use client";

import { FaAlignLeft, FaBeerMugEmpty, FaCopy, FaHashtag, FaHubspot, FaWandMagicSparkles } from "react-icons/fa6";
import { Button } from "../../../components/ui/button";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";
import Panel from "../../../components/ui/panel";
import SectionLink from "../../../components/ui/section-link";
import { Separator } from "../../../components/ui/separator";
import { ToastAction } from "../../../components/ui/toast";
import { useToast } from "../../../components/ui/use-toast";

export default function PartnerList() {
    const { toast } = useToast();

    function copy(text: string) {
        navigator.clipboard.writeText(text);
        toast({ description: "Markdown Copied!", action: <ToastAction altText="OK">OK</ToastAction>, duration: 1800 });
    }

    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Partner List &amp; Autosync</h1>
                <p>See the list of requirements below. The following methods will satisfy the requirements:</p>
                <ul>
                    <li>
                        Run <code>/partner-list view public:true</code> to display it using the TCN bot directly.
                    </li>
                    <li>
                        Post the embed directly (the most updated link can be found in{" "}
                        <Mention>
                            <FaHashtag></FaHashtag> announcements
                        </Mention>
                        ).
                    </li>
                    <li>
                        Set up{" "}
                        <a href="#autosync" className="link">
                            autosync
                        </a>
                        .
                    </li>
                </ul>
                <SectionLink id="requirements">
                    <h2 className="text-4xl">Requirements</h2>
                </SectionLink>
                <p>You must include all of the following:</p>
                <ul>
                    <li>
                        <b>Website URL</b>:{" "}
                        <a href={process.env.NEXT_PUBLIC_DOMAIN} className="link" target="_blank">
                            {process.env.NEXT_PUBLIC_DOMAIN}
                        </a>
                    </li>
                    <li>
                        <b>Description</b>: A description of the TCN
                    </li>
                    <li>
                        <b>Partner List</b>: The list of all TCN partner servers, which must not contain any other servers
                    </li>
                    <li>
                        <b>TCN Hub</b>: The description of the TCN Hub and its invite link (
                        <a href={process.env.NEXT_PUBLIC_INVITE} className="link" target="_blank">
                            {process.env.NEXT_PUBLIC_INVITE}
                        </a>
                        )
                    </li>
                    <li>
                        <b>Genshin Wizard</b>: The description for Genshin Wizard and its website link (
                        <a href="https://genshinwizard.com" className="link" target="_blank">
                            https://genshinwizard.com
                        </a>
                        ).
                    </li>
                    <li>
                        <b>Genshin Impact Tavern</b>: The description for Genshin Impact Tavern and its invite (
                        <a href="https://discord.gg/genshinimpacttavern" className="link" target="_blank">
                            https://discord.gg/genshinimpacttavern
                        </a>
                        ).
                    </li>
                </ul>
                <p>
                    You do not need to include all of these verbatim, but here is our recommendation for the descriptions. Your description is expected to
                    convey the same information, but you may write it in your own style.
                </p>
                <Panel>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaAlignLeft></FaAlignLeft> General Description
                    </h3>
                    <p>
                        <i>&quot;In Teyvat, the stars in the sky will always have a place for you.&quot;</i>
                    </p>
                    <p>
                        A network of high-quality Genshin Impact character-mains style servers that focus on creating fan communities. Within the network,
                        individual and network-wide events are held such as: tournaments, scavenger hunts, and other fun events, community nights, giveaways,
                        and patch preview livestreams.
                    </p>
                    <div>
                        <Button
                            variant="secondary"
                            className="center-row gap-2"
                            onClick={() =>
                                copy(`_"In Teyvat, the stars in the sky will always have a place for you."_

A network of high-quality Genshin Impact character-mains style servers that focus on creating fan communities. Within the network, individual and network-wide events are held such as: tournaments, scavenger hunts, and other fun events, community nights, giveaways, and patch preview livestreams.`)
                            }
                        >
                            <FaCopy></FaCopy> Copy Markdown
                        </Button>
                    </div>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaHubspot></FaHubspot> TCN Hub
                    </h3>
                    <p>
                        Join us in the official TCN Hub to ask questions about the network, talk to other network members, get information on the network and
                        how to apply, and contact observers (admins)!{" "}
                        <a href="https://discord.gg/FG2wpbywSx" className="link" target="_blank">
                            https://discord.gg/FG2wpbywSx
                        </a>
                    </p>
                    <div>
                        <Button
                            variant="secondary"
                            className="center-row gap-2"
                            onClick={() =>
                                copy(
                                    `Join us in the official TCN Hub to ask questions about the network, talk to other network members, get information on the network and how to apply, and contact observers (admins)! https://discord.gg/FG2wpbywSx`,
                                )
                            }
                        >
                            <FaCopy></FaCopy> Copy Markdown
                        </Button>
                    </div>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaWandMagicSparkles></FaWandMagicSparkles> Genshin Wizard
                    </h3>
                    <p>
                        The TCN is partnered with Genshin Wizard, a multipurpose Genshin Impact Discord bot with a wide array of features to let you view your
                        in-game stats, flex your builds, view build guides and hundreds of high-quality infographics, and more!
                    </p>
                    <div>
                        <Button
                            variant="secondary"
                            className="center-row gap-2"
                            onClick={() =>
                                copy(
                                    `The TCN is partnered with [Genshin Wizard](https://genshinwizard.com), a multipurpose Genshin Impact Discord bot with a wide array of features to let you view your in-game stats, flex your builds, view build guides and hundreds of high-quality infographics, and more!`,
                                )
                            }
                        >
                            <FaCopy></FaCopy> Copy Markdown
                        </Button>
                    </div>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaBeerMugEmpty></FaBeerMugEmpty> Genshin Impact Tavern
                    </h3>
                    <p>
                        The TCN is partnered with{" "}
                        <a href="https://discord.gg/genshinimpacttavern" className="link">
                            Genshin Impact Tavern
                        </a>
                        , a multifaceted Discord Community Server hosting a custom bot designed to emulate an &quot;RPG-like&quot; experience. This includes the
                        earning of Mora (Server digital currency), a Vision, farming for weapons and upgrades with continuously expanding systems related to
                        each. Mora can be redeemed to make use of several server functions, including redemption for Official Merchandise. Genshin Impact Tavern
                        is also the proud host of the Cat&apos;s Tail Gathering TCG Tournament! <i>Genshin Impact Tavern is an officially endorsed server.</i>
                    </p>
                    <div>
                        <Button
                            variant="secondary"
                            className="center-row gap-2"
                            onClick={() =>
                                copy(
                                    `The TCN is partnered with [Genshin Impact Tavern](https://discord.gg/genshinimpacttavern), a multifaceted Discord Community Server hosting a custom bot designed to emulate an "RPG-like" experience. This includes the earning of Mora (Server digital currency), a Vision, farming for weapons and upgrades with continuously expanding systems related to each. Mora can be redeemed to make use of several server functions, including redemption for Official Merchandise. Genshin Impact Tavern is also the proud host of the Cat's Tail Gathering TCG Tournament! _Genshin Impact Tavern is an officially endorsed server._`,
                                )
                            }
                        >
                            <FaCopy></FaCopy> Copy Markdown
                        </Button>
                    </div>
                </Panel>
                <SectionLink id="autosync">
                    <h2 className="text-4xl">Autosync</h2>
                </SectionLink>
                <p>Autosync seamlessly keeps your partner embed up-to-date without needing any action from you after initial setup.</p>
                <p>You can choose a message that will be edited each time or set the bot to automatically delete and re-post the embed each time.</p>
                <ol>
                    <li>
                        Invite the TCN bot{" "}
                        <a href="/add-bot" className="link" target="_blank">
                            here
                        </a>
                        .
                    </li>
                    <li>
                        Run <code>/autosync channel set</code> to set up an embed instance in a specific channel.
                    </li>
                    <li>
                        Run <code>/autosync webhook set</code> to set up an embed instance using a webhook (this overrides the <code>channel</code> option).
                    </li>
                    <li>
                        Run <code>/autosync mode set</code> if you would like the embed to be re-posted each time instead of edited when there is an update.
                    </li>
                    <li>
                        To change the format (template) of the embed, go to <b>Manage Servers</b> on the dashboard (in the left navigation menu — you need to be
                        logged in). For help with using this, ask us in{" "}
                        <Mention>
                            <FaHashtag></FaHashtag> dev-chat
                        </Mention>{" "}
                        in HQ or the TCN Hub.
                    </li>
                </ol>
            </div>
        </Container>
    );
}
