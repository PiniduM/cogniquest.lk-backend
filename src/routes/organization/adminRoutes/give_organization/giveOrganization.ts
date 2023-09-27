import { RequestHandler } from "express";
import { TGiveORganizationReqBody } from "../../../../types/adminRoutes.js";
import mainDBPool from "../../../../utils/mainDBPool.js";
import { RowDataPacket } from "mysql2";

const giveOrganization : RequestHandler = async (req,res) => {
    const {parsedData} = req.body as TGiveORganizationReqBody;
    const {organization_id} = parsedData.adminMembership

    const sql = `SELECT organization_id,organization_name,reference_code FROM organizations WHERE organization_id=?`
    const values = [organization_id]
    try {
        const response = await mainDBPool.query (sql,values) as RowDataPacket;
        const result = response[0];
        const row = result[0];
        res.status(200).json({organizationData: row})
    } catch (error) {
        console.log(error);
        res.status(500).json(error) // remove in production
    }
}

export default giveOrganization;