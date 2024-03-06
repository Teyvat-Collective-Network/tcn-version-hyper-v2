"use client";

import { Button } from "../../components/ui/button";
import Container from "../../components/ui/container";
import { useUserContext } from "../../context/user";
import trpc from "../../lib/trpc";

export default function VotingCenterBody({ polls }: { polls: Awaited<ReturnType<(typeof trpc)["getActivePolls"]["query"]>> }) {
    const user = useUserContext();

    return (
        <Container className="center-col my-24">
            <div className="flex flex-col gap-8">
                <h1 className="text-5xl">Voting Center</h1>
                {user?.observer ? (
                    <div className="center-row gap-4">
                        <a href="/vote/create">
                            <Button>Create Vote</Button>
                        </a>
                        <a href="/vote/records">
                            <Button>Vote Records</Button>
                        </a>
                    </div>
                ) : null}
                {polls.length === 0 ? (
                    <p>
                        <b>There are no polls at this time for you to vote on.</b>
                    </p>
                ) : (
                    <ul className="list-disc pl-8">
                        {polls.map((poll, i) => (
                            <li key={i}>
                                <a href={`/vote/${poll.id}`}>
                                    {poll.mode === "induction"
                                        ? `Induction vote for ${poll.server}`
                                        : poll.mode === "election"
                                        ? `Wave ${poll.wave} Election`
                                        : poll.question}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    );
}
