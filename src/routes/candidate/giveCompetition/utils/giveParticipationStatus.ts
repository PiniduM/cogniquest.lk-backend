import giveApplicationStatus from "./giveApplicationStatus.js";
import giveProjectSubmissionStatus from "./giveProjectSubmissionStatus.js";

const giveParticipationStatus = async (
  competitionId: string,
  candidateId: string
) => {
  const applicationStatus = await giveApplicationStatus(
    competitionId,
    candidateId
  );
  if (!applicationStatus)
    return {
      status: "not_applied",
    };

  const { approved, applidTime } = applicationStatus;
  if (approved === "N") {
    return {
      status: "application_is_waiting_for_approval",
      applidTime,
    };
  }

  const projectSubmitionStatus = await giveProjectSubmissionStatus(
    competitionId,
    candidateId
  );

  if (!projectSubmitionStatus)
    return {
      status: "waiting_for_project_submission",
      applidTime,
    };

  const { submittedTime } = projectSubmitionStatus;
  return {
    status: "project_submitted",
    applidTime,
    submittedTime,
  };

  //this format (instade of if and else) is used to avoid nested conditionals (more readerble in the long run);
};

export default giveParticipationStatus;
