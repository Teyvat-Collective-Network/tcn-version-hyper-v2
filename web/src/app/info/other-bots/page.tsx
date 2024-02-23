import Container from "../../../components/ui/container";
import SectionLink from "../../../components/ui/section-link";
import UserMention from "../../../components/ui/user-mention";

export default function OtherBots() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Other Bots</h1>
                <p>These bots are not TCN-exclusive. Feel free to use them in your other servers!</p>
                <SectionLink id="genshin-wizard">
                    <h2 className="text-4xl">Genshin Wizard</h2>
                </SectionLink>
                <h3 className="text-xl font-bold">Official Partner</h3>
                <p>
                    Developed by <UserMention id="188109365671100416"></UserMention>
                </p>
                <p>
                    <a href="https://genshinwizard.com/" className="link" target="_blank">
                        Genshin Wizard Website
                    </a>
                </p>
                <p>
                    The TCN is officially partnered with Genshin Wizard, a multi-purpose Genshin Impact bot with a comprehensive set of features allowing you to
                    view your in-game stats, flex your builds, view build guides and hundreds of high-quality infographics, etc. To get more information or for
                    setup, please contact the support team on their{" "}
                    <a href={process.env.NEXT_PUBLIC_GW_INVITE} className="link" target="_blank">
                        Discord server
                    </a>{" "}
                    and open a ticket. Mention that you are part of the TCN and would like help setting up.
                </p>
                <p>
                    <b>
                        This bot is not developed by a TCN Council Member. It is a partner of the TCN and is not exclusive to us and frequently partners with
                        other servers.
                    </b>
                </p>
                <SectionLink id="daedalus">
                    <h2 className="text-4xl">Daedalus</h2>
                </SectionLink>
                <p>
                    Developed by <UserMention id="251082987360223233"></UserMention>
                </p>
                <p>
                    <a href="https://daedalusbot.xyz" className="link" target="_blank">
                        Daedalus Website
                    </a>
                </p>
                <p>
                    Daedalus is a modern, general-purpose bot containing a wide array of features for all of your server management needs. It features full
                    slash-command support, buttons and dropdowns for a smooth experience, modals, high customizability, transparent permissions, etc.
                </p>
                <p>
                    Daedalus features many customizable standard features with additional features and modern upgrades &mdash; reaction roles with buttons and
                    dropdowns for a better user experience, comprehensive mod tools, advanced automoderation, anti-nuke features, and more.
                </p>
                <p>
                    <b>Daedalus is not an official partner of the TCN.</b>
                </p>
            </div>
        </Container>
    );
}
