import guilds from "./routes/guilds.js";
import users from "./routes/users.js";

export default {
    ...guilds,
    ...users,
} as const;
