import { Router } from "express";
import giveCompetitionssWaitingForApproval from "./giveCompetitionsWaitingForApproval/giveCompetitionsWaitingForApproval.js";
import approveCompetion from "./approve_competition/approveCompetition.js";

const adminRouter = Router();

adminRouter.post(
  "/give_competitions_waiting_for_approval",
  giveCompetitionssWaitingForApproval
);
adminRouter.post("/approve_competition", approveCompetion);

export default adminRouter;
