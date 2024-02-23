"use client";

import { FaAt } from "react-icons/fa6";
import Container from "../../../../components/ui/container";
import Mention from "../../../../components/ui/mention";
import SectionLink from "../../../../components/ui/section-link";

export default function PermissionsGuide() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Permissions</h1>
                <p>
                    <a href="/info/discord" className="link">
                        Return to Discord Guides
                    </a>
                </p>
                <SectionLink id="introduction">
                    <h2 className="text-4xl">Introduction</h2>
                </SectionLink>
                <p>
                    Permissions are the way you control what users are able and not able to do on your server. Managing permissions correctly is extremely
                    important to prevent abuse while giving your members an optimal experience.
                </p>
                <p>
                    However, it can be difficult to manage them correctly, and even small exploits that do not cause major issues can still make the server
                    appear disorganized and poorly operated.
                </p>
                <p>
                    In this guide, we explain the details behind how permissions interact and are calculated. Additionally, there are often multiple ways to
                    technically obtain the same effect, but some are much harder to maintain and can cause restrictions later on, so we give recommendations for
                    how you may want to set things up.
                </p>
                <SectionLink id="mechanics">
                    <h2 className="text-4xl">Mechanics</h2>
                </SectionLink>
                <p>
                    Certain actions like deleting messages apply in a specific channel, and the permissions that allow those can be set at a channel level.
                    Categories can have these permissions set, but they do not actually give the permissions in their child channels, it just determines what
                    overrides new channels in the category have, and synced channels (children with the exact same overrides) will be updated when the
                    category&apos;s overrides are edited.
                </p>
                <p>The priority order of permissions and overrides is as follows:</p>
                <ul>
                    <li>
                        If the user is the owner or has a role with the{" "}
                        <a href="/info/discord/permission-list#ADMINISTRATOR" className="link" target="_blank">
                            Administrator
                        </a>{" "}
                        permission, they are allowed.
                    </li>
                    <li>
                        If the user is timed out or has not passed membership screening and the permission is not{" "}
                        <a href="/info/discord/permission-list#VIEW_CHANNEL" className="link" target="_blank">
                            View Channel
                        </a>{" "}
                        or{" "}
                        <a href="/info/discord/permission-list#READ_MESSAGE_HISTORY" className="link" target="_blank">
                            Read Message History
                        </a>
                        , they are denied.
                    </li>
                    <li>
                        If the user has a user-level override, it applies.<sup>&dagger;</sup>
                    </li>
                    <li>
                        If the user has a role that has a role-level override allowing that permission, they are allowed.<sup>&dagger;</sup>
                    </li>
                    <li>
                        If the user has a role that has a role-level override denying that permission, they are denied.<sup>&dagger;</sup>
                    </li>
                    <li>
                        If there is an{" "}
                        <Mention>
                            <FaAt></FaAt> everyone
                        </Mention>
                        -level override, it applies.<sup>&dagger;</sup>
                    </li>
                    <li>
                        If the user has a role that has the permission granted server-wide (including{" "}
                        <Mention>
                            <FaAt></FaAt> everyone
                        </Mention>
                        ), they are allowed.
                    </li>
                    <li>If all fail, they are denied.</li>
                </ul>
                <p>
                    <span className="text-muted-foreground">
                        <sup>&dagger;</sup> If the permission is only applicable server-wide (e.g.{" "}
                        <a href="/info/discord/permission-list#BAN_MEMBERS" className="link muted" target="_blank">
                            Ban Users
                        </a>
                        ), this does not apply.
                    </span>
                </p>
                <p>
                    Positive role-level overrides <b>always</b> take priority over negative ones. Role hierarchy does <b>not</b> matter here. If you give{" "}
                    <a href="/info/discord/permission-list#SEND_MESSAGES" className="link" target="_blank">
                        Send Messages
                    </a>{" "}
                    to a channel access role, your mute role will not work anymore. See the{" "}
                    <a href="#how-to" className="link">
                        How To
                    </a>{" "}
                    section for guides on common permission patterns and how to avoid this pitfall.
                </p>
                <p>Some permissions are dependent on other permissions. For example, a user cannot send a message to a channel they cannot view.</p>
                <SectionLink id="how-to">
                    <h2 className="text-4xl">How To</h2>
                </SectionLink>
                <SectionLink id="how-to-intro">
                    <h3 className="text-3xl">Introduction</h3>
                </SectionLink>
                <p>
                    Due to the way permissions are calculated (positive role-level overrides always overrule negative role-level overrides regardless of
                    hierarchy), you want to grant as few positive overrides as possible. Note that positive{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>
                    -level overrides are not an issue as role-level overrides take priority.
                </p>
                <p>
                    In the following sections, we cover many common patterns, the best way to set them up to optimize maintainability, and common pitfalls to
                    watch out for.
                </p>
                <SectionLink id="verification-role">
                    <h3 className="text-3xl">Verification Role</h3>
                </SectionLink>
                <p>
                    Most servers have a role that is granted by clicking on the verification prompt to confirm that they have read the rules (as a weak filter
                    against bots). Typically, channels are only visible to verified users except landing channels. Giving the verified role allow overrides will
                    prevent you from denying them on other roles, so be careful with overrides.
                </p>
                <p>
                    Before you set one up, consider using Discord&apos;s built-in member verification. This is stronger than verification roles, as a user who
                    has not passed membership screening cannot DM server members. It automatically disables all interaction, including clicking buttons or
                    adding to existing reactions. Verification roles are already a weak filter against bots, and allowing{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    to see all public channels does not actually create any tangible threat.
                </p>
                <p>
                    If you&apos;ve decided to do this anyway, the best way to set it up is to deny{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    and grant your verification role View Channel at a base level. All channels are now automatically visible only to verified users. Then, just
                    allow{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>
                    permission to see your landing channels via overrides (remember that allow{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>
                    -level overrides are not an issue).
                </p>
                <p>
                    In addition to not using unnecessary allow overrides, this is actually easier as you will only need to set up overrides on your landing
                    channels. A common way to do this is to use a deny{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>
                    -level and allow role-level override on all non-landing channels, which is not only harder but also introduces allow role-level overrides.
                </p>
                <p>
                    If you want a public channel that{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    can see but only verified users can send messages in, just disable Send Messages for{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    and enable it for the verified role. If you then need a channel that{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    can send messages in, just enable that via an override.
                </p>
                <SectionLink id="access-roles">
                    <h3 className="text-3xl">Access Roles</h3>
                </SectionLink>
                <p>
                    You may want to lock some channels behind access roles such as reaction roles, or staff channels for staff roles. For example, you might
                    want to restrict your leaks channel behind a self-assignable role. In this case, you will need to use an allow role-level override. It is
                    unavoidable, but this is acceptable because usually you don&apos;t need to set deny role-level overrides just for viewing the channel.
                </p>
                <p>
                    Before you set these up, consider using Discord&apos;s built-in onboarding system which allows you to prompt members for what they want to
                    see and hide channels that they don&apos;t need. Instead of denying permission, the channels are simply hidden and users can choose to
                    hide/show channels at will. If you are restricting your channels just to keep the channel list clean, this is much easier.
                </p>
                <p>
                    Firstly, add a deny{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>
                    -level override for{" "}
                    <a href="/info/discord/permission-list#VIEW_CHANNEL" className="link" target="_blank">
                        View Channel
                    </a>
                    . Then, add allow role-level overrides for any roles you want to grant access.
                </p>
                <p>
                    Importantly, do not enable any other permissions such as sending messages. If a user cannot see a channel, they cannot take any actions
                    relating to the channel anyway.
                </p>
                <SectionLink id="public-staff-channels">
                    <h3 className="text-3xl">Read-Only Public Channels</h3>
                </SectionLink>
                <p>
                    Let&apos;s say you want a gallery-style channel that only staff (or restricted users) may send messages in but everyone can see. For this,
                    you will need to grant an allow role-level override. However, if it&apos;s going to staff, it is fine. The reason you want to avoid allow
                    role-level overrides is that it stops you from disabling it per role via things like mute roles. However, you should not need to mute your
                    staff members. Also, you have the option to use timeouts if needed.
                </p>
                <SectionLink id="mute-role">
                    <h3 className="text-3xl">Mute Role</h3>
                </SectionLink>
                <p>
                    Before you read this, consider if you want to use mute roles. Discord now has timeouts which are very similar but built into the system.
                    There are several advantages &mdash; it makes it obvious to the user that they are timed out, lets moderators easily identify that they are
                    timed out without letting other users be able to know, and shows a countdown to the user in the client.
                </p>
                <p>
                    There are a few disadvantages as well &mdash; it can only last up to 28 days, and it disables all permissions except{" "}
                    <a href="/info/discord/permission-list#VIEW_CHANNEL" className="link" target="_blank">
                        View Channel
                    </a>{" "}
                    and{" "}
                    <a href="/info/discord/permission-list#READ_MESSAGE_HISTORY" className="link" target="_blank">
                        Read Message History
                    </a>
                    . In fact, they cannot even react, even to reactions that already exist, and cannot interact with buttons either. This prevents them from
                    using reaction roles.
                </p>
                <p>
                    If you have decided that you want to use a mute role instead, you will want to set an override in every channel (where the mute role
                    matters) that denies permissions you want muted users to be unable to use. We recommend{" "}
                    <a href="/info/discord/permission-list#SEND_MESSAGES" className="link" target="_blank">
                        Send Messages
                    </a>
                    ,{" "}
                    <a href="/info/discord/permission-list#SEND_MESSAGES_IN_THREADS" className="link" target="_blank">
                        Send Messages In Threads
                    </a>
                    ,{" "}
                    <a href="/info/discord/permission-list#ADD_REACTIONS" className="link" target="_blank">
                        Add Reactions
                    </a>
                    , and{" "}
                    <a href="/info/discord/permission-list#CONNECT" className="link" target="_blank">
                        Connect
                    </a>
                    . If you allow regular members to create threads, you should deny those permissions to the mute role as well.
                </p>
            </div>
        </Container>
    );
}
