import { RowDataPacket } from "mysql2";
import mainDBPool from "../../../utils/mainDBPool.js";

const giveOrganizationId = async (competitionId: string) => {
    if(!competitionId) return undefined;
    
    const sql = 'SELECT organization_id from competitions WHERE competition_id=?'
    const values = [competitionId]
    const response= await mainDBPool.query(sql,values) as RowDataPacket;
    console.log(response);
    const result = response[0];
    return result[0]?.organization_id
}

export default giveOrganizationId;