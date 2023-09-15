import { Router } from "express";
import giveManagementToken from "./give_management_token/giveManagementToken.js";
import validateManagementRequest from "../../middlewhere/validatemanagementRequest.js";
import giveCompetitionssWaitingForApproval from "./give_competitions_waiting_for_approval/giveCompetitionsWaitingForApproval.js";
import approveCompetion from "./approve_competition/approveCompetition.js";

const managementRouter = Router();

managementRouter.post("/give_management_token", giveManagementToken);

managementRouter.use("/", validateManagementRequest);

managementRouter.post(
  "/give_competitions_waiting_for_approval",
  giveCompetitionssWaitingForApproval
);
managementRouter.post("/approve_competition", approveCompetion);

export default managementRouter;
