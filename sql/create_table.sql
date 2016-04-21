
DROP TABLE IF EXISTS `mvc_sample`.`user` ;

CREATE TABLE IF NOT EXISTS `mvc_sample`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL DEFAULT '',
  `tel` VARCHAR(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `mvc_sample`.`sec_user_id` ;

CREATE TABLE IF NOT EXISTS `mvc_sample`.`sec_user_id` (
  `id` INT NOT NULL)
ENGINE = InnoDB;

INSERT INTO sec_user_id VALUES(0);


