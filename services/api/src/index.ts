import { app } from "./app.js";
import routes from "./routes.js";

app.use(routes).listen(Bun.env.PORT || 3000);
console.log(`Listening on ${app.server?.hostname}:${app.server?.port}`);
