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

export interface IOrganizationMemberDefaults {
  organizationMembershipsToken: string;
  parsedData: {
    userId: string;
    validMemberships: TParsedMembershipsArray;
  };
}

export type TGiveAssociatedOrganizations = IOrganizationMemberDefaults

export type TGiveAssociatedCompetitions = IOrganizationMemberDefaults;

export type TGiveCompetitionsWaitingForApproval = IOrganizationMemberDefaults
export type TSubmitNewCompetition = IOrganizationMemberDefaults & {
  competition_title: string;
  description: string;
  organization_id: string;
  accessibility: string;

};

export type TGiveCompetition = IOrganizationMemberDefaults & {
  competition_id: string;
};

export type TApproveCompetition = IOrganizationMemberDefaults & {
  competition_id: string;
};
