import { FaHashtag } from "react-icons/fa6";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";
import SectionLink from "../../../components/ui/section-link";

export default function Banshares() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Global Chat</h1>
                <SectionLink id="what-is-global">
                    <h2 className="text-4xl">What is it?</h2>
                </SectionLink>
                <p>
                    Global chat is a system that connects channels across the TCN and allows members to chat with each other through it. There are three
                    channels available to all servers:
                </p>
                <ul>
                    <li>
                        <code>TCN Public General</code>: A public &quot;general&quot; channel which can be made accessible to all server members.
                    </li>
                    <li>
                        <code>TCN Staff Lounge</code>: The staff general channel which can be made accessible to anyone you would trust with access to your
                        server&apos;s general staff chat.
                    </li>
                    <li>
                        <code>TCN Staff Office</code>: The staff business channel which can be made accessible to your current staff.
                    </li>
                </ul>
                <SectionLink id="setup">
                    <h2 className="text-4xl">Setup</h2>
                </SectionLink>
                <SectionLink id="adding-the-bot">
                    <h3 className="text-3xl">Adding the bot</h3>
                </SectionLink>
                <p>
                    First, invite the bot using{" "}
                    <a href={process.env.NEXT_PUBLIC_GLOBAL_LINK} className="link" target="_blank">
                        this link
                    </a>
                    .
                </p>
                <SectionLink id="permissions">
                    <h3 className="text-3xl">Permissions</h3>
                </SectionLink>
                <p>Ensure that the bot has all of the following permissions in all channels you want to connect:</p>
                <ul>
                    <li>
                        <b>View Channel</b>: This is required for all functionalities.
                    </li>
                    <li>
                        <b>Read Message History</b>: This is required for fetching older messages to relay purges.
                    </li>
                    <li>
                        <b>Manage Webhooks</b>: This is required to create webhooks or find your custom webhook to post incoming messages.
                    </li>
                    <li>
                        <b>Manage Messages</b>: This is required to cross-delete messages that were deleted elsewhere.
                    </li>
                </ul>
                <p>
                    Because of the possibility of spam or abusive content that will need to be deleted later on, if you do not allow the bot to delete messages
                    or view message history, it will also stop sending them to your channel.
                </p>
                <p>
                    Due to changes in Discord&apos;s bot-owned webhook permission system, emoji from other servers won&apos;t work by default. To fix this,
                    create a webhook manually in the channel. You do not need to do anything else.
                </p>
                <SectionLink id="connecting">
                    <h3 className="text-3xl">Connecting</h3>
                </SectionLink>
                <p>
                    <b>Your global channels will not be able to be used for anything else. All messages sent to the channel are relayed.</b>
                </p>
                <p>
                    Once your channel permissions are set up, use <code>/global connect</code> and select the appropriate global channel.
                </p>
                <p>Run the following steps to ensure the connection works properly:</p>
                <ul>
                    <li>
                        Send a message from your side and check another server. If it doesn&apos;t show up, you are missing <b>View Channel</b>.
                    </li>
                    <li>
                        Send a message from the other side and check that it appears in your channel. If it doesn&apos;t show up, <b>Manage Webhooks</b> is
                        missing.
                    </li>
                </ul>
                <p>
                    If you are not staff in another TCN server, you can use the global channels in the TCN Hub for this testing &mdash;{" "}
                    <Mention>
                        <FaHashtag></FaHashtag> tcn-staff-lounge
                    </Mention>{" "}
                    and{" "}
                    <Mention>
                        <FaHashtag></FaHashtag> tcn-staff-office
                    </Mention>
                    . Also note that if <b>Manage Messages</b> or <b>Read Message History</b> is missing, the global bot will ignore your channel entirely.
                </p>
                <SectionLink id="updating">
                    <h3 className="text-3xl">Updating the connection</h3>
                </SectionLink>
                <ul>
                    <li>
                        Use <code>/global connection suspend</code> to temporarily pause messages from being relayed in both directions and{" "}
                        <code>/global connection unsuspend</code> to revert this.
                    </li>
                    <li>
                        Use <code>/global connection move</code> to move the connection to a different channel without losing your connection settings.
                    </li>
                    <li>
                        Use <code>/global connection edit</code> to edit connection settings.
                    </li>
                </ul>
                <SectionLink id="disconnecting">
                    <h3 className="text-3xl">Disconnecting</h3>
                </SectionLink>
                <p>
                    To disconnect your channel, use <code>/global disconnect</code> and the bot will immediately stop relaying messages in both directions. Note
                    that you will also lose your connection settings this way &mdash; if you want to only temporarily stop the connection, use{" "}
                    <code>/global connection suspend</code>.
                </p>
                <SectionLink id="moderation">
                    <h2 className="text-4xl">Moderation</h2>
                </SectionLink>
                <SectionLink id="deleting-messages">
                    <h3 className="text-3xl">Deleting Messages</h3>
                </SectionLink>
                <p>
                    When a message or any copy of it is deleted, all copies of it and the original will be deleted. If this isn&apos;t working, make sure the
                    bot has the required permissions in your channel.
                </p>
                <p>
                    If the deletion didn&apos;t work or was incomplete, you can use <code>/global purge message</code> to instruct the bot to retry purging a
                    message.
                </p>
                <SectionLink id="banning">
                    <h3 className="text-3xl">Banning</h3>
                </SectionLink>
                <p>
                    Use <code>/global ban</code> to ban a user from the current global channel. This makes the bot stop relaying messages from that user across
                    all servers. The bot will also automatically delete any messages they send in any connected channels. Set <code>local: true</code> to just
                    ban them from your instance of the channel.
                </p>
                <p>
                    To use this command, you must have the <b>Ban Members</b> permission or be a designated global chat mod.
                </p>
                <p>
                    Note that the ban is per-channel, so make sure you run it in the right channel. You should not be using this in staff channels unless a
                    staff member is causing serious disruption that must be stopped immediately — instead, reach out to the server&apos;s admins or owner and/or
                    an observer.
                </p>
                <p>
                    To get the ID of the author of a message, right click the message and select <code>Apps &gt; Get Author ID</code> or run{" "}
                    <code>/global author</code> with URL of any copy of the message.
                </p>
                <p>
                    To unban a user, just use <code>/global unban</code>. Note that bans always supercede unbans, so a locally banned user will not be allowed
                    to use your channel and their messages will not be forwarded to you even if they are unbanned globally, and a globally banned user is not
                    exempt in a channel in which they are locally unbanned.
                </p>
                <SectionLink id="panic-mode">
                    <h3 className="text-3xl">Panic Mode</h3>
                </SectionLink>
                <p>
                    This command alerts all observers and can only be disabled by an observer. Misuse of this command may result in the loss of global chat
                    privileges or other consequences. If you think it might be needed, don&apos;t be afraid to use it — we will discuss with you if we believe
                    it was unnecessary, just don&apos;t play with it or use it for testing purposes.
                </p>
                <p>
                    If there is a raid or ongoing network-wide incident, you can use <code>/global panic</code> to completely shut down this global channel. It
                    will stop relaying messages from all servers but will continue to relay deletions.
                </p>
                <SectionLink id="for-observers">
                    <h3 className="text-3xl">For Observers</h3>
                </SectionLink>
                <ul>
                    <li>
                        <code>/global channels delete</code> &mdash; Delete a global channel. Do <b>not</b> use this unless the council has agreed to terminate
                        a global channel or it was a temporary channel that is no longer needed.
                    </li>
                    <li>
                        <code>/global channels create</code> &mdash; Create a global channel.
                    </li>
                    <li>
                        <code>/global channels edit</code> &mdash; Edit a global channel.
                    </li>
                    <li>
                        <code>/global unpanic</code> &mdash; Remove panic mode from a global channel.
                    </li>
                </ul>
                <SectionLink id="other-commands">
                    <h3 className="text-3xl">Other Commands</h3>
                </SectionLink>
                <ul>
                    <li>
                        <code>/global help</code> &mdash; Show information about the bot. If someone asks what global chat is or why everyone is a bot (fairly
                        common), use this command with <code>public: true</code> to show the info page (it will be shown in all servers).
                    </li>
                    <li>
                        <code>/global nickname</code> &mdash; Set your global nickname. By default, your display name (nickname or username) will be shown to
                        other servers. Setting this option will override your display name in all global channels from all servers.
                    </li>
                </ul>
            </div>
        </Container>
    );
}
