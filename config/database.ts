import { createConnection } from 'mysql'
import dotenv from "dotenv"

export default class Database {

    dotenv = dotenv.config()
    conn = createConnection({
        port: 3306,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
}
