"use client";

import Container from "../../../../components/ui/container";
import SectionLink from "../../../../components/ui/section-link";

export default function EmbedsGuide() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Embeds</h1>
                <p>
                    <a href="/info/discord" className="link">
                        Return to Discord Guides
                    </a>
                </p>
                <SectionLink id="embed-color">
                    <h2 className="text-4xl">Embed Color</h2>
                </SectionLink>
                <p>
                    You should pick an embed color that you like and stick to it for most or all of your embeds for consistency and organization. If you want
                    embeds to appear colorless, use <code>#2b2d31</code> (dark mode).
                </p>
                <SectionLink id="timestamps">
                    <h2 className="text-4xl">Timestamps</h2>
                </SectionLink>
                <p>
                    Discord does not make it obvious that this feature exists, but you can show a specific date to a user both in absolute and relative time.
                    Absolute time will appear in the user&apos;s local timezone. The format is <code>&lt;t:timestamp:format&gt;</code>. You can use this tool to
                    generate these.
                </p>
                <SectionLink id="limits">
                    <h2 className="text-4xl">Embed Limits</h2>
                </SectionLink>
                <p>Discord places the following limits on embeds:</p>
                <ul>
                    <li>The sum of all text in the following fields within one message cannot exceed 6000 characters.</li>
                    <li>
                        <b>Author Name</b>: 256 characters
                    </li>
                    <li>
                        <b>Title</b>: 256 characters
                    </li>
                    <li>
                        <b>Description</b>: 4096 characters
                    </li>
                    <li>
                        <b>Field Names</b>: 256 characters + required
                    </li>
                    <li>
                        <b>Field Values</b>: 1024 characters + required
                    </li>
                    <li>
                        <b>Footer Text</b>: 2048 characters + no markdown
                    </li>
                    <li>
                        <b>Fields</b>: 25 per embed
                    </li>
                    <li>
                        <b>Embeds</b>: 10 per message
                    </li>
                </ul>
            </div>
        </Container>
    );
}
