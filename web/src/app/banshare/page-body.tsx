"use client";

import { DrawerDialog } from "@/components/ui/drawer-dialog";
import { useEffect, useMemo, useState } from "react";
import { FaAt, FaHouse, FaRepeat } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import Container from "../../components/ui/container";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Mention from "../../components/ui/mention";
import NormalSelect from "../../components/ui/normal-select";
import Panel from "../../components/ui/panel";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { getTag, submitBanshare } from "../../lib/actions";
import { User } from "../../lib/types";

export default function BanshareFormBody({ user, guilds }: { user: User; guilds: { name: string; id: string }[] }) {
    const [ids, setIds] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const [evidence, setEvidence] = useState<string>("");
    const [server, setServer] = useState<string>("");
    const [severity, setSeverity] = useState<"P0" | "P1" | "P2" | "DM" | "">("");
    const [urgent, setUrgent] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);
    const [tags, setTags] = useState<Record<string, string>>({});
    const [running, setRunning] = useState<boolean>();

    const matches = useMemo(() => ids.match(/^\s*([1-9][0-9]{16,19}\s+)*[1-9][0-9]{16,19}\s*$/), [ids]);
    const list = useMemo(() => ids.trim().split(/\s+/), [ids]);

    useEffect(() => {
        window.onbeforeunload = done ? () => null : (e) => e.preventDefault();
    }, [done]);

    async function fetchCycle(index: number = 0) {
        while (index < list.length && list[index] in tags) index++;
        if (index >= list.length) return;

        const tag = await getTag(list[index]);
        setTags((tags) => ({ ...tags, [list[index]]: tag }));

        setTimeout(() => fetchCycle(index + 1));
    }

    if (guilds.length === 0)
        return (
            <Container className="center-col my-24">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl">Banshare Form</h1>
                    <p>
                        It doesn&apos;t seem like there are any servers where you have permission to submit banshares. If you believe this is a mistake, please
                        contact your server&apos; owner or an observer.
                    </p>
                    <div>
                        <a href="/" className="inline-flex">
                            <Button className="center-row gap-2">
                                <FaHouse></FaHouse> Return Home
                            </Button>
                        </a>
                    </div>
                </div>
            </Container>
        );

    async function submit(mode: "normal" | "without-validation" | "without-checks") {
        if (ids.trim().length === 0) return alert("Please enter the user(s) you are bansharing.");

        if (mode === "normal" || mode === "without-validation") {
            if (!ids.match(/^\s*([1-9][0-9]{16,19}\s*)+\s*$/))
                return alert(
                    "The user ID list does not look correct. A user ID should be a 17-20 digit number. Please ensure you have entered the information correctly.",
                );

            if (ids.match(new RegExp(`\\b${user.id}\\b`))) return alert("It seems like your ID list contains your own user ID.");
        }

        if (reason.trim().length === 0) return alert("Please provide the reason for this banshare.");
        if (evidence.trim().length === 0) return alert("Please provide evidence for this banshare.");

        if (!server) return alert("Please select a server.");
        if (!severity) return alert("Please select a severity.");

        if (mode === "without-validation") {
            if (
                !confirm(
                    "Are you sure you want to submit without validation? Your user IDs will not be validated, meaning the bot will not check if they are valid user IDs.",
                )
            )
                return;
        } else if (mode === "without-checks") {
            if (
                !confirm(
                    "Are you sure you want to submit without checks? Your ID list will not be checked at all and autobanning will be disabled as a result. Only do this if strictly necessary; even if your ID list is very long, you can paste the whole thing and submit without validation and the bot will scan your IDs to ensure they look valid and upload its own document as needed.",
                )
            )
                return;
        }

        const error = await submitBanshare(mode, ids, reason, evidence, server, severity, urgent);
        if (error) return alert(error);

        setDone(true);
    }

    if (done)
        return (
            <Container className="center-col my-24">
                <div className="flex flex-col gap-8">
                    <h1 className="text-5xl">Banshare Form</h1>
                    <h2 className="text-4xl">Submitted</h2>
                    <p>Thank you for submitting your banshare. Observers will review it shortly and contact you if needed.</p>
                    <div className="center-row gap-4">
                        <a href="/">
                            <Button className="center-row gap-2">
                                <FaHouse></FaHouse> Return Home
                            </Button>
                        </a>
                        <Button
                            className="center-row gap-2"
                            onClick={() => {
                                setIds("");
                                setReason("");
                                setEvidence("");
                                setServer("");
                                setSeverity("");
                                setUrgent(false);
                                setDone(false);
                            }}
                        >
                            <FaRepeat></FaRepeat> Submit Another
                        </Button>
                    </div>
                </div>
            </Container>
        );

    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Banshare Form</h1>
                <p>
                    First time submitting a banshare? Make sure to read the{" "}
                    <a href="/info/banshares#submitting" className="link" target="_blank">
                        banshare submission guide
                    </a>{" "}
                    first.
                </p>
                <p>
                    You&apos;re logged in as{" "}
                    <Mention>
                        <FaAt></FaAt> {user.name}
                    </Mention>{" "}
                    and your user ID will be submitted with this form. Not you?{" "}
                    <a href="/auth/logout?redirect=/apply" className="link">
                        Log Out
                    </a>
                </p>
                <div>
                    <Panel>
                        <h3 className="text-2xl">ID(s) of the offender(s)</h3>
                        <Input value={ids} onChange={({ currentTarget: { value } }) => setIds(value)} placeholder="Space-separated ID list"></Input>
                        <DrawerDialog
                            trigger={
                                ids.trim().length > 0 ? (
                                    <div>
                                        <Button>Check IDs</Button>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            onOpenChange={(open) => {
                                if (open && matches) {
                                    setRunning(true);
                                    fetchCycle();
                                } else setRunning(false);
                            }}
                        >
                            {matches ? (
                                <ul>
                                    {list.map((id, i) => (
                                        <li key={i}>
                                            <code>{id}</code> &mdash; {tags[id] ?? <span className="text-muted-foreground">(Loading...)</span>}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <>
                                    <p>
                                        Your IDs appear invalid (if you are pasting a link, consider pasting the IDs themselves and letting the banshare system
                                        parse them and upload its own document).
                                    </p>
                                    <p>
                                        Specifically, the following looks invalid:{" "}
                                        <code>
                                            {ids
                                                .trim()
                                                .split(/\s+/)
                                                .find((x) => !x.match(/^[1-9][0-9]{16,19}$/))}
                                        </code>{" "}
                                        (expected a 17-20 digit number).
                                    </p>
                                </>
                            )}
                        </DrawerDialog>
                        <Separator></Separator>
                        <h3 className="text-2xl">Reason</h3>
                        <p>
                            If you need more than 250 characters, you should probably be putting it into the evidence field instead. Make the reason something
                            suitable for an audit log reason for the ban and include context in the next field.
                        </p>
                        <p>
                            Please keep this as concise as possible and deliver the minimum necessary information here. A reasonable amount of formality is
                            expected and banshares with jokes or non-serious reasons may be denied.
                        </p>
                        <Textarea
                            value={reason}
                            onChange={({ currentTarget: { value } }) => setReason(value)}
                            placeholder="Required &mdash; Max Length: 250 characters"
                            rows={4}
                            maxLength={250}
                        ></Textarea>
                        <Separator></Separator>
                        <h3 className="text-2xl">Evidence</h3>
                        <p>
                            Discord media links are <b>not allowed</b> because Discord has made changes that will cause static links to expire. This does not
                            affect usage of Discord itself, but means that using Discord attachment links to share images is no longer viable.
                        </p>
                        <p>
                            If you need more than 1000 characters, please{" "}
                            <a href="/docs" className="link" target="_blank">
                                create a document
                            </a>{" "}
                            and link it here. Include some basic information in the evidence so people can see roughly what your document contains.
                        </p>
                        <p>Provide sufficient evidence to verify your reason and for other staff to make an informed decision.</p>
                        <Textarea
                            value={evidence}
                            onChange={({ currentTarget: { value } }) => setEvidence(value)}
                            placeholder="Required &mdash; Max Length: 1000 characters"
                            rows={4}
                            maxLength={1000}
                        ></Textarea>
                    </Panel>
                    <Panel>
                        <h3 className="text-2xl">Server</h3>
                        <p>
                            Identify the server from which you are submitting this banshare. Don&apos;t see your server here? If you believe you should have
                            permission to submit banshares from a server, contact the server&apos;s owner or an observer.
                        </p>
                        <NormalSelect
                            value={server}
                            setValue={setServer}
                            options={guilds.map((guild) => [guild.id, guild.name])}
                            placeholder="Select a server."
                        ></NormalSelect>
                    </Panel>
                    <Panel>
                        <h3 className="text-2xl">Severity</h3>
                        <p>
                            The severity is used to determine autobanning. P0 indicates the greatest threat. Refer to the{" "}
                            <a href="/info/banshares#severity" className="link" target="_blank">
                                info page
                            </a>{" "}
                            for more information.
                        </p>
                        <NormalSelect
                            value={severity}
                            setValue={setSeverity}
                            options={[
                                ["P0", "P0"],
                                ["P1", "P1"],
                                ["P2", "P2"],
                                ["DM", "DM Scam"],
                            ]}
                            placeholder="Select a severity."
                        ></NormalSelect>
                    </Panel>
                    <Panel>
                        <h3 className="text-2xl">Urgency</h3>
                        <p>Check the box below to ping all observers to review this banshare urgently.</p>
                        <Label className="center-row gap-4">
                            <Checkbox checked={urgent} onCheckedChange={(ch) => setUrgent(!!ch.valueOf())}></Checkbox>
                            <b>This banshare is urgent</b>
                        </Label>
                    </Panel>
                </div>
                <div className="center-row gap-4 flex-wrap">
                    <Button onClick={() => submit("normal")}>Submit</Button>
                    <Button variant="secondary" onClick={() => submit("without-validation")}>
                        Submit Without Validation
                    </Button>
                    <Button variant="outline" onClick={() => submit("without-checks")}>
                        Submit Without Checks
                    </Button>
                </div>
                <p>
                    <b>Warning:</b> You should only submit without checks if your ID list is a link. Doing this prevents autobanning. You should paste your
                    entire ID list into the form if possible &mdash; the bot will parse the data and upload its own document if necessary.
                </p>
                <p>
                    <b>This may take a long time</b> if you have submitted a long ID list, as the bot needs to fetch every user. If your list is very long, use
                    &quot;Submit Without Validation&quot;, which will still parse the IDs and ensure they are in the correct format, but won&apos;t fetch the
                    users.
                </p>
            </div>
        </Container>
    );
}
