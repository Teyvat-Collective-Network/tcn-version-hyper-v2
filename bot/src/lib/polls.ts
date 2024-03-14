import type { Poll } from "@tcn/backend/src/types.js";
import { BaseMessageOptions } from "discord.js";
import api from "../api.js";

export async function renderPoll(poll: Omit<Poll, "id" | "message">): Promise<BaseMessageOptions> {
    const voters = new Set(await api.getVoters.query(poll.restricted));
    const ballots = poll.votes.filter((ballot) => voters.has(ballot.user));

    const turnout = (ballots.length / (voters.size || 1)) * 100;

    function results(): string {
        if (poll.mode === "proposal") {
            let yes = 0,
                no = 0;

            for (const ballot of ballots)
                if (!ballot.abstain)
                    if (ballot.yes) yes++;
                    else no++;

            const votes = yes + no;
            const green = (yes * 10) / votes;
            const ratio = votes ? yes / votes : 0.5;

            const bar = votes ? `${":green_square:".repeat(green)}${":red_square:".repeat(10 - green)}` : ":white_large_square:".repeat(10);

            return `${yes} :arrow_up: ${bar} :arrow_down: ${no}\n\n${
                ratio <= 0.4 ? "The motion has been rejected." : ratio < 0.6 ? "The vote has resulted in a tie." : "The motion has passed."
            }`;
        } else if (poll.mode === "induction") {
            let preinduct = 0,
                induct = 0,
                reject = 0,
                extend = 0;

            for (const ballot of ballots)
                if (!ballot.abstain)
                    if (ballot.verdict === "preinduct")
                        if (poll.preinduct) preinduct++;
                        else induct++;
                    else if (ballot.verdict === "induct") induct++;
                    else if (ballot.verdict === "reject") reject++;
                    else if (ballot.verdict === "extend") extend++;

            const votes = preinduct + induct + reject + extend;
            const ratio = votes ? (induct + preinduct) / votes : 0.5;
            const subratio = ratio >= 0.5 ? induct / (induct + preinduct) : reject / (reject + extend);

            return `- Induct${poll.preinduct ? " Now" : ""}: ${induct}${
                poll.preinduct ? `\n- Induct Later: ${preinduct}` : ""
            }\n- Reject: ${reject}\n- Extend: ${extend}\n\n${
                ratio <= 0.4
                    ? subratio <= 0.4
                        ? `${poll.server} will be re-observed.`
                        : subratio < 0.6
                        ? `${poll.server} was not approved, but a re-vote is required to determine if they will be rejected or re-observed.`
                        : `${poll.server} was rejected.`
                    : ratio < 0.6
                    ? "This vote fully tied and a re-vote is required."
                    : subratio <= 0.4
                    ? `${poll.server} was pre-approved for induction later.`
                    : subratio < 0.6
                    ? `${poll.server} was approved, but a re-vote is required to determine if they will be inducted now or later.`
                    : `${poll.server} was approved for induction.`
            }`;
        } else if (poll.mode === "election") {
            const balance = Object.fromEntries(poll.candidates.map((x) => [x, 0]));
            const scores = Object.fromEntries(poll.candidates.map((x) => [x, 0]));

            for (const ballot of ballots)
                if (!ballot.abstain)
                    for (const [user, rank] of Object.entries(ballot.candidates))
                        if (rank === -1) balance[user]--;
                        else if (rank > 0) {
                            balance[user]++;
                            scores[user] += poll.seats < poll.candidates.length ? poll.candidates.length - rank : 1;
                        }

            const eligible = poll.candidates.filter((x) => balance[x] >= 0).sort((x, y) => scores[y] - scores[x]);

            let elected: string[];
            let tied: string[] = [];

            if (eligible.length > poll.seats && scores[eligible[poll.seats - 1]] === scores[eligible[poll.seats]]) {
                elected = eligible.filter((x) => scores[x] > scores[eligible[poll.seats]]);
                tied = eligible.filter((x) => scores[x] === scores[eligible[poll.seats]]);
            } else elected = eligible.slice(0, poll.seats);

            elected.sort();
            tied.sort();

            return `Elected candidates in arbitrary order: ${elected.map((x) => `<@${x}>`).join(" ")}${
                tied.length > 0
                    ? `\n\nThere was a tie between the following candidates for the remaining ${poll.seats - elected.length} seat${
                          poll.seats - 1 === elected.length ? "" : "s"
                      } (in arbitrary order): ${tied.map((x) => `<@${x}>`).join(" ")}`
                    : ""
            }`;
        } else if (poll.mode === "selection") {
            const scores = Object.fromEntries(poll.options.map((x) => [x, 0]));

            for (const ballot of ballots) if (!ballot.abstain) for (const item of ballot.selected) if (item in scores) scores[item]++;
            const votes = ballots.filter((x) => !x.abstain).length;

            return poll.options
                .map(
                    (x, i) =>
                        `\`${"ABCDEFGHIJ"[i]}\` ${"█".repeat((scores[x] * 20) / (votes || 1)).padEnd(20, "░")} (${((scores[x] * 100) / (votes || 1)).toFixed(
                            2,
                        )}%)`,
                )
                .join("\n");
        }

        return "?";
    }

    const abstained = ballots.filter((x) => x.abstain).length;

    return {
        embeds: [
            {
                title: `${turnout.toFixed(2)}% Turnout Reached`,
                description:
                    poll.mode === "induction"
                        ? `Induct ${poll.server}?`
                        : poll.mode === "proposal" || poll.mode === "selection"
                        ? poll.question
                        : poll.mode === "election"
                        ? `Please vote in the Wave ${poll.wave} Election.`
                        : "?",
                color: 0x2b2d31,
                fields: [
                    ...(poll.mode === "election"
                        ? [{ name: "Candidates", value: `In no particular order: ${poll.candidates.map((x) => `<@${x}>`).join(", ")}` }]
                        : poll.mode === "selection"
                        ? [{ name: "Options", value: poll.options.map((x, i) => `- \`${"ABCDEFGHIJ"[i]}\`: ${x}`).join("\n") }]
                        : []),
                    {
                        name: "Results",
                        value:
                            poll.live || (poll.closed && turnout >= poll.quorum)
                                ? results()
                                : `Results are hidden ${poll.closed ? "because this poll failed to reach quorum" : "until this poll concludes."}.`,
                    },
                    {
                        name: "Deadline",
                        value: `<t:${Math.floor(poll.close / 1000)}:F>`,
                    },
                ],
                footer:
                    poll.live || (poll.closed && turnout >= poll.quorum) ? { text: `${abstained} voter${abstained === 1 ? "" : "s"} abstained.` } : undefined,
            },
        ],
    };
}
