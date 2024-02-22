import Image from "next/image";
import { FaCheckToSlot, FaEye, FaFolderTree, FaHandshakeAngle, FaHeartCrack, FaListCheck, FaPencil, FaTriangleExclamation, FaXmark } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import Panel from "../../components/ui/panel";
import SectionLink from "../../components/ui/section-link";
import { Separator } from "../../components/ui/separator";

export default function Join() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Joining the TCN</h1>
                <p>
                    Only character mains servers (servers dedicated to a specific Genshin Impact character with resources and channels for that character) may
                    join the TCN, but we have no limit on the number of servers for the same character that may join. Your server will undergo a review process,
                    which you can read more about <a href="/observation-faq">here</a>.
                </p>
                <a href="/apply">
                    <Button>Apply Here!</Button>
                </a>
                <SectionLink id="induction-process">
                    <h2 className="text-3xl">Induction Process</h2>
                </SectionLink>
                <Image src="https://i.imgur.com/r32P1Ay.png" alt="Induction Process Flowchart" width={600} height={400}></Image>
                <Panel className="max-w-[max-content]">
                    <h3 className="center-row gap-4 text-2xl">
                        <FaPencil></FaPencil> Preparation
                    </h3>
                    <p>Ensure your server is well-structured, your staff teams are in order, and you are ready to be observed!</p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaListCheck></FaListCheck> Application
                    </h3>
                    <p>
                        Once you are ready, fill out the application form above! A period of 3 days is always given for the council member to raise any
                        objections to applicant servers.
                    </p>
                    <p>
                        Afterwards, an observer will be assigned and reach out to you. If there are delays for any reason, we will inform you and give you a
                        transparent timeline.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaEye></FaEye> Observation
                    </h3>
                    <p>
                        For a 28-day period, an observer will oversee all operations in your server. This is to ensure your server meets our quality
                        expectations for organization and a safe environment.
                    </p>
                    <p>
                        Once observation is done, they will create a report and share it with you. We will work with you to make sure we have accurately
                        represented your server.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaCheckToSlot></FaCheckToSlot> Decision
                    </h3>
                    <p>
                        The council will vote based on the report and decide whether to induct or reject your server. In rare cases, we may decide that more
                        time is needed to make a decision and extend the observation by another 28 days, which will be carried out by a new observer.
                    </p>
                    <p>
                        If your server&apos;s mascot character is not confirmed as playable yet, we may decide to approve your server but only induct once the
                        character has been confirmed.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaHandshakeAngle></FaHandshakeAngle> Join the TCN
                    </h3>
                    <p>
                        If you reach this step, congratulations! You are now a member of the <b>Teyvat Collective Network</b>.
                    </p>
                    <p>
                        We will guide you through any setup you need help with, so don&apos;t worry if you&apos;re not really sure what to do. We don&apos;t
                        demand much, and we will help you with the few things we do require if you need any help.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaXmark></FaXmark> Rejection
                    </h3>
                    <p>
                        If you reach this step, you may be able to join at a later date. We will give you more information when we reject you. If possible, we
                        will tell you why, though sometimes servers have staff/owners that are too problematic and we will not even inform them why.
                    </p>
                    <p>
                        If we give you a clear reason and expectations, you can apply again in 3 weeks after you have addressed our concerns. If you need help,
                        feel free to reach out to us, as even if you are not a TCN server, our council has a strong desire to see the Genshin Impact Discord
                        space flourish and that includes helping servers outside of our network.
                    </p>
                </Panel>
                <SectionLink id="tcn-requirements">
                    <h2 className="text-3xl">What does the TCN require?</h2>
                </SectionLink>
                <p>
                    Not much. Observation is usually very smooth and few servers get rejected. As long as you have a civil environment, you will probably pass
                    observation, as we do not have activity requirements (we recommend 300 members just so we know that your server is stable and will not
                    suddenly change or collapse, as we have seen that happen often).
                </p>
                <p>
                    Once you have joined, we only expect you to maintain a civil relationship with other TCN servers. You do not have to be friends with anyone,
                    as long as you are civil (and this extends to other servers; trash-talking or slandering other servers or people is also considered
                    inappropriate conduct).
                </p>
                <p>
                    Additionally, we require that you keep an updated list of TCN servers in your server and follow our <b>#network-events</b> channel, as
                    cross-promotion is a part of our benefits. Otherwise, all other features like global chat, banshares, etc. are completely optional.
                </p>
                <p>
                    We do not place restrictions on how you should run your server or force you to follow a particular structure (in fact, we do not have a
                    &quot;TCN structure&quot; for servers). Obviously, breaking network rules or failing to meet the rules and expectations may result in
                    removal.
                </p>
                <SectionLink id="why-reject">
                    <h2 className="text-3xl">What are some reasons for rejection?</h2>
                </SectionLink>
                <p>
                    Servers may be rejected after or during observation or denied observation altogether for a variety of reasons. These are some common
                    reasons, but this is not an exhaustive list. We may tell you what the reason is if we believe you can fix it and would be happy to
                    reconsider later, but sometimes we keep the reason private and may not reconsider.
                </p>
                <Panel className="max-w-[max-content]">
                    <h3 className="center-row gap-4 text-2xl">
                        <FaTriangleExclamation></FaTriangleExclamation> Problematic Behavior
                    </h3>
                    <p>
                        Problematic behavior from the community that is unchecked or from the staff themselves (inciting raids, permitting toxicity, etc.),
                        including if the staff are causing trouble in other servers and this is known by management and nothing is done.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaHeartCrack></FaHeartCrack> Insufficient Moderation
                    </h3>
                    <p>
                        Insufficient moderation (lack of staff or lack of activity from staff). We are not looking for mods to be talking in chat every day,
                        just that rules are enforced and mods are watching chat and responding to pings enough that the server remains a safe environment.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaFolderTree></FaFolderTree> Inadequate Structure
                    </h3>
                    <p>
                        Inadequate server structure (broken permissions, lack of moderation logs, lack of tools for moderators, etc.). If we believe you have
                        potential but need help with your structure or moderation policies or workflows, we may offer to help and induct you even if there are
                        problems, if you demonstrate willingness to improve.
                    </p>
                    <p>
                        Note that we will never force you to follow a particular structure, just offer help so you can achieve your vision of an ideal
                        environment for your server.
                    </p>
                </Panel>
            </div>
        </Container>
    );
}
