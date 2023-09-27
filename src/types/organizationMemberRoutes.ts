import { IMembership, TParsedMembershipsArray } from "./commonInterfaces.js";

export interface IParsedByValidateOrganizationMemberships {
  organizationMembershipsToken: string;
  parsedData: {
    userId: string;
    validMemberships: TParsedMembershipsArray;
  };
}
export type TGiveOrganizationMemberTokenReqBody = {
  loginToken: string;
};

export type TGiveAssociatedCompetitionsReqBody =
  IParsedByValidateOrganizationMemberships;

export type TGiveAssociatedOrganizationsReqBody =
  IParsedByValidateOrganizationMemberships;
export type TGiveCompetitionReqBody =
  IParsedByValidateOrganizationMemberships & {
    competitionId: string;
  };
