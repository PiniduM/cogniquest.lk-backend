import mainDBPool from "../../../utils/mainDBPool.js";

const updateUserAcccountType = (userId: string) => {
  const sql = `
    UPDATE users
    SET account_type = 'host'
    WHERE user_id = ?;`;
  const values = [userId];

  mainDBPool.query(sql, values);
  //no posibility to encounter errors
};

export default updateUserAcccountType;
