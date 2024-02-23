"use client";

import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import UserMention from "../../components/ui/user-mention";

export default function ContactBody({ observers }: { observers: string[] }) {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Contact Us</h1>
                <h2 className="text-4xl">TCN Hub</h2>
                <p>Join the TCN Hub to contact observers and other servers&apos; staff, ask questions, and give feedback to the TCN!</p>
                <a href={process.env.NEXT_PUBLIC_INVITE} target="_blank">
                    <Button>Join the Hub!</Button>
                </a>
                <h2 className="text-4xl">Observers</h2>
                <ul>
                    {observers.map((observer) => (
                        <li key={observer}>
                            <a href={`/user/${observer}`}>
                                <UserMention id={observer}></UserMention>
                            </a>{" "}
                            &mdash; <code>{observer}</code>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}
