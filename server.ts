import App from "./app";
import UserRouter from "./api/users/user.router";

import dotenv from "dotenv"

const userRouter = new UserRouter()

dotenv.config()

const port: any = process.env.APP_PORT

const app = new App([
    userRouter
], port);
app.listen()