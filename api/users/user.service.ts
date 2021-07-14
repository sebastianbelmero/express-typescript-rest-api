import Database from "../../config/database"
import User from "./user.interface"

export default class UserService {

    private database = new Database()
    private conn = this.database.conn

    createUser = (data: User, callback: any) => {
        this.conn.query(
            `INSERT INTO users(nama, email, password) VALUES (?, ?, ?)`,
            [
                data.nama,
                data.email,
                data.password
            ], (err: any, results: any, field: any) => {
                err ? callback(err) : callback(null, results)
            }
        )
    }

    getUsers = (callback: any) => {
        this.conn.query(
            `SELECT * FROM users`,
            [],
            (err: any, results: any, fields: any) => {
                err ? callback(err) : callback(null, results)
            }
        )
    }

    getUserById = (id: number, callback: any) => {
        this.conn.query(
            `SELECT * FROM users WHERE id = ?`,
            [id],
            (err: any, results: any, fields: any) => {
                err ? callback(err) : callback(null, results[0])
            }
        )
    }

    updateUser = (data: User, callback: any) => {
        this.conn.query(
            `UPDATE users SET nama = ?, email = ?, password = ? WHERE id = ?`,
            [data.nama, data.email, data.password, data.id],
            (err: any, results: any, fields: any) => {
                err ? callback(err) : callback(null, results[0])
            }
        )
    }

    deleteUser = (id: number, callback: any) => {
        this.conn.query(
            `DELETE FROM users WHERE id = ?`,
            [id],
            (err: any, results: any, fields: any) => {
                err ? callback(err) : callback(null, results[0])
            }
        )
    }

    getUserByEmail = (email: string, callback: any) => {
        this.conn.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (err: any, results: any, fields: any) => {
                err ? callback(err) : callback(null, results[0])
            }
        )
    }
}