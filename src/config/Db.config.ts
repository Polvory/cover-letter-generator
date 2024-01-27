import { DbOptions } from "../db/db.intrface"


export const getDbConfig = (): DbOptions => {
    return {
        host: String(process.env.DATABASE_HOST),
        port: Number(process.env.DATABASE_PORT),
        username: String(process.env.DATABASE_USERNAME),
        password: String(process.env.DATABASE_PASSWOD),
        database: String(process.env.DATABASE_NAME),
    }

}