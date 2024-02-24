"use client";

import Container from "../../../components/ui/container";
import SectionLink from "../../../components/ui/section-link";

export default function DocsObserverTasks() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Observer Tasks</h1>
                <p>
                    The purpose of this document is to create a list of roles and areas that are primarily observer-driven and assign ownership to observers.
                    This is not a strict division that restricts what observers are allowed to do, but rather places responsibility, authority, and leadership
                    in the hands of people who want to take on specific tasks.
                </p>
                <SectionLink id="procedural">
                    <h2 className="text-4xl">Procedural</h2>
                </SectionLink>
                <p>
                    These are items that happen routinely and follow specific well-defined protocols. Owners of these areas are responsible for enforcing
                    protocols and considering / co-ordinating discussions for changes to the protocols.
                </p>
                <SectionLink id="elections">
                    <h3 className="text-3xl">Elections</h3>
                </SectionLink>
                <ul>
                    <li>Ensure elections are run on a timely basis.</li>
                    <li>Manage discussions during elections.</li>
                </ul>
                <SectionLink id="banshares">
                    <h3 className="text-3xl">Banshares</h3>
                </SectionLink>
                <ul>
                    <li>Ensure banshares are reviewed on a timely basis.</li>
                    <li>Oversee banshare quality standards.</li>
                    <li>Oversee banshare report handling and rescinding.</li>
                </ul>
                <SectionLink id="internal-affairs">
                    <h2 className="text-4xl">Internal Affairs</h2>
                </SectionLink>
                <p>These items relate to operations within people already involved with the network, e.g. HQ.</p>
                <SectionLink id="feedback">
                    <h3 className="text-3xl">Feedback</h3>
                </SectionLink>
                <ul>
                    <li>Ensure suggestions and other feedback are discussed and considered within a reasonable time frame.</li>
                    <li>Oversee implementation of feedback according to agreed terms.</li>
                </ul>
                <SectionLink id="discussions">
                    <h3 className="text-3xl">Driving Discussions</h3>
                </SectionLink>
                <ul>
                    <li>Keep discussions moving and point them in an on-topic, constructive, and productive direction.</li>
                    <li>Oversee the pace of discussions, moving phases (brainstorming &rarr; scoping &rarr; finalizing, etc.).</li>
                    <li>Ensure discussions are summarized appropriately as needed and actioned on.</li>
                </ul>
                <SectionLink id="mediation">
                    <h3 className="text-3xl">Mediation</h3>
                </SectionLink>
                <ul>
                    <li>Oversee moderation and standards of civil interaction where needed.</li>
                    <li>Oversee review of observer actions and team retrospectives.</li>
                </ul>
                <SectionLink id="external-affairs">
                    <h2 className="text-4xl">External Affairs</h2>
                </SectionLink>
                <p>These items relate to communication with people outside of the network, e.g. Hub.</p>
                <SectionLink id="modmail">
                    <h3 className="text-3xl">Modmail</h3>
                </SectionLink>
                <ul>
                    <li>Ensure modmail is read, threads are discussed, and replies are provided on a timely basis.</li>
                    <li>Oversee standards for outgoing communications.</li>
                    <li>Ensure follow-up to modmail as appropriate.</li>
                </ul>
                <SectionLink id="partnerships">
                    <h3 className="text-3xl">Partnership Management</h3>
                </SectionLink>
                <ul>
                    <li>Oversee standards for partners.</li>
                    <li>Oversee details and conditions for special-case partnerships.</li>
                    <li>Monitor partners to ensure continued upholding of standards and/or requirements.</li>
                </ul>
                <SectionLink id="hub-qa">
                    <h3 className="text-3xl">Hub QA</h3>
                </SectionLink>
                <ul>
                    <li>Ensure outgoing communications in the Hub are done appropriately in accordance with guidelines.</li>
                    <li>Ensure inquiries (questions, feedback, etc.) in the Hub are discussed and actioned on on a timely basis.</li>
                </ul>
                <SectionLink id="expansion">
                    <h3 className="text-3xl">Expansion</h3>
                </SectionLink>
                <ul>
                    <li>Oversee outreach initiatives.</li>
                    <li>Oversee projects targeted at external support.</li>
                </ul>
                <SectionLink id="global-chat">
                    <h2 className="text-4xl">Global Chat</h2>
                </SectionLink>
                <p>These items specifically concern the global chat feature.</p>
                <SectionLink id="global-moderation">
                    <h3 className="text-3xl">Global Moderation</h3>
                </SectionLink>
                <ul>
                    <li>Oversee standards for moderation.</li>
                    <li>Maintain the global chat filter.</li>
                    <li>Own application reviews for global chat mods and performance evaluation.</li>
                </ul>
                <SectionLink id="global-operations">
                    <h3 className="text-3xl">Operations</h3>
                </SectionLink>
                <ul>
                    <li>Ensure global chat functions as intended.</li>
                    <li>Ensure critical user journeys are available.</li>
                    <li>
                        Work with{" "}
                        <a href="#technical" className="link">
                            Technical
                        </a>{" "}
                        on user and moderator feedback.
                    </li>
                </ul>
                <SectionLink id="technical">
                    <h2 className="text-4xl">Technical</h2>
                </SectionLink>
                <p>This section specifically involves technical features and developer work for the TCN.</p>
                <SectionLink id="security">
                    <h3 className="text-3xl">Security</h3>
                </SectionLink>
                <ul>
                    <li>Monitor for potential security flaws.</li>
                    <li>Respond to user reported security vulnerabilities.</li>
                    <li>Ensure security is upheld and fixes are done as quickly as possible / vulnerable features are taken down until they are secured.</li>
                    <li>Ensure responsible reporting.</li>
                </ul>
                <SectionLink id="tech-monitoring">
                    <h3 className="text-3xl">Monitoring</h3>
                </SectionLink>
                <ul>
                    <li>Monitor for undefined behavior, unintentional behavior, bugs, latency issues, and other errors.</li>
                    <li>Monitor usage to seek opportunities for improvement and optimization.</li>
                </ul>
                <SectionLink id="tech-implementation">
                    <h3 className="text-3xl">Implementation</h3>
                </SectionLink>
                <ul>
                    <li>Oversee implementation of security patches, bug fixes, and feature requests.</li>
                    <li>Maintain priority and ensure development work is done in a timely fashion in accordance with user / network expectations.</li>
                </ul>
            </div>
        </Container>
    );
}
