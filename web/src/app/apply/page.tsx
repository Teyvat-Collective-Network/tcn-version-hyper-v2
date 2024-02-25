"use client";

import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAt, FaChevronLeft, FaChevronRight, FaHashtag, FaHouse, FaPaperPlane, FaSquare, FaSquareCheck } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import { Input } from "../../components/ui/input";
import Mention from "../../components/ui/mention";
import NormalSelect from "../../components/ui/normal-select";
import { Textarea } from "../../components/ui/textarea";
import { useUserContext } from "../../context/user";
import useViewport from "../../hooks/viewport";
import { fetchInvite, submitApplication } from "./actions";
import "./apply.css";

const font = Architects_Daughter({ weight: "400", subsets: ["latin"] });

export default function Apply() {
    const { width, height } = useViewport();
    const user = useUserContext();

    const [invite, setInvite] = useState<string>("");
    const [page, setPage] = useState<number>(0);
    const [viewConsent, setViewConsent] = useState<boolean>(false);
    const [auditConsent, setAuditConsent] = useState<boolean>(false);
    const [partnerListConsent, setPartnerListConsent] = useState<boolean>(false);
    const [networkEventsConsent, setNetworkEventsConsent] = useState<boolean>(false);
    const [guild, setGuild] = useState<{ name: string; icon: string | null }>();
    const [character, setCharacter] = useState<string>("");
    const [role, setRole] = useState<"owner" | "admin" | "mod" | "other">("owner");
    const [experience, setExperience] = useState<string>("");
    const [goals, setGoals] = useState<string>("");
    const [history, setHistory] = useState<string>("");
    const [additional, setAdditional] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        window.onbeforeunload = (e) => e.preventDefault();
    }, [page]);

    if (!user) return redirect("/auth/login?redirect=/apply");

    async function submitInvite() {
        const data = await fetchInvite(invite);

        if (typeof data === "string") {
            alert(data);
        } else {
            setGuild(data);
            setPage(1);
        }
    }

    async function submit() {
        setSubmitting(true);

        try {
            const error = await submitApplication(invite, character, role, experience, goals, history, additional);
            if (error) return alert(error);

            setPage(6);
        } catch (error) {
            alert("Something went wrong submitting your application!");
        } finally {
            setSubmitting(false);
        }
    }

    function pageStyle(page: number, val: number) {
        return page === val
            ? {}
            : {
                  transform: `translateX(${page < val ? "" : "-"}20%)`,
                  opacity: 0,
                  pointerEvents: "none" as "none",
                  height: "0px",
                  position: "fixed" as "fixed",
              };
    }

    return (
        <div className="no-fade-in">
            <Image
                id="background"
                src="/apply-background.png"
                alt=""
                width={width}
                height={height}
                className="z-[-1] fixed top-0 left-0 object-cover h-full w-full"
            ></Image>
            <div className="w-full relative center-col">
                <div className="absolute sliding" style={pageStyle(page, 0)}>
                    <Container className="my-24">
                        <div className="center-col gap-8">
                            <h1 id="title" className={`${font.className} text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>
                                Ready to apply?
                            </h1>
                            <h2 className={`${font.className} fade-later text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}>
                                Enter your server&apos;s invite to get started
                            </h2>
                            <p className="fade-later">
                                You&apos;re logged in as{" "}
                                <Mention>
                                    <FaAt></FaAt> {user.name}
                                </Mention>{" "}
                                and your user ID will be submitted with this form. Not you?{" "}
                                <a href="/auth/logout?redirect=/apply" className="link">
                                    Log Out
                                </a>
                            </p>
                            <Input
                                className="fade-later bg-background max-w-[40rem] h-12 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                                value={invite}
                                onChange={({ currentTarget: { value } }) => setInvite(value)}
                                onKeyDown={(e) => e.key === "Enter" && submitInvite()}
                            ></Input>
                            <Button className="fade-later" onClick={submitInvite} disabled={invite.trim().length === 0}>
                                <FaChevronRight></FaChevronRight>
                            </Button>
                        </div>
                    </Container>
                </div>
                <div className="absolute sliding" style={pageStyle(page, 1)}>
                    <Container className="my-24">
                        <div className="center-col gap-8">
                            <h1 className={`${font.className} text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>Applying for:</h1>
                            <h2 className={`${font.className} text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl center-row gap-4`}>
                                <Avatar>
                                    <AvatarImage src={guild?.icon ?? ""}></AvatarImage>
                                    <AvatarFallback>
                                        {guild?.name
                                            .split("")
                                            .filter((x) => x === x.toUpperCase() && x !== x.toLowerCase())
                                            .join("") || guild?.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                {guild?.name}
                            </h2>
                            <h3 className="md:text-lg lg:text-xl xl:text-2xl">Please confirm your agreement to all of the following to proceed.</h3>
                            <div className="flex flex-col gap-4">
                                <div className="center-row gap-4">
                                    <Button variant={viewConsent ? "default" : "secondary"} onClick={() => setViewConsent((x) => !x)}>
                                        {viewConsent ? <FaSquareCheck></FaSquareCheck> : <FaSquare></FaSquare>}
                                    </Button>
                                    <p>
                                        <span className="text-xl">
                                            I agree to give my server&apos;s observer view access to <b>all channels</b> for the observation period.
                                        </span>
                                    </p>
                                </div>
                                <div className="center-row gap-4">
                                    <Button variant={auditConsent ? "default" : "secondary"} onClick={() => setAuditConsent((x) => !x)}>
                                        {auditConsent ? <FaSquareCheck></FaSquareCheck> : <FaSquare></FaSquare>}
                                    </Button>
                                    <p>
                                        <span className="text-xl">
                                            I agree to give my server&apos;s observer access to the audit logs for the observation period.
                                        </span>
                                    </p>
                                </div>
                                <div className="center-row gap-4">
                                    <Button variant={partnerListConsent ? "default" : "secondary"} onClick={() => setPartnerListConsent((x) => !x)}>
                                        {partnerListConsent ? <FaSquareCheck></FaSquareCheck> : <FaSquare></FaSquare>}
                                    </Button>
                                    <p>
                                        <span className="text-xl">
                                            I agree to display the TCN partner list publicly and keep it up-to-date (
                                            <a href="/info/partner-list" className="link">
                                                learn more
                                            </a>
                                            ).
                                        </span>
                                    </p>
                                </div>
                                <div className="center-row gap-4">
                                    <Button variant={networkEventsConsent ? "default" : "secondary"} onClick={() => setNetworkEventsConsent((x) => !x)}>
                                        {networkEventsConsent ? <FaSquareCheck></FaSquareCheck> : <FaSquare></FaSquare>}
                                    </Button>
                                    <p>
                                        <span className="text-xl">
                                            I agree to follow{" "}
                                            <Mention>
                                                <FaHashtag></FaHashtag> network-events
                                            </Mention>{" "}
                                            publicly to cross-promote TCN server events and post crucial TCN announcements.
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="center-row gap-4">
                                <Button
                                    className="center-row gap-2"
                                    onClick={() => {
                                        setPage(0);
                                        setViewConsent(false);
                                        setAuditConsent(false);
                                        setPartnerListConsent(false);
                                        setNetworkEventsConsent(false);
                                    }}
                                >
                                    <FaChevronLeft></FaChevronLeft>
                                    Back
                                </Button>
                                <Button onClick={() => setPage(2)} disabled={!viewConsent || !auditConsent || !partnerListConsent || !networkEventsConsent}>
                                    <FaChevronRight></FaChevronRight>
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="absolute sliding" style={pageStyle(page, 2)}>
                    <Container className="my-24">
                        <div className="center-col gap-8">
                            <h2 className={`${font.className} text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}>
                                Which character is your server based on?
                            </h2>
                            <Input
                                className="bg-background max-w-[40rem] h-12 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                                value={character}
                                onChange={({ currentTarget: { value } }) => setCharacter(value)}
                                maxLength={64}
                            ></Input>
                            <h2 className={`${font.className} text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}>
                                What is your role in the server?
                            </h2>
                            <NormalSelect
                                value={role}
                                setValue={setRole}
                                options={[
                                    ["owner", "Server Owner"],
                                    ["admin", "Administrator"],
                                    ["mod", "Moderator"],
                                    ["other", "Other"],
                                ]}
                                className="w-[min-content] text-xl"
                            ></NormalSelect>
                            {role !== "owner" ? (
                                <p>
                                    <span className="text-muted-foreground">Make sure you have permission from the server owner to apply to the TCN!</span>
                                </p>
                            ) : null}
                            <div className="center-row gap-4">
                                <Button className="center-row gap-2" onClick={() => setPage(1)}>
                                    <FaChevronLeft></FaChevronLeft>
                                    Back
                                </Button>
                                <Button onClick={() => setPage(3)} disabled={!character.trim()}>
                                    <FaChevronRight></FaChevronRight>
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="absolute sliding" style={pageStyle(page, 3)}>
                    <Container className="my-24">
                        <div className="center-col gap-8">
                            <p>
                                <span className="text-lg md:text-xl xl:text-2xl">
                                    Do you have prior experience running a Discord server or similar communities in a position of management or moderation (e.g.
                                    forums, guilds, clans, etc.)?
                                </span>
                            </p>
                            <p>
                                <span className="md:text-lg xl:text-xg text-muted-foreground">
                                    You do not have to have been the owner of the server / forum / etc.; any position of management or moderation is of
                                    interest.
                                </span>
                            </p>
                            <Textarea
                                className="bg-background max-w-[40rem]"
                                value={experience}
                                onChange={({ currentTarget: { value } }) => setExperience(value)}
                                maxLength={1024}
                                placeholder="Max Length: 1024"
                            ></Textarea>
                            <p>
                                <span className="text-lg md:text-xl xl:text-2xl">What are some of your future goals or ideas for the server?</span>
                            </p>
                            <Textarea
                                className="bg-background max-w-[40rem]"
                                value={goals}
                                onChange={({ currentTarget: { value } }) => setGoals(value)}
                                maxLength={1024}
                                placeholder="Required &mdash; Max Length: 1024"
                            ></Textarea>
                            <p>
                                <span className="text-lg md:text-xl xl:text-2xl">Please give us a rough outline of your server&apos;s history.</span>
                            </p>
                            <p>
                                <span className="md:text-lg xl:text-xl text-muted-foreground">
                                    For example, if your server has ever rebranded, please list its former identities. Additionally, what inspired/motivated you
                                    to start the server, and what notable events or changes have occurred or what troubles have you had to overcome?
                                </span>
                            </p>
                            <Textarea
                                className="bg-background max-w-[40rem]"
                                value={history}
                                onChange={({ currentTarget: { value } }) => setHistory(value)}
                                maxLength={1024}
                                placeholder="Required &mdash; Max Length: 1024"
                            ></Textarea>
                            <p>
                                <span className="text-lg md:text-xl xl:text-2xl">Any additional questions or comments you&apos;d like to include?</span>
                            </p>
                            <Textarea
                                className="bg-background max-w-[40rem]"
                                value={additional}
                                onChange={({ currentTarget: { value } }) => setAdditional(value)}
                                maxLength={1024}
                                placeholder="Max Length: 1024"
                            ></Textarea>
                            <div className="center-row gap-4">
                                <Button className="center-row gap-2" onClick={() => setPage(2)}>
                                    <FaChevronLeft></FaChevronLeft> Back
                                </Button>
                                <Button onClick={() => setPage(4)} disabled={goals.trim().length === 0 || history.trim().length === 0}>
                                    <FaChevronRight></FaChevronRight>
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="absolute sliding" style={pageStyle(page, 4)}>
                    <Container className="my-24">
                        <div className="center-col gap-8">
                            <h1 className={`${font.className} text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>
                                You&apos;re almost done&#8230;
                            </h1>
                            <p>
                                <span className="text-lg">
                                    Just to double check: You&apos;re applying for <b>{guild?.name}</b>, a server based on the <u>Genshin Impact</u> character{" "}
                                    <b>{character}</b>,{" "}
                                    {role === "owner"
                                        ? "as the server owner"
                                        : role === "admin"
                                        ? "as an administrator"
                                        : role === "mod"
                                        ? "as a moderator"
                                        : ""}{" "}
                                    {role === "owner" ? "" : "with the owner's approval"}.
                                </span>
                            </p>
                            <p>
                                <span className="text-lg">
                                    An observer will reach out to you around 3&ndash;5 days after your application. Make sure you check the list of observers on
                                    our{" "}
                                    <a href="/contact" className="link">
                                        contact page
                                    </a>{" "}
                                    before giving any permissions!
                                </span>
                            </p>
                            <div className="center-row gap-4">
                                <Button className="center-row gap-2" onClick={() => setPage(3)} disabled={submitting}>
                                    <FaChevronLeft></FaChevronLeft> Back
                                </Button>
                                <Button className="center-row gap-2" onClick={submit} disabled={submitting}>
                                    <FaPaperPlane></FaPaperPlane> Submit!
                                </Button>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="absolute sliding" style={pageStyle(page, 6)}>
                    <Container className="my-24">
                        <div className="center-col gap-8">
                            <h1 className={`${font.className} text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`}>
                                Thank you for applying!
                            </h1>
                            <h2 className={`${font.className} text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}>
                                We&apos;ll get in touch with you soon!
                            </h2>
                            <a href="/">
                                <Button className="center-row gap-2">
                                    <FaHouse></FaHouse> Home
                                </Button>
                            </a>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}
