import {
    FaChartLine,
    FaCheckToSlot,
    FaCircleInfo,
    FaCircleNodes,
    FaComments,
    FaEarthAmericas,
    FaHandshake,
    FaHubspot,
    FaSitemap,
    FaTowerBroadcast,
    FaUserGroup,
} from "react-icons/fa6";
import Container from "../../components/ui/container";
import Panel from "../../components/ui/panel";
import SectionLink from "../../components/ui/section-link";
import { Separator } from "../../components/ui/separator";

export default function About() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">About the TCN</h1>
                <SectionLink id="what">
                    <h2 className="text-3xl">What is the TCN?</h2>
                </SectionLink>
                <p>
                    The Teyvat Collective Network, also known as the TCN, is a network of high-quality Genshin Impact Discord servers dedicated to fostering
                    Mains-style fan communities. We place an emphasis on collaborative community-building, servers offering help and resources to each other,
                    and maintaining healthy and safe communities for Genshin Impact fans to find a home in on Discord.
                </p>
                <SectionLink id="organization">
                    <h2 className="text-3xl">Organization</h2>
                </SectionLink>
                <p>
                    The TCN does not enforce any particular structure on its member servers. TCN servers are not required to change their server setup, follow a
                    template, enforce particular rules, or give any permissions to TCN observers. Our only requirements are to display a list of TCN partner
                    servers, cross-post event promotions from partner servers, and maintain a healthy community that follows its rules.
                </p>
                <p>In addition to the individual servers in the TCN, we have two official servers, a public and a private central server.</p>
                <Panel className="max-w-[max-content]">
                    <h3 className="center-row gap-4 text-2xl">
                        <FaHubspot></FaHubspot> The Hub
                    </h3>
                    <p>
                        This is the official public server for the TCN, where you can contact observers and other server staff and ask questions or give
                        feedback about the TCN.
                    </p>
                    <p>
                        <a href={process.env.NEXT_PUBLIC_INVITE} className="link" target="_blank">
                            Join the Hub!
                        </a>
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaSitemap></FaSitemap> HQ
                    </h3>
                    <p>
                        This is the headquarters server for the TCN. It is private to the TCN council, which consists of each server&apos;s owner and up to one
                        other trusted member. This server facilitates communication and coordination of servers.
                    </p>
                </Panel>
                <SectionLink id="benefits">
                    <h2 className="text-3xl">Benefits of the TCN</h2>
                </SectionLink>
                <Panel className="max-w-[max-content]">
                    <h3 className="center-row gap-4 text-2xl">
                        <FaCircleInfo></FaCircleInfo> Information
                    </h3>
                    <p>
                        As a member server of the TCN, you get access to information on members, ongoing issues, as well as informative resources like server
                        setup and tools and on-demand help for the technical aspects and community and staff management.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaHandshake></FaHandshake> Connections
                    </h3>
                    <p>
                        TCN servers have quick and easy access to communication with each other. In addition to being able to more quickly resolve any issues
                        and form strong relationships with many other prominent servers, you have the unique opportunity to more easily start collaborations for
                        things like events, which you can also promote through the TCN&apos;s event announcement feed.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaChartLine></FaChartLine> Growth
                    </h3>
                    <p>
                        When you join the TCN, you automatically become a TCN partner of all TCN servers and will have your server listed on the partner list in
                        all of them. Additionally, you will be able to get tips on how to improve your server environment and grow a strong, healthy community.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaCircleNodes></FaCircleNodes> Networking
                    </h3>
                    <p>
                        As a TCN server, besides direct connections with other server owners, you will also have access to networking with admins in HQ and with
                        other server admins and staff through their TCN representatives.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaEarthAmericas></FaEarthAmericas> Global Chat
                    </h3>
                    <p>
                        You will have access to global channels, which are channels where messages are relayed to all connected servers. We have a public global
                        channel so your members can talk to members all across the TCN from the comfort of your server, as well as channels for staff. You will
                        also be able to use these channels for collaboration events if you want participating servers&apos; members to be able to talk to each
                        other from any server.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaTowerBroadcast></FaTowerBroadcast> Banshares
                    </h3>
                    <p>
                        You gain access to TCN Banshares, which are a system we have that lets you receive or automatically ban problematic users ahead of time
                        so you don&apos;t have to deal with them the hard way. All of our banshares are manually reviewed by our observers. See the{" "}
                        <a href="/info/banshares" className="link">
                            banshare info page
                        </a>{" "}
                        for more information.
                    </p>
                </Panel>
                <SectionLink id="core-values">
                    <h2 className="text-3xl">Our Core Values</h2>
                </SectionLink>
                <Panel className="max-w-[max-content]">
                    <h3 className="center-row gap-4 text-2xl">
                        <FaComments></FaComments> Transparency
                    </h3>
                    <p>
                        We prioritize two-way communication with our member servers. We are always open to feedback and will reach out for opportunities to
                        improve the network to work for our members, and not the other way around.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaCheckToSlot></FaCheckToSlot> Democracy
                    </h3>
                    <p>
                        In addition to communicating major changes with our members clearly, we propose these changes and vote on major decisions on them, and
                        the observer team does not have any more of a say in matters than everyone else. Each server gets one vote in all important matters. We
                        also implement follow-up changes based on feedback.
                    </p>
                    <Separator></Separator>
                    <h3 className="center-row gap-4 text-2xl">
                        <FaUserGroup></FaUserGroup> Collaboration
                    </h3>
                    <p>
                        We don&apos;t expect everyone in the TCN to like everyone else, but even when discussions are heated we treat each other with civility
                        and get to the core of the issue and come to a resolution that can benefit us all as much as possible. Additionally, we learn from
                        conflicts, and every mistake or dispute is an opportunity to not just fix the root of the issue but improve other parts of the network.
                    </p>
                </Panel>
            </div>
        </Container>
    );
}
