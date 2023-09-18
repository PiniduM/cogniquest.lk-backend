import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

import organizationMembershipsValidator from "../../middlewhere/organizationMembershipsValidator.js";
import giveAssociatedCompetitions from "./give_assiciated_competitions/giveAssociatedCompetitions.js";
import giveOrganizationMembershipsToken from "./give_organization_membershipsToken/giveOrganizationMemberShipsToken.js";
import giveAssociatedOrganizations from "./give_associated_organizations/giveAssociatedOrganizations.js";
import submitNewCompetition from "./submit_new_competition/submit_new_competition.js";
import { applicationFormExtractor } from "../../middlewhere/applicationFormExtractor.js";
import adminRouter from "./adminRoutes/adminRouter.js";
import giveCompetition from "./giveCompetition/giveCompetition.js";

const organizationMemberRouter = Router();

organizationMemberRouter.post(
  "/give_organization_memberships_token",
  giveOrganizationMembershipsToken
);

organizationMemberRouter.post(
  "/submit_new_competition",
  applicationFormExtractor,
  organizationMembershipsValidator,
  submitNewCompetition
);

organizationMemberRouter.use("/", organizationMembershipsValidator); //validate host and extract userId
organizationMemberRouter.post(
  "/give_associated_competitions",
  giveAssociatedCompetitions
);
organizationMemberRouter.post(
  "/give_associated_organizations",
  giveAssociatedOrganizations
);
organizationMemberRouter.post("/give_competition", giveCompetition);

organizationMemberRouter.use("/admin", adminRouter);

export default organizationMemberRouter;
