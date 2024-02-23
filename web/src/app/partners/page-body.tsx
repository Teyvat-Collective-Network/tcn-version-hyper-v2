"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import { Input } from "../../components/ui/input";
import Panel from "../../components/ui/panel";
import { fuzzy } from "../../lib/fuzzy";

export default function PartnersBody({ partners }: { partners: { id: string; name: string; mascot: string; invite: string; image: string | null }[] }) {
    const [query, setQuery] = useState<string>("");

    return (
        <Container className="my-24">
            <h1 className="text-5xl">Our Partners</h1>
            <div className="center-row gap-4">
                <FaMagnifyingGlass></FaMagnifyingGlass>
                <Input className="bg-muted" value={query} onChange={({ currentTarget: { value } }) => setQuery(value)} placeholder="Filter Servers"></Input>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(max(320px,30%),100%),1fr))] gap-x-4">
                <Panel className={`col-[1/-1] center-col p-4 ${fuzzy("Genshin Wizard", query) ? "" : "hidden"}`}>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div>
                            <Image
                                src="https://genshinwizard.com/wp-content/uploads/2022/09/cropped-genshinwizard_logo-192x192.png"
                                alt="Genshin Wizard Icon"
                                width="192"
                                height="192"
                            ></Image>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl">Genshin Wizard</h2>
                            <p>The TCN is partnered with Genshin Wizard, a multi-purpose Genshin Impact utility bot. Check out their website below!</p>
                            <a href="https://genshinwizard.com" target="_blank">
                                <Button className="px-8 text-lg">Website</Button>
                            </a>
                        </div>
                    </div>
                </Panel>
                <Panel className={`col-[1/-1] center-col p-4 ${fuzzy("Genshin Impact Tavern", query) ? "" : "hidden"}`}>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div>
                            <Image src="https://i.imgur.com/pwzRnxW.png" alt="Genshin Impact Tavern Icon" width="192" height="192"></Image>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl">Genshin Impact Tavern</h2>
                            <p>
                                The TCN is partnered with Genshin Impact Tavern, a multifaceted Discord Community Server for Genshin Impact! Check out their
                                RPG-like experience through which you can redeem official merch, their Cat&apos;s Tail Gathering TCG tournament, and more!
                            </p>
                            <a href="https://discord.gg/genshinimpacttavern" target="_blank">
                                <Button className="px-8 text-lg">Join the Server</Button>
                            </a>
                        </div>
                    </div>
                </Panel>
                {partners.map((partner) => (
                    <Panel key={partner.id} className="center-col justify-between p-4">
                        {partner.image ? (
                            <Image src={partner.image} alt={`${partner.name} Character Icon`} width="150" height="150"></Image>
                        ) : (
                            <Avatar className="w-[150px] h-[150px]">
                                <AvatarFallback className="text-4xl">
                                    {partner.name
                                        .split("")
                                        .filter((x) => x === x.toUpperCase() && x !== x.toLowerCase())
                                        .join("") || partner.name[0]}
                                </AvatarFallback>
                            </Avatar>
                        )}
                        <div className="center-col gap-8 mt-8">
                            <a href={`/server/${partner.id}`} className="link text-2xl">
                                {partner.name}
                            </a>
                            <a href={`https://discord.gg/${partner.invite}`} target="_blank">
                                <Button className="px-8 text-lg">Join</Button>
                            </a>
                        </div>
                    </Panel>
                ))}
            </div>
        </Container>
    );
}
