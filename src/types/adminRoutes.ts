import { IMembership, TParsedMembershipsArray } from "./commonInterfaces.js";

export interface IParsedByAdminMembershipValidator {
  organizationMembershipsToken: string;
  organizationId: string;
  parsedData: {
    organizationMembership: IMembership;
  };
}
export type TGiveORganizationReqBody = IParsedByAdminMembershipValidator;

export type TApproveMembershipsReqBody = IParsedByAdminMembershipValidator & {
  member_id: string;
};
export type TGiveCompetitionsWaitingForApprovalReqBody =
  IParsedByAdminMembershipValidator;

export type TApproveCompetitionReqBody = IParsedByAdminMembershipValidator & {
  competitionId: string;
};
