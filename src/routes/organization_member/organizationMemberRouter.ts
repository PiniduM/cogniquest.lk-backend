import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

import giveAssociatedCompetitions from "./give_assiciated_competitions/giveAssociatedCompetitions.js";
import giveOrganizationMembershipsToken from "./give_organization_membershipsToken/giveOrganizationMemberShipsToken.js";
import giveAssociatedOrganizations from "./give_associated_organizations/giveAssociatedOrganizations.js";
import giveCompetition from "./giveCompetition/giveCompetition.js";
import organizationMembershipsValidator from "../../middlewhere/validators/organizationMembershipsValidator.js";

const organizationMemberRouter = Router();

organizationMemberRouter.post(
  "/give_organization_memberships_token",
  giveOrganizationMembershipsToken
);

organizationMemberRouter.use("/", organizationMembershipsValidator);
organizationMemberRouter.post(
  "/give_competition",

  giveCompetition
);

organizationMemberRouter.post(
  "/give_associated_organizations",

  giveAssociatedOrganizations
);
organizationMemberRouter.post(
  "/give_associated_competitions",

  giveAssociatedCompetitions
);
export default organizationMemberRouter;
