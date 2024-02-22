"use client";

import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Container from "../components/ui/container";
import useViewport from "../hooks/viewport";
import "./home.css";

const font = Architects_Daughter({ weight: "400", subsets: ["latin"] });

export default function HomeBody({ count }: { count: number | string }) {
    const { width, height } = useViewport();

    return (
        <div className="no-fade-in">
            <Image
                id="background"
                src="/background.jpg"
                alt=""
                width={width}
                height={height}
                className="z-[-1] fixed top-0 left-0 object-cover h-full w-full"
            ></Image>
            <Container className="my-24">
                <div className="center-col gap-8">
                    <h1 id="title" className={`${font.className} text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>
                        Welcome to the Teyvat Collective Network
                    </h1>
                    <span></span>
                    <p className="fade-later">
                        <span className="text-xl md:text-2xl xl:text-3xl">
                            Our mission is to unite mains servers across Teyvat, providing support for and promoting collaboration between partners.
                        </span>
                    </p>
                    <p className="fade-later">
                        <span className="text-md md:text-lg xl:text-xl">
                            The TCN is a network of {count} high-quality Genshin Impact Discord servers dedicated to fostering fan communities.
                        </span>
                    </p>
                    <p className="fade-later">
                        <span className="text-md md:text-lg xl:text-xl">
                            Do you own a Discord server dedicated to a playable Genshin Impact character and want to join the TCN? Apply here!
                        </span>
                    </p>
                    <a href="/join" className="fade-later">
                        <Button className="text-md md:text-lg xl:text-xl">Apply To Join</Button>
                    </a>
                </div>
            </Container>
        </div>
    );
}
