import { Router } from "express";
import giveCompetitionsWaitingForApproval from "./give_competitions_waiting_for_approval/giveCompetitionsWaitingForApproval.js";
import approveCompetion from "./approve_competition/approveCompetition.js";
import adminMembershipsValidator from "../../../middlewhere/validators/adminMembershipValidator.js";
import giveMembershipsWaitingForApproval from "./give_memberships_waiting_for_approval/giveMembershipsWaitingForApproval.js";
import giveOrganization from "./give_organization/giveOrganization.js";
import approveMembership from "./approve_membership/approveMembership.js";

const adminRouter = Router();

adminRouter.use(adminMembershipsValidator);

adminRouter.post("/approve_competition", approveCompetion);

adminRouter.post(
  "/give_competitions_waiting_for_approval",
  giveCompetitionsWaitingForApproval
);

adminRouter.post("/give_organization", giveOrganization);
adminRouter.post(
  "/give_memberships_waiting_for_approval",
  giveMembershipsWaitingForApproval
  );
adminRouter.post("/approve_membership",approveMembership);

export default adminRouter;
