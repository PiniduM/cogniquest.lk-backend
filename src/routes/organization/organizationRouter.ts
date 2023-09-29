import { Router } from "express";
import organizationMembershipValidator from "../../middlewhere/validators/organizationMembershipValidator.js";
import submitNewCompetition from "./submit_new_competition/submit_new_competition.js";
import adminRouter from "./adminRoutes/adminRouter.js";

const organizationRouter = Router();

organizationRouter.use("/", organizationMembershipValidator);

organizationRouter.post("/submit_new_competition", submitNewCompetition);

organizationRouter.use("/admin", adminRouter);

export default organizationRouter;
