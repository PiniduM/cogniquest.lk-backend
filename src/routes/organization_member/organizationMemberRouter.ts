import { Router } from "express";
import organizationMemberValidator from "../../middlewhere/organizationMemberValidator.js";
import giveAssociatedCompetitions from "./give_assiciated_competitions/giveAssociatedCompetitions.js";
import giveOrganizationMemberToken from "./give_organization_member_token/giveOrganizationMemberToken.js";

const organizationMemberRouter = Router();




organizationMemberRouter.post('/give_organization_member_token',giveOrganizationMemberToken);


organizationMemberRouter.use('/',organizationMemberValidator)//validate host and extract userId
organizationMemberRouter.post('/give_associated_competitions',giveAssociatedCompetitions)

export default organizationMemberRouter;