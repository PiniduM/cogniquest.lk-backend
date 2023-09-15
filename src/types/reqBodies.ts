import {
  IOrganizationMembershipsPayload,
  TParsedMembershipsArray,
} from "./commonInterfaces.js";

export type TcandidateRegistrationData = {
  type: string;
  gmail: string;
  username: string;
  password: string;
  phoneNumber: string;
  fullName: string;
  birthDate: string;
  occupation: string;
};
export type ThostRegistrationData = {
  type: string;
  email: string;
  username: string;
  password: string;
  organization: string;
  role: string;
  fullName: string;
  phoneNumber: string;
  country: string;
};

export type TloginData = {
  type: string;
  identifier: string;
  password: string;
};

export interface decryptedLoginToken {
  email: string;
  user_id: string;
  username: string;
  account_type: string;
}

export type TOrganizationRegistrationData = {
  organizationName: string;
  email: string;
  phoneNumber: string;
  address: string;
  organizationType: string;
  referencePrefix: string;
};
export type TRegisterOrganizationReqBody = {
  orgRegistrationData: TOrganizationRegistrationData;
  loginToken: string;
  userData?: decryptedLoginToken;
};

export type TCandidateAccountSetupData = {
  birthdate: string;
  occupation: string;
};
export type TSetupCandidateAccountReqBody = {
  candidateAccountSetupData: TCandidateAccountSetupData;
  loginToken: string;
  userData?: decryptedLoginToken;
};

export type THosingStaffAccoundSetupData = {
  referenceCode: string;
  role: string;
};
export type TSetupHostingStaffAccountReqBody = {
  hostingStaffAccountSetupData: THosingStaffAccoundSetupData;
  loginToken: string;
  userData?: decryptedLoginToken;
};

// hosting_staff specifics
export type TGiveOrganizationMemberToken = {
  loginToken: string;
};

export type TGiveAssociatedOrganizations = {
  associatedOrganizationIds: string[];
};

export type TGiveAssociatedCompetitions = {
  org_membership_token: string;
  userData: {
    user_id: string;
    valid_memberships: TParsedMembershipsArray;
  };
};

export type TGiveCompetitionsWaitingForApproval = {
  org_membership_token: string;
  userData: {
    user_id: string;
    valid_memberships: TParsedMembershipsArray;
  };
};

export type TSubmitNewCompetition = {
  competition_title: string;
  description: string;
  organization_id: string;
  accessibility: string;
  organizationMembershipsToken: string;
  userData: {
    user_id: string;
    valid_memberships: TParsedMembershipsArray;
  };
};

export type TGiveCompetition = {
  competition_id: string;
  organizationMembershipsToken: string;
  userData: {
    user_id: string;
    valid_memberships: TParsedMembershipsArray;
  };
};
export type TApproveCompetition = {
  competition_id: string;
  organizationMembershipsToken: string;
  userData: {
    user_id: string;
    valid_memberships: TParsedMembershipsArray;
  };
};