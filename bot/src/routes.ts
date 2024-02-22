import apply from "./routes/apply.js";
import users from "./routes/users.js";

export default {
    ...apply,
    ...users,
} as const;
