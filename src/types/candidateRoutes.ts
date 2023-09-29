import { JwtPayload } from "jsonwebtoken";

export interface ICandidateTokenPayload {
  userId: string;
  username: string;
  fullName: string;
  country: string;
  candidateId: string;
  birthdate: string;
  occupation: string;
}

export interface IParsedByCandidateTokenValidator {
  candidateToken: string;
  candidateData: ICandidateTokenPayload & JwtPayload;
}

export type TGiveCompetitionReqBody = IParsedByCandidateTokenValidator & {
  competitionId: string;
};

export type TApplyForCompetitionReqBody = IParsedByCandidateTokenValidator & {
  competitionId: string;
};
export type TGiveParticipationStatusReqBody = IParsedByCandidateTokenValidator & {
  competitionId: string;
};

export type TSubmitProjectReqBody = IParsedByCandidateTokenValidator & {
  applicationId: string;
};
