import express from 'express'
import TokenValidation from '../../auth/token_validation'
import UserController from './user.controller'


export default class UserRouter {

    public path = "/users"
    public router = express.Router()
    public userController = new UserController()
    public auth = new TokenValidation()


    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get("/", this.auth.checkToken, this.userController.getUsers)
        this.router.post("/", this.auth.checkToken, this.userController.createUser)
        this.router.get("/:id", this.auth.checkToken, this.userController.getUserById)
        this.router.patch("/", this.auth.checkToken, this.userController.updateUser)
        this.router.delete("/", this.auth.checkToken, this.userController.deleteUser)
        this.router.post("/login", this.userController.login)
    }

}