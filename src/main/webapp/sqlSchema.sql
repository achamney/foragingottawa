
use foragingottawa;

CREATE TABLE `fact_foragelocations` (
  `foragelocationsKey` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `img` text,
  `latitude` decimal(7,5) DEFAULT NULL,
  `longitude` decimal(7,5) DEFAULT NULL,
  `date` varchar(15) DEFAULT NULL,
  `description` text,
  `deleteFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`foragelocationsKey`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

CREATE TABLE `fact_queries` (
  `queriesKey` int(11) NOT NULL AUTO_INCREMENT,
  `queryLabel` varchar(100) DEFAULT NULL,
  `query` varchar(8000) DEFAULT NULL,
  `deleteFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`queriesKey`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

CREATE TABLE `fact_teammembers` (
  `temmemberKey` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `userName` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `userRole` int(11) DEFAULT NULL,
  `activeFlag` int(11) DEFAULT NULL,
  `deleteFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`temmemberKey`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `fact_users` (
  `usersKey` int(10) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `createdDate` datetime DEFAULT NULL,
  `avatar` text,
  `member_title` text,
  `signature` text,
  `deleteFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`usersKey`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

CREATE TABLE `fact_users` (
  `usersKey` int(10) NOT NULL AUTO_INCREMENT,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `createdDate` varchar(20) DEFAULT NULL,
  `avatar` text,
  `member_title` text,
  `signature` text,
  `token` varchar(130),
  `deleteFlag` int(11) DEFAULT NULL,
  PRIMARY KEY (`usersKey`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

CREATE TABLE `lkup_userrole` (
  `userRoleKey` int(11) NOT NULL,
  `userRoleLabel` varchar(100) DEFAULT NULL,
  `userRoleOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`userRoleKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


    
insert into lkup_userRole values(default, 'admin');
insert into lkup_userRole values(default, 'user');
    
    