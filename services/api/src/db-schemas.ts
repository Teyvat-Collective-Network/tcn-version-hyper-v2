import { boolean, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    observer: boolean("observer").notNull().default(false),
});

export const globalRoles = mysqlTable(
    "global_roles",
    {
        user: varchar("user", { length: 20 }).notNull(),
        role: varchar("role", { length: 32 }).notNull(),
    },
    (t) => ({
        pk_user_role: primaryKey({ columns: [t.user, t.role] }),
    }),
);

export const guilds = mysqlTable("guilds", {
    id: varchar("id", { length: 20 }).primaryKey().notNull(),
    name: varchar("name", { length: 64 }).notNull(),
    mascot: varchar("mascot", { length: 32 }).notNull(),
    invite: varchar("invite", { length: 16 }).unique().notNull(),
    owner: varchar("owner", { length: 20 }).notNull(),
    advisor: varchar("advisor", { length: 20 }),
    delegated: boolean("delegated").notNull().default(false),
});

export const staff = mysqlTable(
    "staff",
    {
        guild: varchar("guild", { length: 20 }).notNull(),
        user: varchar("user", { length: 20 }).notNull(),
    },
    (t) => ({
        pk_guild_user: primaryKey({ columns: [t.guild, t.user] }),
    }),
);

export const guildRoles = mysqlTable(
    "guild_roles",
    {
        guild: varchar("guild", { length: 20 }).notNull(),
        user: varchar("user", { length: 20 }).notNull(),
        role: varchar("role", { length: 32 }).notNull(),
    },
    (t) => ({
        pk_guild_user_role: primaryKey({ columns: [t.guild, t.user, t.role] }),
    }),
);

export const attributes = mysqlTable(
    "attributes",
    {
        type: varchar("type", { length: 32 }).notNull(),
        id: varchar("id", { length: 32 }).notNull(),
        name: varchar("name", { length: 64 }).notNull(),
        emoji: varchar("emoji", { length: 64 }).notNull(),
    },
    (t) => ({
        pk_type_id: primaryKey({ columns: [t.type, t.id] }),
    }),
);

export const characters = mysqlTable("characters", {
    id: varchar("id", { length: 32 }).primaryKey().notNull(),
    name: varchar("name", { length: 64 }).unique().notNull(),
    short: varchar("short", { length: 32 }),
    avatar: varchar("avatar", { length: 256 }).notNull(),
});

export const characterAttributes = mysqlTable(
    "character_attribnutes",
    {
        character: varchar("character", { length: 32 }).notNull(),
        type: varchar("type", { length: 32 }).notNull(),
        value: varchar("value", { length: 32 }).notNull(),
    },
    (t) => ({
        pk_character_type: primaryKey({ columns: [t.character, t.type] }),
    }),
);
