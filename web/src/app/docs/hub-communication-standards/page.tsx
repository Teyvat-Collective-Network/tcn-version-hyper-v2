"use client";

import { FaAt, FaBullhorn } from "react-icons/fa6";
import Container from "../../../components/ui/container";
import Mention from "../../../components/ui/mention";

export default function DocsHubCommunicationStandards() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Hub Communication Standards</h1>
                <p>
                    This document concerns the standards of communication for announcements to the TCN Hub in{" "}
                    <Mention>
                        <FaBullhorn></FaBullhorn> announcements
                    </Mention>
                    .
                </p>
                <p>
                    Pings may be for{" "}
                    <Mention>
                        <FaAt></FaAt> Announcements
                    </Mention>{" "}
                    or{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>{" "}
                    depending on importance and impact.
                </p>
                <ul>
                    <li>
                        <b>Induction of new servers</b> &mdash; When new servers are added, an announcement should be sent informing the Hub of the new member
                        server.
                    </li>
                    <li>
                        <b>Departure of former partners</b> &mdash; When servers leave the network, they may optionally provide a reason to be given publicly,
                        though this reason may be excluded if the council believes it is inaccurate or slanderous. However, no reason may be given that was not
                        approved by the departing server; instead, it will only be stated that it was voluntary if so and no further information will be given
                        otherwise. No ping will be made for these announcements.
                    </li>
                    <li>
                        <b>Election results</b> &mdash; The results of elections will be announced, even if no change is made to the observer team, to keep
                        everyone updated on the representatives of the network.
                    </li>
                    <li>
                        <b>Early departure of observers</b> &mdash; When observers resign from the team, the same procedure is followed as for the departure of
                        former partners. However, a ping will be given.
                    </li>
                    <li>
                        <b>Significant restructuring / changes</b> &mdash; if the Hub or the entire network is restructured or changes are made to the rules or
                        network in a way meaningful to the general public, an announcement will be made.
                    </li>
                </ul>
            </div>
        </Container>
    );
}
