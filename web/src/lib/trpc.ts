import type { AppRouter } from "@tcn/backend";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export default createTRPCClient<AppRouter>({ links: [httpBatchLink({ url: `http://localhost:${process.env.BACKEND_PORT}` })] });
