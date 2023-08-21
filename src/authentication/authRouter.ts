import { Router } from "express";
import mainDBPool from "../utils/mainDBPool.js";
import register from "./register/register.js";
import login from "./login/login.js";
import verifyEmail from "./verify_email/verifyEmali.js";

const authRouter = Router();

authRouter.post("/test", async (req,res) => {
    console.log("hello world");
    const result = await mainDBPool.query("SELECT * FROM `cogniquest_main`.`competitions`;");
    res.send(result)
})

authRouter.post("/register",register);
authRouter.post("/login",login)
authRouter.post("/verify_email",verifyEmail)

export default authRouter;