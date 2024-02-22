import type { AppRouter } from "@tcn/bot";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export default createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: `http://localhost:${process.env.BOT_PORT}` })] });
