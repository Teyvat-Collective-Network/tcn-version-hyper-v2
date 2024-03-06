import type { Poll } from "@tcn/backend/src/types.js";
import { BaseMessageOptions } from "discord.js";
import api from "../api.js";

export async function renderPoll(poll: Omit<Poll, "id" | "message">): Promise<BaseMessageOptions> {
    const voters = new Set(await api.getVoters.query(poll.restricted));
    const ballots = poll.votes.filter((ballot) => voters.has(ballot.user));

    return {
        embeds: [
            {
                title: `${((ballots.length / voters.size) * 100).toFixed(2)}% Turnout Reached`,
                description:
                    poll.mode === "induction"
                        ? `Induct ${poll.server}?`
                        : poll.mode === "proposal" || poll.mode === "selection"
                        ? poll.question
                        : poll.mode === "election"
                        ? `Please vote in the Wave ${poll.wave} Election.`
                        : "?",
                color: 0x2b2d31,
            },
        ],
    };
}
