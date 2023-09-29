import { RequestHandler } from "express";
import giveApplicationStatus from "./utils/giveApplicationStatus.js";
import giveProjectSubmissionStatus from "./utils/giveProjectSubmissionStatus.js";
import { TGiveParticipationStatusReqBody } from "../../../types/candidateRoutes.js";

const giveParticipationStatus: RequestHandler = async (req, res) => {
  const { candidateData, competitionId } =
    req.body as TGiveParticipationStatusReqBody;

  const { candidateId } = candidateData;
  const applicationStatus = await giveApplicationStatus(
    competitionId,
    candidateId
  );
  if (!applicationStatus) {
    res.status(200).json({
      participationStatus: {
        status: "not_applied",
      },
    });
    return;
  }

  const { applicationId, approved, appliedTime } = applicationStatus;
  if (approved === "N") {
    res.status(200).json({
      participationStatus: {
        status: "application_is_waiting_for_approval",
        appliedTime,
      },
    });
    return;
  }

  const projectSubmitionStatus = await giveProjectSubmissionStatus(
    competitionId,
    candidateId
  );

  if (!projectSubmitionStatus) {
    res.status(200).json({
      participationStatus: {
        applicationId,
        status: "waiting_for_project_submission",
        appliedTime,
      },
    });
    return;
  }

  const { submittedTime } = projectSubmitionStatus;
  res.status(200).json({
    participationStatus: {
      status: "project_submitted",
      appliedTime,
      submittedTime,
    },
  });

  //this format (instade of if and else) is used to avoid nested conditionals (more readerble in the long run);
};

export default giveParticipationStatus;
