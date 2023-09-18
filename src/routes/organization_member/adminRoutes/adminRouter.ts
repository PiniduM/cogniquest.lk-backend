import { Router } from "express";
import giveCompetitionssWaitingForApproval from "./give_competitions_waiting_for_approval/giveCompetitionsWaitingForApproval.js";
import approveCompetion from "./approve_competition/approveCompetition.js";
import adminMembershipsValidator from "../../../middlewhere/adminMembershipValidator.js";
import giveMembershipsWaitingForApproval from "./give_memberships_waiting_for_approval/giveMembershipsWaitingForApproval.js";
import giveOrganization from "./give_organization/giveOrganization.js";
import approveMembership from "./approve_membership/approveMembership.js";

const adminRouter = Router();

adminRouter.post(
  "/give_competitions_waiting_for_approval",
  giveCompetitionssWaitingForApproval
);
adminRouter.post("/approve_competition", approveCompetion);
// modify above two and set after the validator - these two developped before validator.

adminRouter.use(adminMembershipsValidator);

adminRouter.post("/give_organization", giveOrganization);
adminRouter.post(
  "/give_memberships_waiting_for_approval",
  giveMembershipsWaitingForApproval
  );
adminRouter.post("/approve_membership",approveMembership);

export default adminRouter;
