import { Config } from "drizzle-kit";

export default {
    schema: "./src/db-schemas.ts",
    out: "./drizzle",
    driver: "mysql2",
    dbCredentials: {
        host: process.env.DATABASE_HOST!,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME!,
    },
} satisfies Config;
