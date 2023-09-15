import mainDBPool from "../../../../utils/mainDBPool.js";

const createSubmissionsTable  = async (competition_id: string) => {

    const sqll = `CREATE TABLE cogniquest_main.comid_${competition_id}_submissions (
        submission_id INT NOT NULL AUTO_INCREMENT,
        candidate_id INT NOT NULL,
        submisiion_time DATE NOT NULL DEFAULT CURDATE(),
        asset_path VARCHAR(200) NOT NULL,
        additional_data VARCHAR(45) NULL,
        PRIMARY KEY (submission_id),
        INDEX fk-candidate_id_idx (candidate_id ASC) VISIBLE,
        UNIQUE INDEX candidate_id_UNIQUE (candidate_id ASC) VISIBLE,
        CONSTRAINT fk-candidate_id
          FOREIGN KEY (candidate_id)
          REFERENCES cogniquest_main.candiadtes (candidate_id)
          ON DELETE NO ACTION
          ON UPDATE NO ACTION)`;

         const sql =  "CREATE TABLE `cogniquest_competitions`.`comid_" +
          competition_id +
          "_submissions` ( `submission_id` INT NOT NULL AUTO_INCREMENT, `candidate_id` INT NOT NULL, `submission_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `asset_path` VARCHAR(200) NOT NULL, `additional_data` VARCHAR(45) NULL, PRIMARY KEY (`submission_id`), INDEX `fk-candidate_id_idx` (`candidate_id` ASC) VISIBLE, UNIQUE INDEX `candidate_id_UNIQUE` (`candidate_id` ASC) VISIBLE, CONSTRAINT `fk-submissions_comid_" +competition_id +"-candidate_id` FOREIGN KEY (`candidate_id`) REFERENCES `cogniquest_main`.`candiadtes` (`candidate_id`) ON DELETE NO ACTION ON UPDATE NO ACTION);";
    await mainDBPool.query(sql);
}

export default createSubmissionsTable;