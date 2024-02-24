"use client";

import { FaComments } from "react-icons/fa6";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";
import SectionLink from "../../../components/ui/section-link";

export default function DocsGlobalChatModeration() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Global Chat Moderation</h1>
                <p>
                    This document outlines how to moderate the global chat, both in terms of technical features and policies. This document is subject to change
                    at any time and should not be considered as official or policy. The two documents linked below are official policy.
                </p>
                <ul>
                    <li>
                        <a href="/docs/global-chat-rules" className="link">
                            Global Chat Rules
                        </a>
                    </li>
                    <li>
                        <a href="/docs/global-chat-mod-agreement" className="link">
                            Global Chat Mod Agreement
                        </a>
                    </li>
                </ul>
                <SectionLink id="how-it-works">
                    <h2 className="text-4xl">How It Works</h2>
                </SectionLink>
                <ul>
                    <li>
                        When a message is sent in a global channel, the bot first checks if it is allowed to be sent.
                        <ul>
                            <li>
                                If the user is banned or the message contains any filtered content, it is deleted immediately and logged, and nothing more
                                happens.
                            </li>
                        </ul>
                    </li>
                    <li>If it is allowed to be sent, it will be copied by the bot via a webhook message to all other connected channels.</li>
                    <li>If a message&apos;s source is edited, it will be edited everywhere.</li>
                    <li>If a message or any of its copies are deleted anywhere, it will be deleted everywhere, including from the origin server.</li>
                </ul>
                <SectionLink id="features">
                    <h2 className="text-4xl">Features</h2>
                </SectionLink>
                <ul>
                    <li>
                        Right click / long hold a message and select <code>Apps &gt; Get Author</code> or use <code>/global author</code> to identify the user
                        that sent a message.
                    </li>
                    <li>
                        Right click / long hold a message and select <code>Apps &gt; Purge</code> or use <code>/global purge message</code> to force-delete a
                        message and all of its copies, even if an attempt to delete it already occurred.
                    </li>
                    <li>
                        Use <code>/global ban</code> to ban a user from a global channel, preventing them from sending messages to it from any server. You can
                        also ban them locally, which prevents them from sending messages in one server only and blocks their messages from being relayed to it.
                    </li>
                    <li>
                        Use <code>/global help</code> to show a help modal about how global chat works in case people are confused or asking why everyone is a
                        bot.
                    </li>
                    <li>Delete a message anywhere to delete it everywhere.</li>
                </ul>
                <SectionLink id="moderation-philosophy">
                    <h2 className="text-4xl">Moderation Philosophy</h2>
                </SectionLink>
                <p>
                    When guidance can be given, it should be preferred over warnings and penalties. When a user should know better and/or has demonstrated that
                    they are not changing or improving, they should be warned. When a user has been warned enough times that they should know they are not
                    allowed to do what they are doing and/or has demonstrated that they will not change or improve, they should be banned.
                </p>
                <SectionLink id="policy">
                    <h2 className="text-4xl">Policy</h2>
                </SectionLink>
                <ul>
                    <li>
                        For minor offenses (generally, when you believe a user should not be penalized because it was not severe enough) or if it was a
                        conversation that went a bit too far on behalf of many users, verbal warnings can be delivered in the chat itself, serving also to
                        remind everyone else of the rules. However, be careful not to allow the chat to devolve into a witch-hunt or berate the user.
                    </li>
                    <li>
                        For more significant warnings, DM the user instead (it may still be a good idea to leave a reminder in chat about the specific rule and
                        to follow the rules).
                    </li>
                    <li>
                        Once a user has demonstrated inability to change and comply with rules and regulations (within your reasonable judgement), ban them, and
                        if you believe they deserve an explanation, DM them the reason (e.g. for scam bots, just ban them and don&apos;t bother doing anything
                        else).
                    </li>
                    <li>
                        If a user has caused significant or grievous harm, feel free to escalate to the observers to discuss a banshare or just submit a
                        banshare.
                    </li>
                </ul>
                <SectionLink id="watchlist">
                    <h2 className="text-4xl">Watchlist</h2>
                </SectionLink>
                <ul>
                    <li>
                        Log any offenses in a user&apos;s watchlist entry in{" "}
                        <Mention>
                            <FaComments></FaComments> global-watchlist
                        </Mention>
                        . If multiple users were involved, make sure you add them to all cases.
                    </li>
                    <li>Refer to the watchlist when dealing with an offense to see what level of sanction should be applied.</li>
                </ul>
                <SectionLink id="common-offenses">
                    <h2 className="text-4xl">Common Offenses &amp; Sanctions</h2>
                </SectionLink>
                <ul>
                    <li>
                        <b>NSFW/NSFL</b>
                        <ul>
                            <li>If it is borderline or non-graphic text, start as a minor offense.</li>
                            <li>
                                If it is more explicit or graphic, start as at least a formal warning, or if it is significantly disturbing or obviously
                                intended to be harmful, this warrants an immediate ban.
                            </li>
                            <li>If it is substantially explicit or graphic or disturbing, or is spammed, escalate it to a banshare.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Harassment</b>
                        <ul>
                            <li>If it is banter that was taken too far, start as a minor offense.</li>
                            <li>For &quot;heat of the moment&quot; random attacks, start as a formal warning.</li>
                            <li>
                                For clearly targeted or repeated attacks, start as at least a formal warning or ban if it is notably repeated and premeditated.
                            </li>
                            <li>
                                For cases of doxxing, death threats, encouragement of suicide, etc. this warrants an immediate ban in most cases or should be
                                escalated to a banshare if it is particularly severe.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Spam</b>
                        <ul>
                            <li>If it is a bot (hacked / compromised) account, just ban it.</li>
                            <li>If someone is flooding a channel seemingly non-maliciously, start as a minor offense.</li>
                            <li>If someone is flooding a channel deliberately, even if the content itself would not be harmful in isolation, just ban them.</li>
                            <li>Self-promotion is not allowed and should start as a minor offense.</li>
                            <li>Promotion of servers is not allowed (and invite links are obscured by global chat) and should start as a minor offense.</li>
                        </ul>
                    </li>
                </ul>
                <p>
                    For everything else, use your judgement and discuss with your fellow moderators. If a user is causing trouble repeatedly and not stopping
                    and requires your immediate action without time to discuss, they probably can just be banned.
                </p>
                <p>
                    Do not be too hesitant to ban! Global-banning a user does not ban them from any servers, it just forbids them from participating in global
                    chat, which does not really have resources like servers do, and it also does not prevent read access. Global chat is much more so a
                    privilege than a right and it is more important to keep the environment safe and clean.
                </p>
                <SectionLink id="appeals">
                    <h2 className="text-4xl">Appeals</h2>
                </SectionLink>
                <ul>
                    <li>
                        Appeals can be submitted to TCN Hub modmail. The modmail is only visible to hub moderators by default, but global mods will be added to
                        the thread if it pertains to global chat.
                    </li>
                    <li>
                        Warnings can be revoked under the following (non-exhaustive) circumstances:
                        <ul>
                            <li>The initial warning was not valid (the user did not do anything, the offense was not a rule violation, etc.).</li>
                            <li>The offense can be justified under some circumstance (this will rarely happen).</li>
                        </ul>
                    </li>
                    <li>
                        Bans can be overturned under the following (non-exhaustive) circumstances:
                        <ul>
                            <li>Any of the reasons for revoking warnings.</li>
                            <li>The user was not sufficiently warned before being banned (for offenses that do not warrant immediate ban-on-sight).</li>
                            <li>
                                The user can demonstrate that they understand their reason for being banned and acknowledge those problems and show that they
                                are apologetic and have a desire to change.
                            </li>
                            <li>The user has demonstrated that they have changed elsewhere, tangibly (e.g. in another TCN server outside of global chat).</li>
                        </ul>
                    </li>
                </ul>
                <SectionLink id="responding-to-inquiries">
                    <h2 className="text-4xl">Responding to Inquiries</h2>
                </SectionLink>
                <ul>
                    <li>
                        You may answer members&apos; questions about rules and policies, but feel free to ask for another mod or an observer (you are not
                        required or expected to publicly explain rules).
                    </li>
                    <li>
                        If members inquire about other member&apos;s punishments, tell them to ask the member themselves. Do not share member cases, and we will
                        not answer those inquiries through private modmail either.
                    </li>
                    <li>
                        If members ask for other users to be unbanned, tell them the member may appeal through modmail but asking for unbans through another
                        member is not allowed.
                    </li>
                    <li>
                        If members ask for direct mod actions (e.g. &quot;ban this user&quot;), act as you deem appropriate but if the action would not be
                        appropriate, inform the member they can call for mod attention if they believe there is a problem but to not ask for direct actions
                        (backseat moderating).
                    </li>
                </ul>
            </div>
        </Container>
    );
}
