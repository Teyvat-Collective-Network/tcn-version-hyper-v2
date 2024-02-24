"use client";

import { FaHashtag } from "react-icons/fa6";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";
import SectionLink from "../../../components/ui/section-link";

export default function DocsObservationGuide() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Observation Guide</h1>
                <SectionLink id="introduction">
                    <h2 className="text-4xl">Introduction</h2>
                </SectionLink>
                <p>
                    Make sure you are familiar with the constitution so you can evaluate the server in line with the TCN&apos;s expectations and requirements:
                </p>
                <p>
                    <a href="/info/constitution" className="link" target="_blank">
                        TCN Constitution
                    </a>
                </p>
                <p>
                    The purpose of this document is to provide a guide for observations; however, not everything here should be seen as requirements as every
                    situation will be different, and it is not comprehensive or exhaustive and adapting to the server is a vital part of successful
                    observations. Remember that you can ask for help at any time! Only one observer watches a server, but we are a team, and you can ask any
                    questions you have to ensure a smooth observation period.
                </p>
                <SectionLink id="before-you-observe">
                    <h2 className="text-4xl">Before You Observe</h2>
                </SectionLink>
                <p>Ensure the following:</p>
                <ul>
                    <li>
                        <b>You are not involved in the server.</b> Involvement includes any staff position, positions close to management such as advisor
                        positions, particular closeness with admins in the server, or anything else that reasonably results in you being biased or may result in
                        people believing your observation is biased and not objective. If in doubt, ask the other observers.
                    </li>
                    <li>
                        <b>You are not a minor observing a server with an NSFW section.</b> The NSFW section must be observed as it is integral that it is
                        regulated well. If you are a minor, you are obviously not permitted to access that section, so you will not be able to observe the
                        server fully.
                    </li>
                </ul>
                <p>
                    Once the candidate is approved for observation and has been assigned to you, contact them and let them know they can check the list of
                    observers on the{" "}
                    <a href="/contact" className="link" target="_blank">
                        contact page
                    </a>
                    .
                </p>
                <p>Make sure you request the following:</p>
                <ul>
                    <li>
                        <b>View</b> access for <b>all</b> channels in the server.
                    </li>
                    <li>Access to the audit logs.</li>
                </ul>
                <p>
                    Also, establish a clear timeline of the observation, as in when it will end (you can use{" "}
                    <a href="https://timeanddate.com" className="link" target="_blank">
                        timeanddate.com
                    </a>{" "}
                    to quickly calculate; this link is pre-filled to show 28 days after the current date when you click it). If they have any questions about
                    the timeline or the process, you can point them to Section 8 of the rules, the summary in the application form itself, or if you can&apos;t
                    answer them, ask another observer or point them to the Hub.
                </p>
                <SectionLink id="during-observation">
                    <h2 className="text-4xl">During Observation</h2>
                </SectionLink>
                <p>
                    Take note of the server&apos;s environment. This includes both the staff environment and the public community. If you see things that
                    happened before your observation period but haven&apos;t been explicitly addressed or resolved, feel free to include them as well, but read
                    until the end of this document.
                </p>
                <p>Additionally, keep a log of things that go on during the observation. This includes:</p>
                <ul>
                    <li>Incoming or outgoing staff.</li>
                    <li>Ongoing server events.</li>
                    <li>Notable changes to structure and/or rules.</li>
                    <li>Critical decisions that you believe highlight the server&apos;s function, either positive or negatively.</li>
                    <li>Staff conflicts and how they are handled.</li>
                    <li>Significant events within public channels.</li>
                </ul>
                <p>
                    If changes happen to the network, e.g. a change to rules, make sure you communicate that to the candidate, and make sure you stay up-to-date
                    on current affairs in HQ and the latest version of the rules.
                </p>
                <p>Finally, if there are questions the network or the server would like to relay to each other, you are the primary contact point.</p>
                <SectionLink id="after-observation">
                    <h2 className="text-4xl">After Observation</h2>
                </SectionLink>
                <SectionLink id="writing-the-report">
                    <h3 className="text-3xl">Writing the Report</h3>
                </SectionLink>
                <p>
                    Make sure your report includes all of the aforementioned notes that you made during your observation. Additionally, you do not need to
                    include a full server structure outline, but include a list of &quot;features&quot; the server has (e.g. leaks section, theorycrafting,
                    NSFW, etc.) as well as any notable deviations from normal server setup (e.g. no dedicated mod or admin channel, shared staff channel with a
                    sister/partner server, etc.).
                </p>
                <p>Some other things you should include:</p>
                <ul>
                    <li>
                        For leaked characters or characters that have not been confirmed as playable, include the source of confirmation for their playability
                        and information on why the leaks should be considered reliable. Leaked characters that have not appeared in official media are
                        considered spoilers and generally should not be inducted until later. Characters that officially exist whose playability is not
                        confirmed are permitted to be inducted with reliable evidence of their future playability.
                    </li>
                    <li>
                        Include notable staff activity, e.g. event planning, art staff work, the team&apos;s responsiveness to upper management and spontaneous
                        occurrences (e.g. the mod team&apos;s response time, effectiveness, and efficiency).
                    </li>
                </ul>
                <SectionLink id="open-communication">
                    <h3 className="text-3xl">Open Communication</h3>
                </SectionLink>
                <p>
                    Before posting your report, provide it to the owner for review. If a disagreement on the document&apos;s contents cannot be resolved,
                    communicate with the rest of the observer team and mark down any items that will be left in the document that are not approved by the owner.
                </p>
                <p>
                    Post your report to{" "}
                    <Mention>
                        <FaHashtag></FaHashtag> reports
                    </Mention>{" "}
                    in HQ and update the status of the candidate&apos;s post in forum applicants to <b>Observation Finished</b>. (You may have to search for the
                    post since it likely will be auto-archived before your observation is complete.)
                </p>
                <p>
                    If you have any concerns with the server or questions you want to ask them, e.g. regarding behavior predating your observation and what the
                    server&apos;s stance or state on that is now, list them out in the forum post. Other people may add or revise questions as well and based on
                    the report, generate their own concerns or comments. Maintain open communication between the server and the network to clear up all
                    misunderstandings and ensure the server is evaluated as fairly as possible.
                </p>
                <SectionLink id="voting">
                    <h3 className="text-3xl">Voting</h3>
                </SectionLink>
                <p>
                    Once the question period is over and everyone is satisfied with the communication, start a vote for the server. If you&apos;re not sure how
                    to start a vote, read the section related to votes in the{" "}
                    <a href="/docs/observer-onboarding#votes" className="link">
                        Observer Onboarding Guide
                    </a>
                    .
                </p>
            </div>
        </Container>
    );
}
