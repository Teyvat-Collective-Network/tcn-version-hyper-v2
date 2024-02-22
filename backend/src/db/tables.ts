import { bigint, boolean, index, int, json, mysqlEnum, mysqlTable, primaryKey, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const attributes = mysqlTable(
    "attributes",
    {
        type: varchar("type", { length: 32 }).notNull(),
        id: varchar("id", { length: 32 }).notNull(),
        name: varchar("name", { length: 32 }).notNull(),
        emoji: varchar("emoji", { length: 64 }).notNull(),
    },
    (t) => ({
        pk_type_id: primaryKey({ name: "pk_type_id", columns: [t.type, t.id] }),
    }),
);

export const auditLogs = mysqlTable(
    "audit-logs",
    {
        uuid: int("uuid").notNull().autoincrement().primaryKey(),
        action: varchar("action", { length: 32 }).notNull(),
        user: varchar("user", { length: 32 }).notNull(),
        token: varchar("token", { length: 256 }),
        time: timestamp("time").notNull().defaultNow(),
        reason: text("reason"),
        data: json("data").notNull(),
    },
    (t) => ({
        idx_time: index("idx_time").on(t.time),
    }),
);

export const autosync = mysqlTable("autosync", {
    guild: varchar("guild", { length: 20 }).notNull().primaryKey(),
    repost: boolean("repost").notNull(),
    useWebhook: boolean("use_webhhook").notNull(),
    channel: varchar("channel", { length: 20 }),
    webhook: text("webhook").notNull(),
});

export const banshareSettings = mysqlTable("banshare_settings", {
    guild: varchar("guild", { length: 20 }).notNull().primaryKey(),
    noButton: boolean("no_button").notNull(),
    daedalus: boolean("daedalus").notNull(),
    blockDMs: boolean("block_dms").notNull(),
    channel: varchar("channel", { length: 20 }),
});

export const banshareLogs = mysqlTable(
    "banshare_logs",
    {
        guild: varchar("guild", { length: 20 }).notNull(),
        channel: varchar("channel", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_guild_channel: primaryKey({ name: "pk_guild_channel", columns: [t.guild, t.channel] }),
    }),
);

export const banshares = mysqlTable("banshares", {
    message: varchar("message", { length: 20 }).notNull().primaryKey(),
    author: varchar("user", { length: 20 }).notNull(),
    guild: varchar("guild", { length: 20 }).notNull(),
    created: timestamp("created").notNull(),
    reminded: timestamp("reminded").notNull(),
    ids: text("ids").notNull(),
    reason: text("reason").notNull(),
    evidence: text("evidence").notNull(),
    severity: mysqlEnum("severity", ["DM", "P0", "P1", "P2"]).notNull(),
    status: mysqlEnum("status", ["pending", "rejected", "published", "rescinded"]),
    urgent: boolean("urgent").notNull(),
    rejecter: varchar("rejecter", { length: 20 }),
    publisher: varchar("publisher", { length: 20 }),
    rescinder: varchar("rescinder", { length: 20 }),
});

export const characters = mysqlTable("characters", {
    id: varchar("id", { length: 32 }).notNull().primaryKey(),
    displayName: varchar("display_name", { length: 32 }),
    fullName: varchar("full_name", { length: 64 }).notNull(),
});

export const characterAttributes = mysqlTable(
    "character_attributes",
    {
        character: varchar("character", { length: 32 }).notNull(),
        type: varchar("type", { length: 32 }).notNull(),
        value: varchar("value", { length: 32 }).notNull(),
    },
    (t) => ({
        pk_character_type: primaryKey({ name: "pk_character_type", columns: [t.character, t.type] }),
    }),
);

export const docs = mysqlTable("docs", {
    id: varchar("id", { length: 32 }).notNull().primaryKey(),
    author: varchar("author", { length: 32 }).notNull(),
    allowCouncil: boolean("allow_council").notNull(),
    allowEveryone: boolean("allow_everyone").notNull(),
    allowLoggedIn: boolean("allow_logged_in").notNull(),
    anon: boolean("anon").notNull(),
    deleted: boolean("deleted").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    body: text("body").notNull(),
    embedBody: varchar("embed_body", { length: 4096 }).notNull(),
    embedColor: int("embed_color").notNull(),
    embedImage: varchar("embed_image", { length: 4096 }).notNull(),
    embedThumbnail: boolean("embed_thumbnail").notNull(),
    embedTitle: varchar("embed_title", { length: 256 }).notNull(),
    official: boolean("official").notNull(),
});

export const docsAllowlist = mysqlTable(
    "docs_allowlist",
    {
        id: varchar("id", { length: 32 }).notNull(),
        user: varchar("user", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_user: primaryKey({ name: "pk_id_user", columns: [t.id, t.user] }),
    }),
);

export const electionHistory = mysqlTable("election_history", {
    wave: int("wave").notNull(),
    user: varchar("user", { length: 20 }).notNull(),
    status: mysqlEnum("status", ["elected", "notelected", "accepted", "declined", "nominated", "unknown"]).notNull(),
    rerunning: boolean("rerunning").notNull(),
});

export const electionHistoryWaves = mysqlTable("election_history_waves", {
    wave: int("wave").notNull().primaryKey(),
    seats: int("seats").notNull(),
    time: timestamp("time").notNull(),
});

export const globalChannels = mysqlTable("global_channels", {
    id: int("id").notNull().autoincrement().primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    public: boolean("public").notNull(),
    logs: varchar("logs", { length: 20 }).notNull(),
    panic: boolean("panic").notNull(),
    ignoreFilter: boolean("ignore_filter").notNull(),
    infoOnUserPrompts: boolean("info_on_user_prompts").notNull(),
    localModsCanBan: boolean("local_mods_can_ban").notNull(),
});

export const globalChannelMods = mysqlTable(
    "global_channel_mods",
    {
        id: int("id").notNull(),
        user: varchar("user", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_user: primaryKey({ name: "pk_id_user", columns: [t.id, t.user] }),
        idx_user: index("idx_user").on(t.user),
    }),
);

export const globalChannelBans = mysqlTable(
    "global_channel_bans",
    {
        id: int("id").notNull(),
        user: varchar("user", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_user: primaryKey({ name: "pk_id_user", columns: [t.id, t.user] }),
        idx_user: index("idx_user").on(t.user),
    }),
);

export const globalConnections = mysqlTable(
    "global_connections",
    {
        id: int("id").notNull(),
        guild: varchar("guild", { length: 20 }).notNull(),
        channel: varchar("channel", { length: 20 }).notNull(),
        replyStyle: mysqlEnum("reply_style", ["text", "embed", "buttons"]).notNull(),
        showTag: boolean("show_tag").notNull(),
        showServer: boolean("show_server").notNull(),
        suspended: boolean("suspended").notNull(),
    },
    (t) => ({
        pk_id_guild: primaryKey({ name: "pk_id_guild", columns: [t.id, t.guild] }),
    }),
);

export const globalConnectionBans = mysqlTable(
    "global_connection_bans",
    {
        id: int("id").notNull(),
        guild: varchar("guild", { length: 20 }).notNull(),
        user: varchar("user", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_guild_user: primaryKey({ name: "pk_id_guild_user", columns: [t.id, t.guild, t.user] }),
    }),
);

export const globalFilter = mysqlTable("global_filter", {
    id: int("id").autoincrement().notNull().primaryKey(),
    match: varchar("match", { length: 128 }).notNull(),
    user: varchar("user", { length: 20 }).notNull(),
    created: timestamp("created").notNull(),
    updated: timestamp("updated").notNull(),
});

export const globalInfoOnUserRequests = mysqlTable("global_info_on_user_requests", {
    id: int("id").autoincrement().notNull().primaryKey(),
});

export const globalInfoRequestInstances = mysqlTable(
    "global_info_request_instances",
    {
        id: int("id").notNull(),
        channel: varchar("channel", { length: 20 }).notNull(),
        message: varchar("message", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_channel: primaryKey({ name: "pk_id_channel", columns: [t.id, t.channel] }),
    }),
);

export const globalInfoRequestGuilds = mysqlTable(
    "global_info_request_guilds",
    {
        id: int("id").notNull(),
        guild: varchar("guild", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_guild: primaryKey({ name: "pk_id_guild", columns: [t.id, t.guild] }),
    }),
);

export const globalMessages = mysqlTable("global_messages", {
    message: varchar("message", { length: 20 }).notNull().primaryKey(),
    channel: varchar("channel", { length: 20 }).notNull(),
    author: varchar("author", { length: 20 }).notNull(),
    global: int("global").notNull(),
});

export const globalMessageInstances = mysqlTable(
    "global_message_instances",
    {
        origin: varchar("origin", { length: 20 }).notNull(),
        guild: varchar("guild", { length: 20 }).notNull(),
        channel: varchar("channel", { length: 20 }).notNull(),
        message: varchar("message", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_origin_guild: primaryKey({ name: "pk_origin_guild", columns: [t.origin, t.guild] }),
        idx_message: index("idx_message").on(t.message),
    }),
);

export const globalUsers = mysqlTable("global_users", {
    user: varchar("user", { length: 20 }).notNull().primaryKey(),
    nickname: varchar("nickname", { length: 36 }).notNull(),
});

export const globalWebhooks = mysqlTable("global_webhooks", {
    id: varchar("id", { length: 20 }).notNull().primaryKey(),
});

export const guilds = mysqlTable("guilds", {
    id: varchar("id", { length: 20 }).notNull().primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    invite: varchar("invite", { length: 20 }).notNull(),
    mascot: varchar("mascot", { length: 32 }).notNull(),
    owner: varchar("owner", { length: 20 }).notNull(),
    advisor: varchar("advisor", { length: 20 }),
    delegated: boolean("delegated").notNull(),
    inducted: timestamp("inducted").notNull().defaultNow(),
});

export const guildUsers = mysqlTable(
    "guild_users",
    {
        guild: varchar("guild", { length: 20 }).notNull(),
        user: varchar("user", { length: 20 }).notNull(),
        staff: boolean("staff").notNull(),
        updated: timestamp("updated").notNull().defaultNow(),
    },
    (t) => ({
        pk_guild_user: primaryKey({ name: "pk_guild_user", columns: [t.guild, t.user] }),
    }),
);

export const guildRoles = mysqlTable(
    "guild_roles",
    {
        guild: varchar("guild", { length: 20 }).notNull(),
        user: varchar("user", { length: 20 }).notNull(),
        role: varchar("role", { length: 20 }).notNull(),
        added: timestamp("added").notNull().defaultNow(),
    },
    (t) => ({
        pk_guild_user_role: primaryKey({ name: "pk_guild_user_role", columns: [t.guild, t.user, t.role] }),
    }),
);

export const observationRecords = mysqlTable("observation_records", {
    uuid: int("uuid").notNull().autoincrement().primaryKey(),
    guild: varchar("guild", { length: 20 }).notNull(),
    hidden: boolean("hidden").notNull(),
    name: varchar("name", { length: 128 }).notNull(),
    observer: varchar("observer", { length: 20 }),
    start: timestamp("start"),
    end: timestamp("end"),
    status: mysqlEnum("status", [
        "pending",
        "rejecting",
        "retracted",
        "declined",
        "rejected",
        "canceled",
        "observing",
        "observed",
        "reporting",
        "waiting",
        "voting",
        "inducted",
        "preapproved",
    ]).notNull(),
    notes: text("notes").notNull(),
});

export const polls = mysqlTable(
    "polls",
    {
        id: int("id").notNull().autoincrement().primaryKey(),
        message: varchar("message", { length: 20 }).notNull(),
        mode: mysqlEnum("mode", ["induction", "proposal", "election", "selection"]).notNull(),
        close: timestamp("close").notNull(),
        closed: boolean("closed").notNull(),
        dm: boolean("dm").notNull(),
        duration: bigint("duration", { mode: "number" }).notNull(),
        live: boolean("live").notNull(),
        min: int("min").notNull(),
        max: int("max").notNull(),
        preinduct: boolean("preinduct").notNull(),
        question: varchar("question", { length: 256 }).notNull(),
        quorum: int("quorum").notNull(),
        restricted: boolean("restricted").notNull(),
        seats: int("seats").notNull(),
        server: varchar("server", { length: 64 }).notNull(),
        wave: int("wave").notNull(),
    },
    (t) => ({
        idx_message: index("idx_message").on(t.message),
    }),
);

export const pollCandidates = mysqlTable(
    "poll_candidates",
    {
        id: int("id").notNull(),
        user: varchar("user", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_id_user: primaryKey({ name: "pk_id_user", columns: [t.id, t.user] }),
    }),
);

export const pollOptions = mysqlTable(
    "poll_options",
    {
        id: int("id").notNull(),
        option: varchar("option", { length: 100 }).notNull(),
    },
    (t) => ({
        pk_id_option: primaryKey({ name: "pk_id_option", columns: [t.id, t.option] }),
    }),
);

export const rolesyncApiToRole = mysqlTable("rolesync_api_to_role", {
    guild: varchar("guild", { length: 20 }).notNull(),
    type: mysqlEnum("type", ["position", "role"]).notNull(),
    position: mysqlEnum("position", ["observer", "owner", "advisor", "voter", "council", "staff"]).notNull(),
    role: varchar("role", { length: 32 }).notNull(),
    origin: varchar("origin", { length: 20 }).notNull(),
});

export const rolesyncRoleToApi = mysqlTable("rolesync_role_to_api", {
    guild: varchar("guild", { length: 20 }).notNull(),
    role: varchar("role", { length: 20 }).notNull(),
    apiRole: varchar("api_role", { length: 32 }).notNull(),
});

export const rolesyncRoleToStaff = mysqlTable("rolesync_role_to_staff", {
    guild: varchar("guild", { length: 20 }).notNull(),
    role: varchar("role", { length: 20 }).notNull(),
});

export const shareLinks = mysqlTable(
    "share_links",
    {
        id: varchar("id", { length: 64 }).notNull().primaryKey(),
        content: text("content").notNull(),
        time: timestamp("time").notNull().defaultNow(),
    },
    (t) => ({
        idx_time: index("idx_time").on(t.time),
    }),
);

export const shortLinks = mysqlTable(
    "short_links",
    {
        id: varchar("id", { length: 128 }).notNull().primaryKey(),
        owner: varchar("owner", { length: 20 }).notNull(),
        url: text("url").notNull(),
    },
    (t) => ({
        idx_owner: index("idx_owner").on(t.owner),
    }),
);

export const users = mysqlTable("users", {
    id: varchar("id", { length: 20 }).notNull().primaryKey(),
    observer: boolean("observer").notNull(),
    observerSince: timestamp("observer_since"),
    owner: boolean("owner").notNull(),
    advisor: boolean("advisor").notNull(),
    voter: boolean("voter").notNull(),
    council: boolean("council").notNull(),
    staff: boolean("staff").notNull(),
});

export const userRoles = mysqlTable(
    "user_roles",
    {
        user: varchar("user", { length: 20 }).notNull(),
        role: varchar("role", { length: 32 }).notNull(),
        added: timestamp("added").notNull().defaultNow(),
    },
    (t) => ({
        pk_user_role: primaryKey({ name: "pk_user_role", columns: [t.user, t.role] }),
    }),
);

export const voteRecords = mysqlTable(
    "vote_records",
    {
        poll: int("poll").notNull(),
        user: varchar("user", { length: 20 }).notNull(),
        voted: boolean("voted").notNull(),
    },
    (t) => ({
        pk_poll_user: primaryKey({ name: "pk_poll_user", columns: [t.poll, t.user] }),
    }),
);

export const votes = mysqlTable(
    "votes",
    {
        poll: int("poll").notNull(),
        user: varchar("user", { length: 20 }).notNull(),
        abstain: boolean("abstain").notNull(),
        yes: boolean("yes"),
        verdict: mysqlEnum("verdict", ["preinduct", "induct", "extend", "reject"]).notNull(),
        candidates: json("candidates").notNull(),
        selected: json("selected").notNull(),
    },
    (t) => ({
        pk_poll_user: primaryKey({ name: "pk_poll_user", columns: [t.poll, t.user] }),
    }),
);

export const invalidations = mysqlTable("invalidations", {
    user: varchar("user", { length: 20 }).notNull().primaryKey(),
    time: timestamp("time").notNull(),
});
