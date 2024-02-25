import apply from "./routes/apply.js";
import banshares from "./routes/banshares.js";
import users from "./routes/users.js";

export default {
    ...apply,
    ...banshares,
    ...users,
} as const;
