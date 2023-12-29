import fs from "node:fs/promises";
import { App } from "./app.js";

export default async (app: App) => {
    for (const filename of await fs.readdir("src/routes")) app.use((await import(`./routes/${filename}`)).default);
    return app;
};
