import apply from "./routes/apply.js";
import banshares from "./routes/banshares.js";
import polls from "./routes/polls.js";
import users from "./routes/users.js";

export default {
    ...apply,
    ...banshares,
    ...polls,
    ...users,
} as const;
