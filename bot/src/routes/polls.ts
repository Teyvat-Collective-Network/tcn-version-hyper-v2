import { z } from "zod";
import { channels } from "../bot.js";
import { renderPoll } from "../lib/polls.js";
import { snowflake } from "../schemas.js";
import { proc } from "../trpc.js";

export default {
    createPoll: proc
        .input(
            z.object({
                mode: z.enum(["induction", "proposal", "election", "selection"]),
                duration: z.number().min(0),
                live: z.boolean(),
                min: z.number().int().min(1).max(10),
                max: z.number().int().min(1).max(10),
                preinduct: z.boolean(),
                question: z.string().max(256),
                quorum: z.number().int().min(0).max(100),
                restricted: z.boolean(),
                seats: z.number().int().min(1),
                server: z.string().max(64),
                wave: z.number().int().min(1),
                candidates: snowflake.array().max(25),
                options: z.string().max(100).array().min(2).max(10),
            }),
        )
        .output(z.object({ error: z.string().optional(), id: z.number().int().min(1).optional() }))
        .mutation(async ({ input: { duration, ...poll } }) => {
            try {
                const data = await renderPoll({ ...poll, close: Date.now() + duration, closed: duration === 0, votes: [] }).catch((e) => {
                    throw `Error displaying poll: ${e}`;
                });

                const message = await channels.voteHere.send(data);
                throw "Not Implemented";
            } catch (error) {
                return { error: `${error}` };
            }
        }),
} as const;
