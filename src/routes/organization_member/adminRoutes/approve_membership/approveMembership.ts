import { RequestHandler } from "express";
import { TApproveMembershipsBody } from "../../../../types/adminRoutes.js";
import mainDBPool from "../../../../utils/mainDBPool.js";

const approveMembership : RequestHandler = async (req,res) => {
    const {member_id,parsedData} = req.body as TApproveMembershipsBody;
    const {adminMembership} = parsedData;

    const {organization_id} = adminMembership;

    const sql = `UPDATE organization_memberships SET admin_approved='Y' WHERE member_id=? AND organization_id=?`;
    // a malecious admin may try with member_ids not related to his organization. so organization_id of admin is checked
    const values = [member_id,organization_id]

    try {
        await mainDBPool.query(sql,values); //must be updated if the user follow valid procedure
        res.status(200).json('approved');
    } catch (error) {
        console.log(error);
        res.status(500).json('unexpected error');
    }

}

export default approveMembership;