import { IMembership } from "./commonInterfaces.js";

export interface IParsedByValidateOrganizationMembership {
  organizationMembershipsToken: string;
  organizationId: string;
  parsedData: {
    relevantMembership: IMembership;
  };
}

export type TSubmitNewCompetitionReqBody =
  IParsedByValidateOrganizationMembership & {
    competitionTitle: string;
    description: string;
    accessibilityObject: { type: string; [key: string]: string };
    applicationFormPresent: boolean;
  };
