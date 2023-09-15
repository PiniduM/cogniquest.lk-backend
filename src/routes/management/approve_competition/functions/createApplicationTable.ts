import mainDBPool from "../../../../utils/mainDBPool.js";

const createApplicationTable = async (competition_id: string) => {
  const sql =
    "CREATE TABLE `cogniquest_competitions`.`comid_" +
    competition_id +
    "_applications` ( `application_id` INT NOT NULL AUTO_INCREMENT, `candidate_id` INT NOT NULL, `applied_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `additional_data` VARCHAR(45) NULL, PRIMARY KEY (`application_id`), INDEX `fk-candidate_id_idx` (`candidate_id` ASC) VISIBLE, UNIQUE INDEX `candidate_id_UNIQUE` (`candidate_id` ASC) VISIBLE, CONSTRAINT `fk-applications_comid_"+ competition_id+ "-candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `cogniquest_main`.`candiadtes` (`candidate_id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
      //backtics are compulsary for foreign keys
  await mainDBPool.query(sql);
};

export default createApplicationTable;
