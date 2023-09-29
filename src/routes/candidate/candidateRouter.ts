import { Router } from "express";
import candidateTokenValidator from "../../middlewhere/validators/candidateTokenValidator.js";
import applyForCompetition from "./apply_for_competition/applyForCompetition.js";
import giveCompetition from "./giveCompetition/giveCompetition.js";
import submitProject from "./submit_project/submitProject.js";
import giveParticipationStatus from "./giveApplicationStatus/giveParticipationStatus.js";
import giveCandidateToken from "./give_candidate_token/giveCandidateToken.js";

const candidateRouter = Router();

candidateRouter.post("/give_candidate_token", giveCandidateToken);

candidateRouter.use("/", candidateTokenValidator);

candidateRouter.post("/give_competition", giveCompetition);

candidateRouter.post("/apply_for_competition", applyForCompetition);

candidateRouter.post("/give_participation_status", giveParticipationStatus);
candidateRouter.post("/submit_project", submitProject);
export default candidateRouter;
