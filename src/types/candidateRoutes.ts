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

export interface IDefaultCandidateReqBody {
  candidateToken: string;
  candidateData: ICandidateTokenPayload & JwtPayload;
}

export type TGiveCompetitionReqBody = IDefaultCandidateReqBody & {
  competitionId: string;
};

export type TApplyForCompetitionReqBody = IDefaultCandidateReqBody & {
  competitionId: string;
};
