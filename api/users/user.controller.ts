import { compareSync, genSaltSync, hashSync } from "bcrypt"
import { sign } from "jsonwebtoken"
import User from "./user.interface"
import UserService from "./user.service"

export default class UserController {

    public userService = new UserService()

    createUser = (req: any, res: any) => {
        const body: User = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        this.userService.createUser(body, (err: any, results: any) => {
            err ? res.status(500).json({
                success: 0,
                message: "Database Connection Error"
            }) : res.status(200).json({
                success: 1,
                data: results
            })
        })
    }

    getUserById = (req: any, res: any) => {
        const id = req.params.id
        this.userService.getUserById(id, (err: any, results: any) => {
            err ? console.log(err) : !results ? res.json({
                success: 0,
                message: "Record Not Found"
            }) : res.json({
                success: 1,
                data: results
            })
        })
    }

    getUsers = (req: any, res: any) => {
        this.userService.getUsers((err: any, results: any) => {
            err ? console.log(err) : res.json({
                success: 1,
                data: results
            })
        })
    }

    updateUser = (req: any, res: any) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        this.userService.updateUser(body, (err: any, results: any) => {
            err ? console.log(err) : res.json({
                success: 1,
                message: "Update Successfully"
            })
        })
    }

    deleteUser = (req: any, res: any) => {
        const id = req.body.id
        this.userService.deleteUser(id, (err: any, results: any) => {
            err ? console.log(err) : res.json({
                success: 1,
                message: "User Delete Succesfully"
            })
        })
    }

    login = (req: any, res: any) => {
        const body: any = req.body
        this.userService.getUserByEmail(body.email, (err: any, results: any) => {

            if(err){
                console.log(err)
            }

            if(!results){
                return res.json({
                    success: 1,
                    message: "Email salah"
                })
            }

            const result: any = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined
                const jtw = sign({ result: results }, "secret", {
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "Login Succesfully",
                    token: jtw
                })
            }else{
                return res.json({
                    success: 1,
                    message: "Login Failed"
                })
            }
        })
    }
}