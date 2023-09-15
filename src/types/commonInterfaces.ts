export interface ILoginPayload {
  email: string;
  user_id: string;
  username: string;
  account_type: string;
  [key: string]: string;
}

export interface IOrganizationMembershipsPayload {
  user_id: string;
  memberships: string;
  [key: string]: string;
}

export interface IMembership {
  member_id: string;
  role: string;
  organization_id: string;
  admin_approved: "N" | "Y";
  system_verified: "Y" | "Y";
}

export type TParsedMembershipsArray =  IMembership[]
