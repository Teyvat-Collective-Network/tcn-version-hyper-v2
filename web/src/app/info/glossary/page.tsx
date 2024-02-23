"use client";

import Container from "../../../components/ui/container";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";

export default function Glossary() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Glossary</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Term</TableHead>
                            <TableHead>Meaning</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/banshares" className="link" target="_blank">
                                        Banshare
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    A collection of evidence filed against one or more users with the intent of allowing other servers to become aware of a
                                    potential problem / threat.
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#definitions" className="link" target="_blank">
                                        Council Advisor
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The secondary representative of a TCN server. Servers are not required to have one. They can contribute to discussions as
                                    well and perform tasks on behalf of the server owner (including voting) if the responsibility is{" "}
                                    <a href="/info/constitution#delegation" className="link" target="_blank">
                                        delegated
                                    </a>{" "}
                                    to them.
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#induction" className="link" target="_blank">
                                        Induction
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The process of adding a new server to the network, usually referring to the actual act of adding the server and inviting its
                                    representative(s).
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#general-protocols" className="link" target="_blank">
                                        Major Vote
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>A vote with 75% quorum.</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#general-protocols" className="link" target="_blank">
                                        Minor Vote
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>A vote with 60% quorum.</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/observation-faq" className="link" target="_blank">
                                        Observation
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The process of overseeing a server&apos;s actions. This is carried out by an observer who publishes a report for voting at
                                    the end of observation.
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#observer-committee" className="link" target="_blank">
                                        Observer
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The admins of the Teyvat Collective Network. They represent the network publicly, handle internal administrative tasks,
                                    observe applicants for induction, and regulate the HQ environment if needed.
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#general-protocols" className="link" target="_blank">
                                        Quorum
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The voter turnout requirement. For <b>minor votes</b> (most votes), it is 60%. For <b>major votes</b>, it is 75%.
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="flex flex-col">
                                <p>
                                    <a href="/info/constitution#definitions" className="link" target="_blank">
                                        Server Owner
                                    </a>
                                </p>
                            </TableCell>
                            <TableCell>
                                <p>
                                    The owner of a TCN server. By default, the designated voter is the server owner but this can be delegated to the council
                                    advisor.
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Container>
    );
}
