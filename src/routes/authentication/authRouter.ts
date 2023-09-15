import { Router } from "express";
import mainDBPool from "../../utils/mainDBPool.js";
import registerUser from "./register_user/registerUser.js";
import login from "./login/login.js";
import verifyEmail from "./verify_email/verifyEmali.js";
import registerOrganization from "./register_organization/registerOrganization.js";
import loginValidator from "../../middlewhere/loginValidator.js";
import setupOrganizationMembership from "./setup_organization_membership/setupOrganizationMembership.js";
import setupCandidateAccount from "./setup_candidate_account/setupCandidateAccount.js";

const authRouter = Router();

authRouter.post("/test", async (req, res) => {
  console.log("hello world");
  const result = await mainDBPool.query(
    "SELECT * FROM `cogniquest_main`.`competitions`;"
  );
  res.send(result);
});

authRouter.post("/register_user", registerUser);
authRouter.post("/login", login);
authRouter.post("/verify_email", verifyEmail);

//protected routes

//validate and set userdata
authRouter.use("/", loginValidator);

authRouter.post("/setup_candidate_account",setupCandidateAccount);

authRouter.post("/register_organization", registerOrganization);
authRouter.post('/setup_hosting_staff_account',setupOrganizationMembership);

export default authRouter;
