import { Router } from "express";
import givePubliclyAvailbleCompetitions from "./give_publicly_availble_competitions/givePubliclyAvailbleCompetitions.js";
import giveCompetition from "./giveCompetition/giveCompetition.js";

const generalRouter = Router();


generalRouter.post('/give_publicly_available_competitions',givePubliclyAvailbleCompetitions)

generalRouter.post('/give_competition',giveCompetition)

export default generalRouter;