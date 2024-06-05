import { config } from "dotenv";

config();

export const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } =
    process.env;
