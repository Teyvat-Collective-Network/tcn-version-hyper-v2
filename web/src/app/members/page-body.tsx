"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import { Input } from "../../components/ui/input";
import Panel from "../../components/ui/panel";

export default function MembersBody({ members }: { members: { id: string; name: string; mascot: string; invite: string; image: string | null }[] }) {
    const [query, setQuery] = useState<string>("");

    return (
        <Container className="my-24">
            <h1 className="text-5xl">Our Member Servers</h1>
            <div className="center-row gap-4">
                <FaMagnifyingGlass></FaMagnifyingGlass>
                <Input className="bg-muted" value={query} onChange={({ currentTarget: { value } }) => setQuery(value)} placeholder="Filter Servers"></Input>
            </div>
            <p>The network is also partnered with a few third-party organizations offering mutual benefits! Check them out here!</p>
            <a href="/external-partners">
                <Button>External Partners</Button>
            </a>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(max(320px,30%),100%),1fr))] gap-x-4">
                {members.map((partner) => (
                    <Panel key={partner.id}>
                        <div className="center-row gap-4">
                            {partner.image ? (
                                <Image src={partner.image} alt={`${partner.name} Character Icon`} width="150" height="150"></Image>
                            ) : (
                                <Avatar className="w-[80px] h-[80px]">
                                    <AvatarFallback className="text-4xl">
                                        {partner.name
                                            .split("")
                                            .filter((x) => x === x.toUpperCase() && x !== x.toLowerCase())
                                            .join("") || partner.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            <div className="flex flex-col gap-4">
                                <a href={`/server/${partner.id}`} className="link text-xl whitespace-nowrap">
                                    {partner.name}
                                </a>
                                <a href={`https://discord.gg/${partner.invite}`} target="_blank">
                                    <Button className="px-8">Join</Button>
                                </a>
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </Container>
    );
}
