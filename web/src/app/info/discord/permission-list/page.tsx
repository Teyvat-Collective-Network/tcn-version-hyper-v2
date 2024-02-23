"use client";

import { useState } from "react";
import { FaAt } from "react-icons/fa6";
import Permission from "../../../../components/Permission";
import { Button } from "../../../../components/ui/button";
import Container from "../../../../components/ui/container";
import Mention from "../../../../components/ui/mention";

export default function PermissionList() {
    const [showMore, setShowMore] = useState<boolean>(false);

    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Permission List</h1>
                <p>
                    <a href="/info/discord" className="link">
                        Return to Discord Guides
                    </a>
                </p>
                <div>
                    <Button onClick={() => setShowMore((x) => !x)}>{showMore ? "Hide" : "Show"} Additional Information</Button>
                </div>
                <p>
                    <b>Role Hierarchy</b> refers to the order of roles. A user&apos;s position is based on their highest role, except for the server owner, who
                    is at the very top of the hierarchy strictly above everyone else.
                </p>
                <p>
                    Note that this is based on the highest role <b>overall</b> and not the highest role with the specified position. Therefore, a mod with a
                    cosmetic role that is higher than the mod role will be able to ban mods without the cosmetic role, even if the role carries no permissions.
                </p>
                <Permission name="Create Invite" code="CREATE_INSTANT_INVITE" bit={0} open={showMore} T V S />
                <p>
                    Allows the user to create invite links to the server which can be used by other users to join the server. Users do not need this permission
                    to share existing invite links, including the vanity URL, only to create new invites.
                </p>
                <p>
                    <i>
                        Looking for the permission to add bots? See{" "}
                        <a href="#MANAGE_GUILD" className="link">
                            Manage Guild
                        </a>
                        .
                    </i>
                </p>
                <Permission name="Kick Members" bit={1} open={showMore} MFA H />
                <p>Allows the user to kick members from the server, removing them instantly but not preventing them from rejoining.</p>
                <Permission name="Ban Users" code="BAN_MEMBERS" bit={2} open={showMore} MFA H />
                <p>
                    Allows the user to ban members from the server, removing them instantly and preventing them from rejoining, and unban members from the
                    server, allowing them to rejoin the server with an invite.
                </p>
                <p>Bans are permanent unless revoked and ban the user and their IP. Users not in the server can be banned to prevent them from joining.</p>
                <Permission name="Administrator" bit={3} open={showMore} MFA H />
                <p>
                    Grants the user all permissions in the server and all channels. Prevents the user from being timed out. Actions such as banning are still
                    subject to role hierarchy and therefore cannot ban and can be banned by moderators with a higher role, even if the moderator has fewer
                    permissions.
                </p>
                <p>
                    <b>
                        This is a dangerous permission to grant. Administrators gain all permissions which cannot be overridden. They can still be kicked or
                        banned but cannot be timed out and negative overrides will have no effect on them.
                    </b>
                </p>
                <Permission name="Manage Channels" bit={4} open={showMore} T V S MFA />
                <p>
                    Allows the user to create, edit, and delete channels. If set per-channel, only allows editing and deleting the specified channel or creating
                    channels if the specified channel is a category channel.
                </p>
                <p>
                    This permission does not allow the user to edit channel overrides &mdash; that is controlled by{" "}
                    <a href="#MANAGE_ROLES" className="link">
                        Manage Roles
                    </a>
                    . Creating threads is controlled by{" "}
                    <a href="#CREATE_PUBLIC_THREADS" className="link">
                        Create Public Threads
                    </a>{" "}
                    and{" "}
                    <a href="#CREATE_PRIVATE_THREADS" className="link">
                        Create Private Threads
                    </a>
                    and editing and deleting threads are controlled by{" "}
                    <a href="#MANAGE_THREADS" className="link">
                        Manage Threads
                    </a>
                    .
                </p>
                <Permission name="Manage Server" code="MANAGE_GUILD" bit={5} open={showMore} MFA />
                <p>
                    Allows the user to edit server properties such as the name, icon, banner, etc., add applications (e.g. bots) to the server, and configure
                    AutoMod. The user always bypasses AutoMod.
                </p>
                <p>
                    Deleting the server, changing the 2FA requirement for moderation, and applying for Discord partnership may only be done by the server owner.
                </p>
                <Permission name="Add Reactions" bit={6} open={showMore} T V MFA />
                <p>Allows the user to add new emoji reactions to messages.</p>
                <p>
                    This permission is not needed to add the an existing reaction. All users who have passed membership screening and are not timed out may do
                    this. Users can also always remove their own reactions.
                </p>
                <Permission name="View Audit Log" bit={7} open={showMore} />
                <p>
                    Allows the user to see the audit log which keeps track of moderation and administrative actions. They can see all actions, even those which
                    they do not have permission to perform.
                </p>
                <Permission name="Use Priority Speaker" code="PRIORITY_SPEAKER" bit={8} open={showMore} V />
                <p>
                    Allows the user to enable Push-To-Talk Priority Speaker mode, which reduces the volume of all other users in the same voice channel while
                    being used.
                </p>
                <Permission name="Stream" bit={9} open={showMore} V />
                <p>Allows the user to stream video (screen-share or their video camera) in a voice channel.</p>
                <Permission name="View Channel" bit={10} open={showMore} T V S />
                <p>
                    Allows the user to see channels and incoming messages while focused on the channel. Users can see category channels if they can see at least
                    one channel in it, even if they cannot see the category, and can be blocked from viewing channels in categories that they can see.
                </p>
                <p>
                    To see messages that were sent while the user was not focused on the channel, the user must have
                    <a href="#READ_MESSAGE_HISTORY" className="link">
                        Read Message History
                    </a>
                    .
                </p>
                <Permission name="Send Messages" bit={11} open={showMore} T V />
                <p>Allows the user to send messages in text and text-in-voice channels. In forum channels, allows the user to create forum posts.</p>
                <p>
                    To send messages in threads and forum posts, the user needs{" "}
                    <a href="#SEND_MESSAGES_IN_THREADS" className="link">
                        Send Messages In Threads
                    </a>
                    .
                </p>
                <Permission name="Send Text-To-Speech Messages" code="SEND_TTS_MESSAGES" bit={12} open={showMore} T V />
                <p>
                    Allows the user to using <code>/tts</code> which sends a message that is read aloud to everyone focused on the channel.
                </p>
                <Permission name="Manage Messages" bit={13} open={showMore} T V MFA />
                <p>
                    Allows the user to delete other users&apos; messages, pin messages, publish other users&apos; messages from announcement channels, and
                    remove embeds from other users&apos; messages. Except for pinning messages, the other three are always available for the user&apos;s own
                    messages.
                </p>
                <p>
                    This permission is <b>not</b> subject to role hierarchy. You can delete, pin, publish, or remove embeds from anyone&apos;s messages with
                    this permission.
                </p>
                <Permission name="Embed Links" bit={14} open={showMore} T V />
                <p>
                    Links that the user sends will show embeds if possible and the user has not suppressed embeds using <code>&lt;...&gt;</code>. For bots, this
                    is necessary for them to send custom embeds in messages.
                </p>
                <Permission name="Attach Files" bit={15} open={showMore} T V />
                <p>Allows the user to upload files in messages they send. This is not limited to images; users can upload most types of files.</p>
                <Permission name="Read Message History" bit={16} open={showMore} T V />
                <p>Allows the user to view messages sent while they were not focused on a channel and allows them to search through past messages.</p>
                <p>
                    Without this permission, users will see &quot;You do not have permission to view the history of this channel.&quot; and will only be able to
                    see messages received while they were focused on the channel.
                </p>
                <Permission name="Mention <code>@everyone</code>, <code>@here</code>, and All Roles" code="MENTION_EVERYONE" bit={17} open={showMore} T V S />
                <p>
                    Allows users to use{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    to ping all server members who can see the channel,{" "}
                    <Mention>
                        <FaAt></FaAt> here
                    </Mention>{" "}
                    to ping all online members who can see the channel and ping any role regardless of if it has the &quot;Allow anyone to <b>@mention</b> this
                    role&quot; toggle enabled. This permission is <b>not</b> subject to role hierarchy.
                </p>
                <p>
                    In stage channels, this allows users to alert{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    when starting a stage instance.
                </p>
                <Permission name="Use External Emoji" code="USE_EXTERNAL_EMOJIS" bit={18} open={showMore} T V S />
                <p>Allows the user to use emoji from other servers in messages and message or voice reactions (if the have Nitro or are a bot).</p>
                <Permission name="View Server Insights" code="VIEW_GUILD_INSIGHTS" bit={19} open={showMore} />
                <p>
                    Allows the user to see the server insights page, which provides information about server metrics, members joining and leaving, which invites
                    are being used, member retention, participat message count, etc.
                </p>
                <Permission name="Connect" bit={20} open={showMore} V S />
                <p>
                    Allows the user to join voice and stage channels. Permission to speak is controlled by{" "}
                    <a href="#SPEAK" className="link">
                        Speak
                    </a>{" "}
                    but the user can lisaen unless server deafened.
                </p>
                <Permission name="Speak" bit={21} open={showMore} V />
                <p>
                    Allows the user to speak in voice channels. This does not allow the user to speak in stage channels &mdash; stage moderators are appointed
                    separately per stage channel (via channel permission settings) and choose who is allowed to speak.
                </p>
                <Permission name="Mute Members" bit={22} open={showMore} V S />
                <p>
                    Allows the user to server mute users (including themselves), preventing them from speaking in any channel regardless of their permissions.
                    Allows the user to server unmute users (including themselves). Users who are self-muted will not be unmuted by a server unmute. This
                    permission is
                    <b>not</b> subject to role hierarchy.
                </p>
                <Permission name="Deafen Members" bit={23} open={showMore} V />
                <p>
                    Allows the user to server deafen users (including themselves), preventing them frmo hearing the contents of voice and stage channels. Allows
                    the user to server undeafen users (including themselves). Users who are self-deafened will not be undeafened by a server undeafen. This
                    permission is
                    <b>not</b> subject to role hierarchy.
                </p>
                <p>Note that unlike self-deafening, a user is not necessarily implicitly muted when they are server deafened.</p>
                <Permission name="Move Members" bit={24} open={showMore} V S />
                <p>
                    Allows the user to move members who are in a voice channel into another voice channel in the same server. The acting user must have
                    permission to
                    <a href="#CONNECT" className="link">
                        Connect
                    </a>{" "}
                    in the target channel but the target user does not need permissions. Users cannot be moved between serveas. This permission is <b>not</b>{" "}
                    subject to role hierarchy.
                </p>
                <Permission name="Use Voice Activity" code="USE_VAD" bit={25} open={showMore} V />
                <p>Allows the user to use voice activity detection mode. Without this permission, users can only use Push-To-Talk.</p>
                <Permission name="Change Nickname" bit={26} open={showMore} />
                <p>Allows the user to change their own nickname.</p>
                <Permission name="Manage Nicknames" bit={27} open={showMore} H />
                <p>Allows the user to change other members&apos; nicknames.</p>
                <Permission name="Manage Roles" bit={28} open={showMore} T V S MFA H />
                <p>
                    If applied server-wide, allows the user to create, edit, delete, add, and remove roles below them in the role hierarchy. The user may add
                    and remove roles from users above them and themselves but can only manipulate roles below them.
                </p>
                <p>
                    Allows the user to edit channel overrides for permissions that they have, but this is <b>not</b> subject to role hierarchy.
                </p>
                <Permission name="Manage Webhooks" bit={29} open={showMore} T V MFA />
                <p>Allows the user to create, edit, and delete webhooks and view a list of webhooks and copy their URLs.</p>
                <Permission name="Manage Expressions" code="MANAGE_GUILD_EXPRESSIONS" bit={30} open={showMore} MFA />
                <p>
                    Allows the user to upload, rename, and delete emoji, stickers, and soundboard sounds. Also allows the bot to control which roles can use
                    emoji.
                </p>
                <p>
                    Discord has built-in support for restricting which roles can use certain emoji. This feature is not well-known and you cannot control it
                    from within the client, but{" "}
                    <a href="/info/other-bots/daedalus" className="link">
                        Daedalus
                    </a>{" "}
                    offers support for at.
                </p>
                <Permission name="Use Application Commands" bit={31} open={showMore} T V />
                <p>Allows the user to use slash commands and context menu commands (right-clicking a message or user and selecting &quot;Apps&quot;).</p>
                <p>
                    This permission does not control whether or not a bot&apos;s application commands will appear in your server &mdash; that is controlled by
                    the
                    <code>application.commands</code> scope set when inviting the bot. Currently, this permission does nothing for bots.
                </p>
                <p>
                    If you are not seeing a bot&apos;s commands and you invited it with this scope, you may have too many bots &mdash; only 50 bots are allowed
                    to register commands in one server.
                </p>
                <Permission name="Request To Speak" bit={32} open={showMore} S />
                <p>Allows the user to request to become a speaker in stage channels, which can be approved or denied by stage moderators.</p>
                <Permission name="Manage Events" bit={33} open={showMore} V S />
                <p>Allows the user to create, edit, and delete server events, including starting and ending them.</p>
                <Permission name="Manage Threads" bit={34} open={showMore} T MFA />
                <p>Allows the user to edit, archive, unarchive, lock, unlock, and delete threads and view all private threads.</p>
                <Permission name="Create Public Threads" bit={35} open={showMore} T />
                <p>Allows the user to create public threads (which all users can see).</p>
                <p>
                    To send messages in threads, the user needs{" "}
                    <a href="#SEND_MESSAGES_IN_THREADS" className="link">
                        Send Messages In Threads
                    </a>
                    .
                </p>
                <Permission name="Create Private Threads" bit={36} open={showMore} T />
                <p>
                    Allows the user to create private threads (which only users with{" "}
                    <a href="#MANAGE_THREADS" className="link">
                        Manage Threads
                    </a>{" "}
                    or who are explicitly invitedato the thread can see).
                </p>
                <p>
                    To send messages in threads, the user needs{" "}
                    <a href="#SEND_MESSAGES_IN_THREADS" className="link">
                        Send Messages In Threads
                    </a>
                    .
                </p>
                <Permission name="Use External Stickers" bit={37} open={showMore} T V />
                <p>Allows the user to send messages with stickers from other servers.</p>
                <Permission name="Send Messages In Threads" bit={38} open={showMore} T />
                <p>Allows the user to send messages in threads and forum posts.</p>
                <p>
                    To create forum posts and talk in text and text-in-voice channels, the user needs{" "}
                    <a href="#SEND_MESSAGES" className="link">
                        Send Messages
                    </a>
                    .
                </p>
                <Permission name="Use Activities" code="USE_EMBEDDED_ACTIVITIES" bit={39} open={showMore} V />
                <p>Allows users to start activities such as YouTube&apos;s Watch Together in voice channels. All users may join an existing activity.</p>
                <Permission name="Timeout Members" code="MODERATE_MEMBERS" bit={40} open={showMore} H />
                <p>
                    Allows the user to timeout other members, which disables all permissions except for{" "}
                    <a href="#VIEW_CHANNEL" className="link">
                        View Channel
                    </a>{" "}
                    and
                    <a href="#READ_MESSAGE_HISTORY" className="link">
                        Read Message History
                    </a>
                    . Some features such as adding to existing reactions or using message componeats (buttons and dropdowns) are also disabled.
                </p>
                <p>Timeouts persist if a member leaves and rejoins the server.</p>
                <p>
                    <a href="#ADMINISTRATOR" className="link">
                        Administrators
                    </a>{" "}
                    cannot be timed out. If a user is timed out and gains the permission, their timeoutais immediately canceled. Even if an administrator could
                    be timed out, they would be exempt from it.
                </p>
                <Permission name="View Monetization Analytics" code="VIEW_CREATOR_MONETIZATION_ANALYTICS" bit={41} open={showMore} MFA />
                <p>Allows the user to view insights on role subscriptions and server monetization.</p>
                <Permission name="Use Soundboard" bit={42} open={showMore} V />
                <p>Allows the user to use the soundboard to play sounds in a voice channel.</p>
                <Permission name="Use External Sounds" bit={45} open={showMore} V />
                <p>
                    Allows the user to play sounds from other servers using the soundboard (if the have{" "}
                    <a href="#USE_SOUNDBOARD" className="link">
                        Use Soundboard
                    </a>
                    ).
                </p>
                <Permission name="Send Voice Messages" bit={46} open={showMore} T V S />
                <p>Allows the user to send voice messages, which are uploaded as audio files and not automatically played.</p>
            </div>
        </Container>
    );
}
