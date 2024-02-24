"use client";

import Container from "../../../components/ui/container";

export default function DocsGlobalChatModAgreement() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Global Chat Mod Agreement</h1>
                <p>
                    In order to be a global chat moderator, you must review and accept this agreement. The purpose of this agreement is both so you acknowledge
                    certain policies in place and promise to follow them and to detail our responsibilities to you and what we offer you.
                </p>
                <h2 className="text-4xl">Terms of the Agreement</h2>
                <p>
                    <b>You acknowledge and agree that</b>, as a volunteer global chat moderator:
                </p>
                <ol>
                    <li>You will abide by the Global Chat Rules and enforce it to the best of your ability.</li>
                    <li>
                        You will abide by all Discord Terms of Service and Community Guidelines and maintain the global chat environment in accordance with its
                        rules and guidelines to the best of your ability.
                    </li>
                    <li>
                        You will not abuse your moderator position in any way, including, but not limited to:
                        <ol>
                            <li>Using moderator privileges in personal disputes not in line with the rules.</li>
                            <li>Threatening moderator action for personal benefit not in line with the rules.</li>
                            <li>
                                Revealing private discussions or otherwise publicizing / &quot;leaking&quot; private information e.g. user punishments.
                                <ol>
                                    <li>
                                        In situations like with spam bots, informing chat that you banned them or answering someone asking &quot;what
                                        happened&quot; is not considered revealing private information, as anyone else watching chat would have been able to see
                                        the messages.
                                    </li>
                                    <li>
                                        Essentially, do not reveal anything that is between the mod team and the user (such as discussions on behavior) or
                                        within the mod team only (such as who is being watched by the mods).
                                    </li>
                                </ol>
                            </li>
                            <li>Any other form of abuse of authority or permissions.</li>
                        </ol>
                    </li>
                    <li>Your actions reflect on the TCN and therefore violations of the rules may be treated more harshly.</li>
                    <li>
                        You do not represent the TCN nor speak on its behalf and are solely responsible for your statements and actions, which do not represent
                        the views, opinions, or actions of the TCN.
                    </li>
                </ol>
                <p>
                    <b>The TCN agrees to:</b>
                </p>
                <ol>
                    <li>Reasonably protect and defend your actions and authority and support you as needed for you to effectively moderate.</li>
                    <li>Maintain transparent discussion regarding policy changes.</li>
                    <li>Allow you to resign at any time without requiring a reason and without any penalty.</li>
                    <li>
                        Respect your right to question and challenge policies and the TCN without punishment so long as it is reasonably civil and in good
                        faith.
                    </li>
                    <li>Inform you in advance of planned changes to the rules or moderator agreement and give reasonable time for feedback.</li>
                </ol>
                <p>Should this document be changed, you will be asked to agree to the changes within a reasonable rollover period.</p>
            </div>
        </Container>
    );
}
