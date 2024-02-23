import Container from "../../../components/ui/container";
import SectionLink from "../../../components/ui/section-link";

export default function Discord() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Discord Guides</h1>
                <SectionLink id="permissions">
                    <h2 className="text-4xl">Discord Permissions</h2>
                </SectionLink>
                <p>
                    If you have absolutely no knowledge on Discord permissions, a good place to start would be the official{" "}
                    <a href="https://support.discord.com/hc/en-us/articles/206029707-Setting-Up-Permissions-FAQ" className="link" target="_blank">
                        Permissions FAQ
                    </a>{" "}
                    support article.
                </p>
                <p>
                    An important thing to know about permissions is that positive role overrides always apply over negative role overrides regardless of
                    hierarchy.
                </p>
                <ul>
                    <li>
                        List of all permissions and what they do:{" "}
                        <a href="/info/discord/permission-list" className="link">
                            Permission List
                        </a>
                    </li>
                    <li>
                        More information and recommendations for good structure:{" "}
                        <a href="/info/discord/permissions" className="link">
                            Permissions
                        </a>
                    </li>
                </ul>
                <SectionLink id="webhooks-embeds">
                    <h2 className="text-4xl">Webhooks &amp; Embeds</h2>
                </SectionLink>
                <p>
                    This is a guide on how to use embeds and webhooks in Discord. This guide features{" "}
                    <a href="https://discohook.org/" className="link" target="_blank">
                        Discohook
                    </a>{" "}
                    and{" "}
                    <a href="https://message.style/" className="link" target="_blank">
                        Embed Generator
                    </a>
                    .
                </p>
                <ul>
                    <li>Webhooks are resources that you can create in a text channel that anyone with the URL can use to post messages to the channel.</li>
                    <li>Embeds are a way to organize information and add styling to your resources.</li>
                </ul>
                <p>
                    To view the full guide, visit the{" "}
                    <a href="/info/discord/webhooks" className="link">
                        webhooks
                    </a>{" "}
                    or{" "}
                    <a href="/info/discord/embeds" className="link">
                        embeds
                    </a>{" "}
                    page.
                </p>
            </div>
        </Container>
    );
}
