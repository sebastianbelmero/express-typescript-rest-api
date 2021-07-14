import { verify } from "jsonwebtoken"

export default class TokenValidation {
    checkToken = (req: any, res: any, next: any) => {
        let token = req.get("authorization")
        if (token) {
            token = token.slice(7)
            verify(token, "secret", (err: any, decode: any) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    })
                }else{
                    next()
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access Denied! Unauthorized User"
            })
        }
    }
}
