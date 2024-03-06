"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import NormalSelect from "@/components/ui/normal-select";
import Panel from "@/components/ui/panel";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import UserMention from "@/components/ui/user-mention";
import { Fragment, useEffect, useState } from "react";
import { FaPaperPlane, FaPlus, FaTrash } from "react-icons/fa6";
import { createPoll } from "./actions";

export default function VoteCreateBody() {
    const [mode, setMode] = useState<"induction" | "proposal" | "election" | "selection">("induction");
    const [question, setQuestion] = useState<string>("");
    const [server, setServer] = useState<string>("");
    const [preinduct, setPreinduct] = useState<boolean>(false);
    const [wave, setWave] = useState<number>(1);
    const [seats, setSeats] = useState<number>(1);
    const [candidates, setCandidates] = useState<string[]>([]);
    const [min, setMin] = useState<number>(1);
    const [max, setMax] = useState<number>(1);
    const [options, setOptions] = useState<string[]>(["", ""]);
    const [duration, setDuration] = useState<number>(48);
    const [live, setLive] = useState<boolean>(false);
    const [restricted, setRestricted] = useState<boolean>(true);
    const [dm, setDm] = useState<boolean>(true);
    const [quorum, setQuorum] = useState<number>(60);

    useEffect(() => {
        if (min > max) setMax(min);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min]);

    useEffect(() => {
        if (min > max) setMin(max);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [, max]);

    const error =
        duration < 0
            ? "Please set a non-negative duration"
            : mode === "induction"
            ? !server.trim()
                ? "Please enter the server name."
                : false
            : mode === "proposal"
            ? !question.trim()
                ? "Please enter the question."
                : false
            : mode === "election"
            ? wave < 1
                ? "Please enter a wave (at least 1)."
                : seats < 1
                ? "Please enter the number of seats (at least 1)."
                : candidates.length === 0
                ? "Please enter at least one candidate."
                : false
            : mode === "selection"
            ? !question.trim()
                ? "Please enter the question."
                : min > max
                ? "Minimum number of allowed selections must be less than maximum."
                : min < 1
                ? "Minimum number of allowed selections must be at least 1."
                : options.length < max
                ? "Maximum number of allowed selections must not be greater than the number of options."
                : options.some((x) => !x.trim())
                ? "All options must be non-empty."
                : false
            : true;

    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Create Vote</h1>
                <div className="center-row gap-4">
                    <b>Poll Mode:</b>
                    <NormalSelect
                        value={mode}
                        setValue={setMode}
                        options={[
                            ["induction", "Induction"],
                            ["proposal", "Proposal"],
                            ["election", "Election"],
                            ["selection", "Selection"],
                        ]}
                    ></NormalSelect>
                </div>
                <div>
                    <Panel>
                        <div className="flex flex-col gap-4" style={{ width: "calc(min(80vw,48rem))" }}>
                            <h2 className="text-3xl">Poll Data</h2>
                            {mode === "induction" ? (
                                <>
                                    <div className="center-row gap-4">
                                        <b className="whitespace-nowrap">Server Name:</b>
                                        <Input value={server} onChange={({ currentTarget: { value } }) => setServer(value)} maxLength={64}></Input>
                                    </div>
                                    <div className="center-row gap-4">
                                        <Switch checked={preinduct} onCheckedChange={setPreinduct}></Switch>
                                        <span>
                                            <b>Enable pre-induct</b> (the character is not officially confirmed to be playable)
                                        </span>
                                    </div>
                                </>
                            ) : null}
                            {mode === "proposal" || mode === "selection" ? (
                                <Textarea
                                    value={question}
                                    onChange={({ currentTarget: { value } }) => setQuestion(value)}
                                    rows={4}
                                    placeholder="Question (Markdown Supported)"
                                    maxLength={256}
                                ></Textarea>
                            ) : null}
                            {mode === "selection" ? (
                                <>
                                    <div className="grid grid-cols-[max-content_1fr_max-content] items-center gap-4">
                                        <b>Must Select &ge;</b>
                                        <Input
                                            className="col-span-2"
                                            type="number"
                                            value={min || ""}
                                            onChange={({ currentTarget: { value } }) => setMin(+value)}
                                            min={1}
                                            max={10}
                                        ></Input>
                                        <b>Must Select &le;</b>
                                        <Input
                                            className="col-span-2"
                                            type="number"
                                            value={max || ""}
                                            onChange={({ currentTarget: { value } }) => setMax(+value)}
                                            min={1}
                                            max={10}
                                        ></Input>
                                        {options.map((x, i) => (
                                            <Fragment key={i}>
                                                <b>Option {i + 1}</b>
                                                <Input
                                                    className={options.length > 2 ? "" : "col-span-2"}
                                                    value={x}
                                                    onChange={({ currentTarget: { value } }) =>
                                                        setOptions((options) => [...options.slice(0, i), value, ...options.slice(i + 1)])
                                                    }
                                                    maxLength={100}
                                                ></Input>
                                                {options.length > 2 ? (
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => setOptions((options) => [...options.slice(0, i), ...options.slice(i + 1)])}
                                                    >
                                                        <FaTrash></FaTrash>
                                                    </Button>
                                                ) : null}
                                            </Fragment>
                                        ))}
                                    </div>
                                    {options.length < 10 ? (
                                        <div>
                                            <Button variant="outline" className="center-row gap-2" onClick={() => setOptions((options) => [...options, ""])}>
                                                <FaPlus></FaPlus> Add Option
                                            </Button>
                                        </div>
                                    ) : (
                                        <p>You have reached the maximum option count.</p>
                                    )}
                                </>
                            ) : null}
                            {mode === "election" ? (
                                <>
                                    <div className="grid grid-cols-[max-content_1fr] items-center gap-4">
                                        <b>Wave:</b>
                                        <Input type="number" value={wave || ""} onChange={({ currentTarget: { value } }) => setWave(+value)} min={1}></Input>
                                        <b># of seats:</b>
                                        <Input type="number" value={seats || ""} onChange={({ currentTarget: { value } }) => setSeats(+value)} min={1}></Input>
                                    </div>
                                    <h3 className="text-xl">Candidates</h3>
                                    {candidates.length > 0 ? (
                                        <div className="grid grid-cols-[max-content_1fr] items-center gap-2">
                                            {candidates.map((x, i) => (
                                                <Fragment key={i}>
                                                    <Button variant="ghost" onClick={() => setCandidates((candidates) => candidates.filter((id) => id !== x))}>
                                                        <FaTrash></FaTrash>
                                                    </Button>
                                                    <div>
                                                        <UserMention id={x}></UserMention>
                                                    </div>
                                                </Fragment>
                                            ))}
                                        </div>
                                    ) : null}
                                    {candidates.length < 25 ? (
                                        <div>
                                            <Button
                                                variant="outline"
                                                className="center-row gap-2"
                                                onClick={() => {
                                                    const id = prompt("Enter the ID of the candidate to add.");

                                                    if (!id) return;
                                                    if (!id.match(/^[1-9][0-9]{16,19}$/)) return alert("That user ID is invalid.");
                                                    if (candidates.includes(id)) return alert("That user is already a candidate.");

                                                    setCandidates((candidates) => [...candidates, id]);
                                                }}
                                            >
                                                <FaPlus></FaPlus> Add Candidate
                                            </Button>
                                        </div>
                                    ) : (
                                        <p>You have reached the maximum candidate count.</p>
                                    )}
                                </>
                            ) : null}
                        </div>
                        <Separator></Separator>
                        <p>
                            <b>Duration</b> (in hours, starting from now)
                        </p>
                        <Input type="number" value={duration || ""} onChange={({ currentTarget: { value } }) => setDuration(+value)} min={0}></Input>
                    </Panel>
                    <Panel>
                        <h2 className="text-3xl">Metadata</h2>
                        <div className="center-row gap-4">
                            <Switch checked={live} onCheckedChange={setLive}></Switch>
                            <span>
                                <b>Live</b> (display results in realtime &mdash; forbidden for standard votes)
                            </span>
                        </div>
                        <div className="center-row gap-4">
                            <Switch checked={restricted} onCheckedChange={setRestricted}></Switch>
                            <span>
                                <b>Restricted</b> (only designated voters may vote)
                            </span>
                        </div>
                        <div className="center-row gap-4">
                            <Switch checked={dm} onCheckedChange={setDm}></Switch>
                            <span>
                                <b>DM Reminder</b> (required for standard votes)
                            </span>
                        </div>
                        <div className="center-row gap-4">
                            <b>Quorum</b>
                            <NormalSelect
                                value={`${quorum}`}
                                setValue={(x) => setQuorum(+x)}
                                options={[
                                    ["0", "None"],
                                    ["60", "Low (60%)"],
                                    ["75", "High (75%)"],
                                ]}
                            ></NormalSelect>
                        </div>
                    </Panel>
                    <Panel>
                        <div>
                            <Button
                                className="center-row gap-2"
                                disabled={!!error}
                                onClick={async () => {
                                    const { error, id } = await createPoll({
                                        mode,
                                        duration,
                                        live,
                                        min,
                                        max,
                                        preinduct,
                                        question,
                                        quorum,
                                        restricted,
                                        seats,
                                        server,
                                        wave,
                                        candidates,
                                        options,
                                    });

                                    if (error) return alert(error);

                                    location.replace(`/vote/${id}`);
                                }}
                            >
                                <FaPaperPlane></FaPaperPlane> Post
                            </Button>
                        </div>
                        {error ? (
                            <p>
                                <span className="text-muted-foreground">{error}</span>
                            </p>
                        ) : null}
                    </Panel>
                </div>
            </div>
        </Container>
    );
}
