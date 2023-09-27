import { IMembership } from "./commonInterfaces.js";

export interface IParsedByValidateOrganizationMembership {
    organizationMembershipsToken: string;
    organizationId: string;
    parsedData: {
      organizationMembership: IMembership;
    };
  }
  
  export type TSubmitNewCompetitionReqBody =
    IParsedByValidateOrganizationMembership & {
      competition_title: string;
      description: string;
      organization_id: string;
      accessibility: string;
    };