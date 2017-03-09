
use foragingottawa;
CREATE TABLE fact_boards
(
   boardsKey int PRIMARY KEY NOT NULL,
   name varchar(100),
   description longtext,
   createdDate date,
   updatedDate date,
   deleteFlag smallint
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_boards(boardsKey)
;
CREATE TABLE fact_foragelocations
(
   foragelocationsKey int PRIMARY KEY NOT NULL,
   name longtext,
   img longtext,
   latitude decimal(7,5),
   longitude decimal(7,5),
   date varchar(15),
   description longtext,
   deleteFlag int
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_foragelocations(foragelocationsKey)
;
CREATE TABLE fact_posts
(
   postsKey int PRIMARY KEY NOT NULL,
   body longtext,
   quotedPost int,
   username varchar(50),
   createdDate date,
   updatedDate date,
   deleteFlag smallint,
   thread int NOT NULL,
   title varchar(100) NOT NULL
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_posts(postsKey)
;
CREATE TABLE fact_queries
(
   queriesKey int PRIMARY KEY NOT NULL,
   queryLabel varchar(100),
   query text,
   deleteFlag int
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_queries(queriesKey)
;
CREATE TABLE fact_settings
(
   id int PRIMARY KEY NOT NULL,
   dbName longtext NOT NULL,
   dbLogin longtext NOT NULL,
   dbPassword longtext NOT NULL,
   forumPath longtext NOT NULL,
   forumName longtext NOT NULL,
   messagePerPage longtext NOT NULL
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_settings(id)
;
CREATE TABLE fact_threads
(
   threadsKey int PRIMARY KEY NOT NULL,
   name varchar(100),
   username varchar(50),
   icon int,
   views int,
   createdDate date,
   updatedDate date,
   deleteFlag smallint,
   board int NOT NULL
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_threads(threadsKey)
;
CREATE TABLE fact_users
(
   usersKey int NOT NULL,
   username varchar(50) NOT NULL,
   password longtext NOT NULL,
   email longtext NOT NULL,
   createdDate varchar(20),
   avatar longtext,
   member_title longtext,
   signature longtext,
   token varchar(130),
   deleteFlag int,
   userRole int DEFAULT 1,
   CONSTRAINT PRIMARY PRIMARY KEY (usersKey,username)
)
;
CREATE UNIQUE INDEX PRIMARY ON fact_users
(
  usersKey,
  username
)
;
CREATE UNIQUE INDEX username ON fact_users(username)
;

CREATE TABLE `lkup_userrole` (
  `userRoleKey` int(11) NOT NULL,
  `userRoleLabel` varchar(100) DEFAULT NULL,
  `userRoleOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`userRoleKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


    
insert into lkup_userRole values(default, 'admin');
insert into lkup_userRole values(default, 'user');
    
    