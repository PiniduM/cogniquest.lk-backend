import { IMembership, TParsedMembershipsArray } from "./commonInterfaces.js";

export interface IOrganizationAdminDefaults {
  organizationMembershipsToken: string;
  parsedData: {
    userId: string;
    validMemberships: TParsedMembershipsArray;
    adminMembership: IMembership;
  };
  organizationId: string;
}
export type TGiveORganizationBody = IOrganizationAdminDefaults;

export type TApproveMembershipsBody = IOrganizationAdminDefaults & {
  member_id: string;
};
export type TGiveCompetitionsWaitingForApprovalBody = IOrganizationAdminDefaults;

export type TApproveCompetition = IOrganizationAdminDefaults & {
  competitionId: string;
};
