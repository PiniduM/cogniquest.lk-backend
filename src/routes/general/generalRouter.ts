import { Router } from "express";
import givePubliclyAvailbleCompetitions from "./give_publicly_availble_competitions/givePubliclyAvailbleCompetitions.js";

const generalRouter = Router();


generalRouter.post('/give_publicly_available_competitions',givePubliclyAvailbleCompetitions)

export default generalRouter;