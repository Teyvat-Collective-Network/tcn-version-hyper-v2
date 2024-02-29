"use client";

import Image from "next/image";
import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import Panel from "../../components/ui/panel";

export default function ExternalPartners() {
    return (
        <Container className="my-24">
            <h1 className="text-5xl">Our External Partners</h1>
            <p>
                These organizations are partnered with us and are not members of the network. Partners are decided by a majority vote of all network members. To
                view the list of our member servers, visit the link below!
            </p>
            <a href="/members">
                <Button>TCN Members</Button>
            </a>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(max(320px,30%),100%),1fr))] gap-x-4">
                <Panel className={`col-[1/-1] center-col p-4`}>
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
                <Panel className={`col-[1/-1] center-col p-4`}>
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
            </div>
        </Container>
    );
}
