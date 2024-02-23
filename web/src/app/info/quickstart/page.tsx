import { FaHashtag } from "react-icons/fa6";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";
import SectionLink from "../../../components/ui/section-link";
import UserMention from "../../../components/ui/user-mention";

export default function Quickstart() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Quickstart</h1>
                <p>
                    <b>
                        We recommend that you{" "}
                        <a href="/add-bot" className="link" target="_blank">
                            add the TCN bot
                        </a>{" "}
                        to your server. It is not a requirement, but nearly all features depend on it.
                    </b>
                </p>
                <SectionLink id="required">
                    <h2 className="text-4xl">Required</h2>
                </SectionLink>
                <SectionLink id="partner-list">
                    <h3 className="text-3xl">Partner List</h3>
                </SectionLink>
                <p>
                    You must display the list of TCN servers and other TCN partners in a publicly visible channel, clearly separated from your server&apos;s
                    individual partners. You can find an up-to-date version in{" "}
                    <Mention>
                        <FaHashtag></FaHashtag> partner-list
                    </Mention>
                    , though you do not have to follow this format.
                </p>
                <p>
                    For a full list of exact requirements and information on how to enable automatic updating of your partner list, see{" "}
                    <a href="/info/partner-list" className="link">
                        Partner List & Autosync
                    </a>
                    .
                </p>
                <SectionLink id="partner-event-channel">
                    <h3 className="text-3xl">Partner Event Channel</h3>
                </SectionLink>
                <p>
                    You must follow{" "}
                    <Mention>
                        <FaHashtag></FaHashtag> network-events
                    </Mention>{" "}
                    in a publicly visible channel in your server. You can make this the same channel as where you post other partner events.
                </p>
                <SectionLink id="optional">
                    <h2 className="text-4xl">Optional Features</h2>
                </SectionLink>
                <p>
                    These features are optional. You may use them to provide better tools for your staff and a better experience for your members, but they are
                    entirely optional and you will not be asked why you are not using one of them. Your feedback on what changes can be made to make the
                    features work better for you is welcome, but you are not required to give any explanation or feedback.
                </p>
                <SectionLink id="banshares">
                    <h3 className="text-3xl">Banshares</h3>
                </SectionLink>
                <p>
                    Banshares are our way of sharing information on problematic users so you can eliminate potential threats or disturbances before they appear
                    in your server. You are not required to ban users who have been banshared &mdash; the purpose is simply to provide you with information for
                    you to use as you see fit.
                </p>
                <p>
                    To submit a banshare, visit the{" "}
                    <a href="/banshare" className="link">
                        banshare form
                    </a>
                    .
                </p>
                <p>
                    To learn how to set up banshares and how to use the form, see{" "}
                    <a href="/info/banshares" className="link">
                        Banshares
                    </a>
                    .
                </p>
                <SectionLink id="global">
                    <h3 className="text-3xl">Global Chat</h3>
                </SectionLink>
                <p>
                    Global chat is a feature available to all TCN servers that allows members to chat with members from other servers. There is a global channel
                    available to connect for all of your members and two channels for staff. All of these are optional, and you may use all, some, or none of
                    them.
                </p>
                <p>
                    To learn how to set up global chat, how to operate it, important things to know, how to moderate across it, and how to use it for your own
                    events and other purposes, see{" "}
                    <a href="/info/global" className="link">
                        Global Chat
                    </a>
                    .
                </p>
                <SectionLink id="staff-link">
                    <h3 className="text-3xl">Staff Link</h3>
                </SectionLink>
                <p>
                    You can register your staff in the API (which gives them the role in the TCN Hub and allows them to publish banshares) using{" "}
                    <code>/staff add</code> on the TCN bot. You can link roles to automatically add and remove staff when their roles change in your server.
                </p>
                <p>
                    To learn how to use this feature, see{" "}
                    <a href="/info/staff-link" className="link">
                        Staff Link
                    </a>
                    .
                </p>
                <SectionLink id="other-bots">
                    <h3 className="text-3xl">Other Bots</h3>
                </SectionLink>
                <p>
                    We have several other bots either officially or unofficially available for you that may interest you. Check out how to use them{" "}
                    <a href="/info/other-bots" className="link">
                        here
                    </a>
                    . Here is a list:
                </p>
                <p>
                    <b>These bots are not TCN-exclusive. Feel free to use them in your other servers!</b>
                </p>
                <ul>
                    <li>
                        <b>Genshin Wizard</b> [<UserMention id="188109365671100416"></UserMention>] (Official Partner!) &mdash; A Genshin Impact utility Discord
                        bot.
                    </li>
                    <li>
                        <b>Daedalus</b> [<UserMention id="251082987360223233"></UserMention>] &mdash; A general-purpose Discord bot.
                    </li>
                </ul>
            </div>
        </Container>
    );
}
