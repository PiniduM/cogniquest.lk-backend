import mainDBPool from "../../../../utils/mainDBPool.js";

const registerAdmin = async (userId: string,organizationReferenceCode: string) => {
  const sql = 
  `INSERT INTO  organization_memberships (user_id,organization_id, role, admin_approved) 
  VALUES (?,(SELECT organization_id from organizations WHERE reference_code = ?),'admin','Y');`;
  const values = [userId,organizationReferenceCode]

  mainDBPool.query(sql,values);
  // there connot be any known errors
};


export default registerAdmin;