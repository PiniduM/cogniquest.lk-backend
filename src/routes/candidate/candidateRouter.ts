import { Router } from "express";
import candidateTokenValidator from "../../middlewhere/validators/candidateTokenValidator.js";
import applyForCompetition from "./apply_for_competition/applyForCompetition.js";
import giveCompetition from "./giveCompetition/giveCompetition.js";
import submitProject from "./submit_project/submitProject.js";
import projectSubmissionRequestParser from "../../middlewhere/parsers/projectSubmissionRequestParser.js";

const candidateRouter = Router();

candidateRouter.post("/give_candidate_token");

candidateRouter.use("/", candidateTokenValidator);

candidateRouter.post("/give_competition", giveCompetition);

candidateRouter.post("/apply_for_competition", applyForCompetition);

candidateRouter.post(
  "/submit_project",
  projectSubmissionRequestParser,
  submitProject
);
export default candidateRouter;
