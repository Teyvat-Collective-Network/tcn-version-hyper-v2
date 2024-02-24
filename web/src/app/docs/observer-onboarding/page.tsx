"use client";

import { FaAt, FaBullhorn, FaComments, FaFolder, FaHashtag, FaVolumeHigh } from "react-icons/fa6";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";
import SectionLink from "../../../components/ui/section-link";
import UserMention from "../../../components/ui/user-mention";

export default function DocsObserverOnboarding() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Observer Onboarding</h1>
                <p>
                    The purpose of this document is to introduce you to the proceedings around the network, familiarize yourself with your responsibilities and
                    the features within the TCN and HQ, and give you an idea of what you should expect and what is expected of you.
                </p>
                <SectionLink id="important-information">
                    <h2 className="text-4xl">Important Information</h2>
                </SectionLink>
                <ul>
                    <li>
                        <b>Do not delete channels in HQ.</b> Nukeguard is configured to quarantine (ban) users who do in order to prevent mistakes, compromised
                        accounts, etc. If you need a channel deleted, have it discussed with the team and the server owner can safely delete it (or nukeguard
                        can be disabled temporarily).
                    </li>
                    <li>
                        Do not delete most important roles. Server color roles are fine to delete, but things like the admin and observer roles, ping roles, and
                        council position roles (server owner, council advisor) are also protected by nukeguard.
                    </li>
                </ul>
                <SectionLink id="directory">
                    <h2 className="text-4xl">Directory</h2>
                </SectionLink>
                <p>The following roles are available for you to assign to yourself if you want pings on certain things. These are all optional.</p>
                <ul>
                    <li>
                        <Mention>
                            <FaAt></FaAt> Ticket Ping
                        </Mention>{" "}
                        &mdash; This role is pinged when tickets are opened via{" "}
                        <Mention>
                            <FaHashtag></FaHashtag> contact-observers
                        </Mention>
                        .
                    </li>
                    <li>
                        <Mention>
                            <FaAt></FaAt> Banshare Ping
                        </Mention>{" "}
                        &mdash; This role is pinged when non-urgent banshares are posted to{" "}
                        <Mention>
                            <FaHashtag></FaHashtag> ban-share-logs
                        </Mention>
                        . Urgent banshares will ping all observers.
                    </li>
                </ul>
                <p>The following channels are relevant to you and are not documented in the public directory.</p>
                <ul>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> important
                        </Mention>{" "}
                        &mdash; This channel contains some important links for you.
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> exec-management
                        </Mention>{" "}
                        &mdash; This is the main (private) observer channel.
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> nsfw-evidence
                        </Mention>{" "}
                        &mdash; This is for posting evidence pertaining topics in discussion that are NSFW and cannot be posted in regular channels.
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> exec-bot-spam
                        </Mention>{" "}
                        &mdash; This is the private bot spam / bot command channel.
                    </li>
                    <li>
                        <Mention>
                            <FaComments></FaComments> exec-projects
                        </Mention>{" "}
                        &mdash; This is a forum for ongoing projects that do not concern the public. Feel free to open new forum posts in here anytime.
                    </li>
                    <li>
                        <Mention>
                            <FaVolumeHigh></FaVolumeHigh> Observer Voice Chat
                        </Mention>{" "}
                        &mdash; This is the observer-only voice channel and may be used for meetings, discussions, or anything else.
                    </li>
                    <li>
                        <Mention>
                            <FaFolder></FaFolder> Logs
                        </Mention>{" "}
                        &mdash; This category contains log channels. These will be introduced later on.
                    </li>
                </ul>
                <SectionLink id="active-responsibilities">
                    <h2 className="text-4xl">Active Responsibilities</h2>
                </SectionLink>
                <p>
                    Refer to the{" "}
                    <a href="/docs/observer-tasks" className="link" target="_blank">
                        Observer Task Division
                    </a>{" "}
                    page for a list of core tasks and their assignments.
                </p>
                <SectionLink id="hub">
                    <h2 className="text-4xl">TCN Hub</h2>
                </SectionLink>
                <p>
                    Remember that the Hub is also a very important component of the TCN as it is a public resource center and our main line of communication
                    with the public. Check the{" "}
                    <a href="/docs/hub-communication-standards" className="link" target="_blank">
                        TCN Hub Communication Standards
                    </a>{" "}
                    for guidelines on what information should be communicated with the hub through announcements. Here is a quick list of things in the Hub to
                    keep an eye on.
                </p>
                <ul>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> partner-list
                        </Mention>{" "}
                        contains an automatically synced version of the embed. This is a good place to check to ensure the synchronization is working correctly.
                    </li>
                    <li>
                        <Mention>
                            <FaBullhorn></FaBullhorn> announcements
                        </Mention>{" "}
                        should be used to announce all important information in line with the communication standards document.
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> network-events
                        </Mention>{" "}
                        receives published items from HQ&apos;s{" "}
                        <Mention>
                            <FaBullhorn></FaBullhorn> network-events
                        </Mention>
                        .
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> banshares
                        </Mention>{" "}
                        receives published banshares and acts like any other banshare-receiving server. It is visible to all staff on the network. Note that
                        banshares are never automatically executed here as the hub is used for ban appeals.
                    </li>
                    <li>
                        <Mention>
                            <FaFolder></FaFolder> Hub Moderator HQ
                        </Mention>{" "}
                        is used for hub moderation. This is currently empty and there are no plans to make this a team; necessary moderation is covered by
                        observers.
                    </li>
                    <li>
                        <Mention>
                            <FaFolder></FaFolder> Global Mod HQ
                        </Mention>{" "}
                        is used for global chat moderation. For more information, see{" "}
                        <a href="/docs/global-chat-moderation" className="link" target="_blank">
                            Global Chat Moderation
                        </a>
                        .
                    </li>
                    <li>
                        <Mention>
                            <FaFolder></FaFolder> Logs
                        </Mention>{" "}
                        contains all logging features that{" "}
                        <a href="https://daedalusbot.xyz" className="link" target="_blank">
                            Daedalus
                        </a>{" "}
                        supports.
                    </li>
                    <li>
                        <Mention>
                            <FaComments></FaComments> questions
                        </Mention>{" "}
                        is for general questions; monitor this and answer any questions the public has.
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> suggestions
                        </Mention>{" "}
                        works the same as in HQ.
                    </li>
                    <li>
                        <Mention>
                            <FaHashtag></FaHashtag> tavern-collab
                        </Mention>{" "}
                        is the collaboration channel with Genshin Impact Tavern. Make sure you monitor for event collaboration offers to relay and event
                        cross-post requests.
                    </li>
                </ul>
                <SectionLink id="bots">
                    <h2 className="text-4xl">Bots</h2>
                </SectionLink>
                <p>
                    All technical features of the TCN are owned and operated by <UserMention id="251082987360223233"></UserMention>. Please contact them for any
                    issues or questions.
                </p>
                <SectionLink id="global-chat">
                    <h3 className="text-3xl">Global Chat</h3>
                </SectionLink>
                <ul>
                    <li>
                        <code>/global connect</code> connects a channel. As an observer, you can invoke this in non-TCN servers. TCN servers are permitted to
                        use TCN global chat for collaboration events with non-TCN servers. Do not abuse this.
                    </li>
                    <li>
                        <code>/global disconnect</code> disconnects a channel. As an observer, you can disconnect channels in any server. Do not abuse this.
                        Consider suspending the connection for things like quarantining raids.
                    </li>
                    <li>
                        <code>/global connection suspend</code> stops relaying messages to and from a channel. You can do this in any server, and it is useful
                        for things like quarantining raids as it continues to relay message deletion.
                    </li>
                    <li>
                        <code>/global channels create</code> is used to create new global channels (as in, an instance that people may connect to). You can use
                        this to create temporary event channels for servers.
                    </li>
                    <li>
                        <code>/global mods add</code> adds a user to a channel&apos;s mod team. This grants them permission to ban users globally.
                    </li>
                </ul>
                <SectionLink id="banshares">
                    <h3 className="text-3xl">Banshares</h3>
                </SectionLink>
                <ul>
                    <li>
                        Banshares are automatically posted to{" "}
                        <Mention>
                            <FaHashtag></FaHashtag> ban-share-logs
                        </Mention>{" "}
                        when a user submits it through the{" "}
                        <a href="/banshare" className="link" target="_blank">
                            form
                        </a>
                        .
                    </li>
                    <li>
                        Review banshares in accordance with the{" "}
                        <a href="/info/banshares#policy" className="link" target="_blank">
                            banshare policy
                        </a>
                        .
                    </li>
                    <li>
                        To change the severity of a banshare, reject, publish, or rescind it, just use the buttons under the post. You can find information
                        about the lifecycle of banshares and the meaning of severities on the{" "}
                        <a href="/info/banshares" className="link" target="_blank">
                            banshare information page
                        </a>
                        .
                    </li>
                </ul>
                <SectionLink id="votes">
                    <h3 className="text-3xl">Votes</h3>
                </SectionLink>
                <p>
                    To create a vote, go to the{" "}
                    <a href="/vote" className="link" target="_blank">
                        voting center
                    </a>{" "}
                    and click <b>Create Vote</b>. Here&apos;s what you need to know:
                </p>
                <ul>
                    <li>
                        The mode is the type of vote and cannot be changed once the vote is created.
                        <ul>
                            <li>
                                <b>Proposal</b> will create a yes/no vote.
                                <ul>
                                    <li>If there is a tie, the result will be displayed and it will state that there is a tie.</li>
                                </ul>
                            </li>
                            <li>
                                <b>Induction</b> will create a standard induction vote.
                                <ul>
                                    <li>
                                        Select the <b>pre-induct</b> option if and only if the server&apos;s mascot character has not been officially confirmed
                                        as playable.
                                    </li>
                                    <li>
                                        For partial re-votes in case of a tie between induct/pre-induct or reject/extend observation, use a <b>Selection</b>{" "}
                                        vote.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <b>Election</b> will create an election. More information about operating elections is available later in this document.
                                <ul>
                                    <li>The actual votes will be hidden, and it will only display which candidates were elected and in no particular order.</li>
                                    <li>
                                        Set <b>Seats</b> equal to the number of open positions for election.
                                    </li>
                                    <li>
                                        Add candidates with the <b>Add Candidate</b> button. You may have up to 20 candidates. If, for some reason, you need
                                        more than that, you will need to find an alternative method (e.g. you can use a Google Form, which is how elections used
                                        to be done).
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <b>Selection</b> will create a multiple-choice vote.
                                <ul>
                                    <li>
                                        The result will be displayed as-is. Each vote may have its own method for determining the vote and whether it counts as
                                        a tie, so the bot will not calculate a result.
                                    </li>
                                    <li>
                                        Set <b>Must select ≥</b> and <b>Must select ≤</b> to restrict how many options voters are permitted to set. The default
                                        of <b>1 / 1</b> means it is a single-choice vote.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>In all modes, if quorum is not reached, the result will not be displayed.</li>
                    <li>
                        Set the number of hours. Note that this is relative to when you save it, so if you edit the poll partway through its window and save it
                        as-is, it will refresh the window to the full length. This is by design, but you can alter the amount of time to adjust for this.
                        <ul>
                            <li>
                                Except in edge cases where extra time is needed for votes requiring more consideration or reading, votes should always be open
                                for 48 hours. This is a constitutional minimum, so votes may not be shorter.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Set <b>Live</b> to true if you want the vote to display live results. This is only permitted for non-standard votes such as a general
                        interest check poll, and in general, is forbidden for regular votes.
                    </li>
                    <li>
                        Set <b>Restricted</b> to false to allow all council members to vote rather than just the designated voters. This is generally only
                        applicable for elections or non-standard votes.
                    </li>
                    <li>
                        Set <b>DM</b> to false to skip DMing users 24 hours before closing. Note that this option becomes false on its own after the DM trigger
                        occurs. If you edit the poll and set it to true, it will send the DMs again once there are 24 or fewer hours left. In general, you
                        should not modify this value while editing.
                    </li>
                    <li>
                        Set <b>Quorum</b> to the minimum turnout required. If quorum is not reached, the results are hidden if <b>Live</b> is false.
                    </li>
                </ul>
                <SectionLink id="elections">
                    <h3 className="text-3xl">Elections</h3>
                </SectionLink>
                <p>
                    Elections are operated in two phases, with a nomination/statements phase first and a voting phase second. To initiate an election, use{" "}
                    <code>/hq election start</code>.
                </p>
                <ul>
                    <li>
                        <code>wave</code> refers to which election it is. Find the last election and add one to its wave.
                    </li>
                    <li>
                        <code>seats</code> refers to how many positions are available.
                    </li>
                    <li>
                        <code>short-reason</code> is placed in the forum post creation message. Usually, it will be of the form{" "}
                        <b>Regular end-of-term for (users)</b>.
                    </li>
                    <li>
                        <code>long-reason</code> is placed in the follow-up message. Usually, it will be of the form{" "}
                        <b>(users)&apos;s term(s) are ending soon</b>.
                    </li>
                    <li>
                        <code>nomination-window</code> is optional and defaults to 7, which is also the minimum. This is the number of days of the nomination
                        phase. You may set the nomination window to longer if needed, but generally you can ignore this option as it does not change anything
                        except the displayed dates; it does not automatically start the election after the window is over.
                    </li>
                </ul>
                <p>
                    Once you are ready to start the voting phase, pin and mark all candidate statements by right clicking the message (long hold on mobile) and
                    selecting <code>Apps &gt; Mark Statement</code>. If you accidentally mark a non-statement, use <code>Apps &gt; Unmark Statement</code>. Once
                    you&apos;re done, run <code>/hq election post-summary</code> to automatically generate a statement list with links. Then, you can start the
                    vote following the directions above. Remember to lock the election thread.
                </p>
                <SectionLink id="expectations">
                    <h2 className="text-4xl">Expectations</h2>
                </SectionLink>
                <p>
                    This section is not a complete list of expectations nor is it objective. This is simply to give you a rough idea of what is expected of you,
                    but your intuition and individual judgement is a crucial part of your success as an observer.
                </p>
                <ul>
                    <li>
                        <b>Be a role model.</b> As an observer, the council should be able to look up to you as an example. Everything that is expected of
                        council members is expected of you even more. This includes &mdash; but is not limited to &mdash; the following.
                        <ul>
                            <li>
                                <b>Be respectful.</b> This does not mean you are not allowed to raise criticism or that you have to put on a nice facade. You
                                are expected to approach issues with civility and the appropriate amount of compassion, but ensuring that what&apos;s necessary
                                is done is still integral.
                            </li>
                            <li>
                                <b>Be punctual.</b> While things aren&apos;t very time-sensitive, we have an expectation as a team to address things in a timely
                                fashion. For example, banshares should be published within a reasonable time frame, events should be crossposted without
                                excessive delay, and the weekly summary should be done on time.
                            </li>
                            <li>
                                <b>Be present.</b> It is an expectation of all designated voters to vote, and you should be present to vote (if you are a voter)
                                and for discussions regarding network matters.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Be a leader.</b> More than just a background administrator, you are also looked upon to lead discussions and drive changes. If you
                        see points being forgotten or discussions stagnating, look for opportunities to ressurect important conversations and bring points back
                        into the discussion and ensure all perspectives are considered.
                    </li>
                    <li>
                        <b>Empower others.</b> It can be intimidating to raise concerns or bring up points to the council during discussions, especially when
                        things get heated. As an observer, your authority also carries weight. Look for opportunities to use it to ensure everyone has a voice
                        and advocate for compassion and consideration of different points of view.
                    </li>
                    <li>
                        <b>Be a team player.</b> The success of the TCN lies in its democracy, transparency, and open communication. By extension, the success
                        of the observer team in charge of its operation lies in its communication and teamwork. Make sure that you&apos;re on the same page as
                        the team. Your individual judgement is still important, but for things like reaching out to parties, responding to official inquiries,
                        etc. make sure you discuss with the team first. Additionally, make sure you follow up on things in accordance with the team&apos;s
                        agreements.
                    </li>
                    <li>
                        <b>Recognize the weight of your title.</b> As an observer, you are entrusted with the reputation of the network, and your actions carry
                        more weight due to your role. You can still have personal conversations and friendly relations, but acknowledge and act in consideration
                        of the fact that your words may be considered more official, even if you don&apos;t mean it that way, and even if you don&apos;t think
                        it makes sense.
                        <ul>
                            <li>
                                You should not be paranoid about every word you say, and particularly within HQ people are less likely to misinterpret your
                                words as official when you are just giving your opinion.
                            </li>
                            <li>
                                However, when reaching out to or talking to outside parties concerning the TCN or the Genshin Impact Discord community as a
                                whole, make sure you are clear if you are not speaking in official capacity, and follow the standards of teamwork and
                                communication if you are.
                            </li>
                            <li>
                                Consider: &quot;Would the council approve of what I am saying?&quot; If it is clear to you that they would, it&apos;s fine to
                                speak in official capacity. Additionally, relaying things that are factually true such as things in our constitution or info
                                pages is completely fine.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </Container>
    );
}
