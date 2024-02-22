import { drizzle } from "drizzle-orm/planetscale-serverless";
import connection from "./connection.js";
import { tables } from "./index.js";

export default drizzle(connection, { schema: tables });
