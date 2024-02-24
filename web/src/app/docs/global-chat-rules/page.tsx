"use client";

import Container from "../../../components/ui/container";
import SectionLink from "../../../components/ui/section-link";
import UserMention from "../../../components/ui/user-mention";

export default function DocsGlobalChatRules() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Global Chat Rules</h1>
                <p>
                    These rules are not intended as a comprehensive list of permitted and forbidden behavior, but as a general guideline on acceptable conduct.
                    You are expected to use your own common sense judgement, and moderators may act outside of the rules at their discretion within reason.
                </p>
                <p>
                    Disputes regarding interpretations of the rules or moderator actions may be sent to modmail in the{" "}
                    <a href={process.env.NEXT_PUBLIC_INVITE} className="link" target="_blank">
                        TCN Hub
                    </a>{" "}
                    by DMing <UserMention id={process.env.NEXT_PUBLIC_MODMAIL_BOT_ID!}></UserMention> after joining the server.
                </p>
                <p>Inappropriate behavior in DMs or in TCN servers outside of global chat may also result in penalties applied in global chat.</p>
                <SectionLink id="be-nice">
                    <h2 className="text-4xl">
                        <code>#1</code> Be Nice
                    </h2>
                </SectionLink>
                <ul>
                    <li>No harassment, discrimination, personal attacks, hateful language, use of slurs, brigading, witch-hunting, etc.</li>
                    <li>
                        In case of other users being disrespectful, disengage from the situation and alert mods if needed; insulting the user back will result
                        in both parties being punished accordingly to their behavior.
                    </li>
                    <li>Being nice extends to all parties &mdash; other members, moderators, users not in the global chat, non-TCN servers, etc.</li>
                </ul>
                <SectionLink id="no-nsfw">
                    <h2 className="text-4xl">
                        <code>#2</code> No NSFW/NSFL
                    </h2>
                </SectionLink>
                <ul>
                    <li>
                        Most connected servers are strict on NSFW, so even if the server from which you are chatting is lenient on this, it still isn&apos;t
                        allowed in global chat.
                    </li>
                    <li>
                        NSFW/NSFL content includes everything &mdash; media, text (including usernames), profile avatars, etc. both explicitly and implicitly.
                    </li>
                </ul>
                <SectionLink id="no-spoilers">
                    <h2 className="text-4xl">
                        <code>#3</code> No Leaks/Unmarked Spoilers
                    </h2>
                </SectionLink>
                <ul>
                    <li>Leaks are not allowed in global channels and should be kept to channels in your server that permit leaks.</li>
                    <li>This rule applies to both Genshin Impact and any other games / media.</li>
                    <li>Mark spoilers, both for Genshin Impact and otherwise (within reason).</li>
                </ul>
                <SectionLink id="no-drama">
                    <h2 className="text-4xl">
                        <code>#4</code> No Drama
                    </h2>
                </SectionLink>
                <ul>
                    <li>
                        Do not complain about your ban/mute in another server &mdash; if you have an issue with a TCN server&apos;s actions, you can contact the
                        TCN via modmail as detailed at the top of this document.
                    </li>
                    <li>
                        Political and religious conversations are not banned outright, but as they can rapidly start drama, we discourage them as they may get
                        out of your control and result in the conversation being shut down and/or punishments.
                    </li>
                    <li>Personal drama and server drama, whether or not from within the TCN, is not to be discussed in global chat.</li>
                    <li>Do not complain about moderator actions here; contact the TCN via modmail if you wish to dispute actions or punishments.</li>
                </ul>
                <SectionLink id="no-spam">
                    <h2 className="text-4xl">
                        <code>#5</code> No Spam
                    </h2>
                </SectionLink>
                <ul>
                    <li>Do not flood chat; be considerate of others&apos; use of the channel.</li>
                    <li>
                        Do not jump around servers just for the sake of it as that is disruptive and causes your consecutive messages to not group together.
                    </li>
                </ul>
                <SectionLink id="no-advertisement">
                    <h2 className="text-4xl">
                        <code>#6</code> No Advertisement
                    </h2>
                </SectionLink>
                <ul>
                    <li>Do not advertise &mdash; this includes self-promotion, server advertisement, etc.</li>
                </ul>
                <SectionLink id="language">
                    <h2 className="text-4xl">
                        <code>#7</code> Language &mdash; English
                    </h2>
                </SectionLink>
                <ul>
                    <li>For purposes of moderation, please keep conversations to English only.</li>
                    <li>Words, well-known phrases, short snippets, and memes in other languages are permitted.</li>
                </ul>
                <SectionLink id="listen-to-staff">
                    <h2 className="text-4xl">
                        <code>#8</code> Listen to Staff
                    </h2>
                </SectionLink>
                <ul>
                    <li>These rules are guidelines and not intended to be exhaustive.</li>
                    <li>Moderators are entrusted to make the final call on situations.</li>
                    <li>
                        If you believe a moderator&apos;s actions were not in good faith, counterproductive, or otherwise a mistake, contact the TCN via
                        modmail.
                    </li>
                </ul>
            </div>
        </Container>
    );
}
