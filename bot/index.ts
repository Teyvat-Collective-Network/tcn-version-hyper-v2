import "dotenv/config.js";

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import routes from "./src/routes.js";
import { router } from "./src/trpc.js";

process.on("uncaughtException", console.error);

const appRouter = router(routes);

export type AppRouter = typeof appRouter;

const server = createHTTPServer({ router: appRouter });
server.listen(+process.env.PORT!);

console.log(`Server listening on localhost:${process.env.PORT}`);
