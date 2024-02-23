"use client";

import { FaAt, FaCheck, FaXmark } from "react-icons/fa6";
import Container from "../../../../components/ui/container";
import Mention from "../../../../components/ui/mention";
import SectionLink from "../../../../components/ui/section-link";

export default function WebhooksGuide() {
    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Webhooks</h1>
                <p>
                    <a href="/info/discord" className="link">
                        Return to Discord Guides
                    </a>
                </p>
                <SectionLink id="what-is-a-webhook">
                    <h2 className="text-4xl">What is a webhook?</h2>
                </SectionLink>
                <p>
                    A webhook is a resource that you can create in a text channel that anyone with the URL can use to post messages to the channel. Webhooks are
                    identified by their URL, which is private and required to use the webhook.
                </p>
                <p>
                    <b>Keep your webhook URL private.</b> Anyone with the URL can use it to post messages and there is no way to identify who uses a webhook.
                    Webhooks can sometimes also ping{" "}
                    <Mention>
                        <FaAt></FaAt> everyone
                    </Mention>
                    , making this especially important.
                </p>
                <SectionLink id="creating">
                    <h2 className="text-4xl">Creating a webhook</h2>
                </SectionLink>
                <p>
                    Go to channel settings and click <b>Integrations</b>. You should see a <b>Create Webhook</b> button. Click it to get a new webhook with a
                    default name and blank profile picture, You can change these if you would like and click <b>Save</b>. When messages are sent, they will
                    appear with this profile picture and name.
                </p>
                <SectionLink id="usage">
                    <h2 className="text-4xl">Using a webhook</h2>
                </SectionLink>
                <p>
                    In the channel settings tab, click on a webhook to expand it, then click <b>Copy Webhook URL</b>. <b>Keep this URL private.</b>
                </p>
                <p>Now, you can paste it into an embed utility, execute it manually, etc.</p>
                <SectionLink id="advanced">
                    <h2 className="text-4xl">Advanced Usage</h2>
                </SectionLink>
                <p>
                    By default, when you execute a webhook, the message will be posted to the channel itself with the webhook&apos;s avatar and name. You can
                    actually do a bit more. Note that not all of these features are available with all of the listed services.
                </p>
                <ul>
                    <li>You can edit a message that was sent by the same webhook using the message ID.</li>
                    <li>You can post the message to a thread with the thread ID.</li>
                    <li>In forum channels, you can create a new post with a specified thread name. Otherwise, you must specify the post ID.</li>
                    <li>
                        You can set the avatar and name for a specific message when posting. This overrides the defaults for that message alone. If a webhook
                        sends two messages in a row with the same username, they merge together like with user messages.
                        <ul>
                            <li>You cannot edit the avatar or name later on.</li>
                        </ul>
                    </li>
                </ul>
                <SectionLink id="services">
                    <h2 className="text-4xl">Webhhook Services</h2>
                </SectionLink>
                <SectionLink id="tcn-embeds">
                    <h3 className="text-3xl">TCN Embed Tool</h3>
                </SectionLink>
                <p>
                    <a href={`${process.env.NEXT_PUBLIC_DOMAIN}/tools/embeds`} className="link" target="_blank">
                        {process.env.NEXT_PUBLIC_DOMAIN}/tools/embeds
                    </a>
                </p>
                <p>
                    The TCN Embed Tool has an example on the landing page. This is a TOML-based message editor that isn&apos;t the most convenient to use but is
                    rigorously defined, allows for a much more readable text representation than raw JSON, and is the basis for autosync templates.
                </p>
                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                    <FaCheck color="green"></FaCheck> New Forum Posts
                    <FaCheck color="green"></FaCheck> Post To Threads
                    <FaXmark color="red"></FaXmark> Components (Buttons &amp; Dropdown Menus)
                </div>
                <p>
                    <b>Careful!</b> TCN Embed Tool&apos;s share links expire after one week of not being accessed. If you want to keep a permanent link,
                    copy-paste the link from the browser bar and shorten it using something like the{" "}
                    <a href="/tools/url-shortener" className="link" target="_blank">
                        TCN URL Shortener
                    </a>{" "}
                    (council-only) or{" "}
                    <a href="https://tinyurl.com" className="link" target="_blank">
                        TinyURL
                    </a>
                    .
                </p>
                <SectionLink id="leaf-embeds">
                    <h3 className="text-3xl">Leaf Embeds</h3>
                </SectionLink>
                <p>
                    <a href="https://embeds.leaf.moe" className="link" target="_blank">
                        https://embeds.leaf.moe
                    </a>
                </p>
                <p>
                    Leaf Embeds does not have any documentation, but you can check out{" "}
                    <a href="https://embeds.leaf.moe/demo" className="link" target="_blank">
                        this example
                    </a>{" "}
                    for a demo.
                </p>
                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                    <FaCheck color="green"></FaCheck> New Forum Posts
                    <FaCheck color="green"></FaCheck> Post To Threads
                    <FaXmark color="red"></FaXmark> Components (Buttons &amp; Dropdown Menus)
                </div>
                <p>Leaf Embeds&apos; save links last forever and have the added bonus of being editable.</p>
                <SectionLink id="discohook">
                    <h3 className="text-3xl">Discohook</h3>
                </SectionLink>
                <p>
                    <a href="https://discohook.org" className="link" target="_blank">
                        https://discohook.org
                    </a>
                </p>
                <p>Discohook has usage instructions in the landing page.</p>
                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                    <FaCheck color="green"></FaCheck> New Forum Posts
                    <FaCheck color="green"></FaCheck> Post To Threads
                    <FaXmark color="red"></FaXmark> Components (Buttons &amp; Dropdown Menus)
                </div>
                <p>
                    <b>Careful!</b> Discohook&apos;s share links expire after one week of not being accessed. If you want to keep a permanent link, copy-paste
                    the link from the browser bar and shorten it using something like the{" "}
                    <a href="/tools/url-shortener" className="link" target="_blank">
                        TCN URL Shortener
                    </a>{" "}
                    (council-only) or{" "}
                    <a href="https://tinyurl.com" className="link" target="_blank">
                        TinyURL
                    </a>
                    .
                </p>
                <SectionLink id="embed-generator">
                    <h3 className="text-3xl">Embed Generator</h3>
                </SectionLink>
                <p>
                    <a href="https://message.style" className="link" target="_blank">
                        https://message.style
                    </a>
                </p>
                <p>Embed Generator has its own help page and FAQ on the left sidebar.</p>
                <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                    <FaXmark color="red"></FaXmark> New Forum Posts
                    <FaCheck color="green"></FaCheck> Post To Threads
                    <FaCheck color="green"></FaCheck> Components (Buttons &amp; Dropdown Menus)
                </div>
                <p>
                    <b>Careful!</b> Discohook&apos;s share links expire after one week of not being accessed. If you want to keep a permanent link, copy-paste
                    the link from the browser bar and shorten it using something like the{" "}
                    <a href="/tools/url-shortener" className="link" target="_blank">
                        TCN URL Shortener
                    </a>{" "}
                    (council-only) or{" "}
                    <a href="https://tinyurl.com" className="link" target="_blank">
                        TinyURL
                    </a>
                    .
                </p>
                <SectionLink id="developers">
                    <h2 className="text-4xl">For Developers</h2>
                </SectionLink>
                <p>
                    A webhook is just an endpoint to which you can send data to make the webhook perform certain actions. You can find full documentation on the
                    <a href="https://discord.com/developers/docs/resources/webhook" className="link" target="_blank">
                        Developer Portal
                    </a>
                    , but here is a summary:
                </p>
                <ul>
                    <li>
                        <code>POST /</code> &mdash; Provide the message data as the body to post your message through the webhook. Most embed creation services
                        have a JSON editor which allows you to copy the JSON data of your message.
                        <ul>
                            <li>
                                To receive the created message object as a response, set <code>?wait=true</code>.
                            </li>
                            <li>
                                To post to a thread, set <code>?thread_id=...</code>.
                            </li>
                            <li>
                                To create a new forum post, set <code>&quot;thread_name&quot;: &quot;...&quot;</code> in the request body.
                            </li>
                        </ul>
                    </li>
                    <li>
                        <code>PATCH /messages/:id</code> &mdash; Edit a webhook message.
                    </li>
                    <li>
                        <code>DELETE /messages/:id</code> &mdash; Delete a webhook message.
                    </li>
                    <li>
                        <code>PATCH /</code> &mdash; Edit the name and/or avatar of the webhook. You cannot change which channel the webhook is in using the
                        method.
                    </li>
                    <li>
                        <code>DELETE /</code> &mdash; <b className="text-[#cc4444]">Delete the webhook</b>.
                    </li>
                </ul>
            </div>
        </Container>
    );
}
