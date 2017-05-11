
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
    
    update fact_queries set query = '
select usersKey as id, username, email, createdDate, avatar, member_title, userRole from foragingottawa.fact_users where userRole = 1 and (deleteFlag is null or deleteFlag = 0);
'
where queryLabel = 'getAllUsers';


update fact_queries set query = '
select * from fact_forageLocations where deleteFlag is null or deleteFlag = 0
'
where queryLabel = 'getForageLocations';

update fact_queries set query = 
'
select speciesKey as id, speciesLabel as label, commonName as commonName, speciesOrder as "order" from lkup_species where concat(COALESCE(speciesLabel,\'\'),\' \',COALESCE(commonName,\'\')) like ?
'
where queriesKey =15;
update fact_queries set query = '
select teamMembersKey as id, \'teamMember\' as form,firstName as "First Name", lastName as "Last Name", userName as "User Name", email as "Email" from fact_teamMembers	0
'
where queriesKey = 5;
update fact_queries set query = '
SELECT * FROM FACT_teamMembers %WHERECLAUSE%	
'
where queriesKey = 6;
update fact_queries set query = 
'select t.name, t.createdDate, t.threadsKey as id,
 		(select c.body from fact_threads as a 
 			left join fact_boards as b on a.board = b.boardsKey
 			left join fact_posts as c on c.thread = a.threadsKey 
 			   where t.threadsKey = c.thread
 			order by c.postsKey asc
 			limit 1) as body, 
 		(select count(*)-1 from fact_threads as a 
 			left join fact_boards as b on a.board = b.boardsKey
 			left join fact_posts as c on c.thread = a.threadsKey 
 			   where t.threadsKey = c.thread and (c.deleteFlag is null or c.deleteFlag = 0)) as comments
 from fact_threads t 
 where (t.deleteFlag is null or t.deleteFlag = 0) and t.board=2
 order by t.threadsKey desc'

where queriesKey = 7;
update fact_queries set query = '
select * from fact_users inner join lkup_userrole on userRoleKey = userRole %WHERECLAUSE% and userRoleLabel like \'Admin\' 
'
where queriesKey = 8;
update fact_queries set query = '
SELECT boardsKey,/n  	name, /n  	description,/n  	(select count(*) from fact_threads as a left join fact_boards as b /n  		on a.board = b.boardsKey/n          where boards.boardsKey = b.boardsKey and (a.deleteFlag is null or a.deleteFlag = 0) ) as threads,/n  	(select count(*) from fact_threads as a /n  		left join fact_boards as b on a.board = b.boardsKey/n  		left join fact_posts as c on c.thread = a.threadsKey/n          where boards.boardsKey = b.boardsKey and (a.deleteFlag is null or a.deleteFlag = 0) and (c.deleteFlag is null or c.deleteFlag = 0)) as posts,/n  	(select a.name from fact_threads as a /n  		left join fact_boards as b on a.board = b.boardsKey/n  		left join fact_posts as c on c.thread = a.threadsKey /n          where boards.boardsKey = b.boardsKey and (a.deleteFlag is null or a.deleteFlag = 0)/n  		order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc/n  		limit 1) as latestThread,/n  	(select c.postsKey from fact_threads as a /n  		left join fact_boards as b on a.board = b.boardsKey/n  		left join fact_posts as c on c.thread = a.threadsKey /n          where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)/n  		order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc/n  		limit 1) as latestPostId,/n  	(select c.thread from fact_threads as a /n  		left join fact_boards as b on a.board = b.boardsKey/n  		left join fact_posts as c on c.thread = a.threadsKey /n          where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)/n  		order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc/n  		limit 1) as latestThreadId,/n  	(select c.createdDate from fact_threads as a /n  		left join fact_boards as b on a.board = b.boardsKey/n  		left join fact_posts as c on c.thread = a.threadsKey /n          where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)/n  		order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc/n  		limit 1) as latestThreadDate,/n  	(select c.username from fact_threads as a /n  		left join fact_boards as b on a.board = b.boardsKey/n  		left join fact_posts as c on c.thread = a.threadsKey /n          where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)/n  		order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc/n  		limit 1) as latestThreadUser/n    FROM fact_boards as boards;	
'
where queriesKey = 9;
update fact_queries set query = '
SELECT threads.name, threads.threadsKey, threads.views,/n       	(select count(*)-1 from fact_posts as p /n       		where threads.threadsKey = p.thread and (p.deleteFlag is null or p.deleteFlag = 0)) as replies,/n       	(select a.username from fact_posts as a /n       		where threads.threadsKey = a.thread/n       		order by STR_TO_DATE(a.createdDate, \'%Y-%m-%d\') desc/n       		limit 1) as replyUser,/n       	(select a.createdDate from fact_posts as a /n       		where threads.threadsKey = a.thread/n       		order by STR_TO_DATE(a.createdDate, \'%Y-%m-%d\') desc/n       		limit 1) as replyDate,/n       	(select a.postsKey from fact_posts as a /n       		where threads.threadsKey = a.thread/n       		order by STR_TO_DATE(a.createdDate, \'%Y-%m-%d\') desc/n       		limit 1) as replyKey,/n     	  board,/n         fact_boards.name as "boardName"/n         FROM fact_threads as threads/n         INNER JOIN fact_boards on boardsKey = board/n         WHERE boardsKey = ? and (threads.deleteFlag is null or threads.deleteFlag = 0)	
'
where queriesKey = 10;
update fact_queries set query = '
SELECT p.postsKey, t.name as title, body, p.createdDate, p.username, threadsKey, b.name as boardName, b.boardsKey/n      FROM fact_threads as t /n      inner join fact_posts as p on p.thread = t.threadsKey/n      inner join fact_boards as b on t.board = b.boardsKey/n      where threadsKey = ? and (p.deleteFlag is null or p.deleteFlag = 0)	
'
where queriesKey = 11;
update fact_queries set query = '
select 1 as beat from fact_users where token=?	
'
where queriesKey = 12;
update fact_queries set query = '
select threads.name, threads.threadsKey, threads.views,/n       	(select count(*)-1 from fact_posts as p /n       		where threads.threadsKey = p.thread and (p.deleteFlag is null or p.deleteFlag = 0)) as replies,/n       	(select a.username from fact_posts as a /n       		where threads.threadsKey = a.thread and (a.deleteFlag is null or a.deleteFlag = 0)/n       		order by a.postsKey desc/n       		limit 1) as replyUser,/n       	(select a.createdDate from fact_posts as a /n       		where threads.threadsKey = a.thread and (a.deleteFlag is null or a.deleteFlag = 0)/n       		order by a.postsKey desc/n       		limit 1) as replyDate,/n       	(select a.postsKey from fact_posts as a /n       		where threads.threadsKey = a.thread and (a.deleteFlag is null or a.deleteFlag = 0)/n       		order by a.postsKey desc/n       		limit 1) as replyKey,/n     	  board,/n         boards.name as "boardName"/n	from fact_threads threads/n	left join fact_posts posts on posts.thread = threads.threadsKey/n	left join fact_boards boards on threads.board = boards.boardsKey/n	where (threads.deleteFlag is null or threads.deleteFlag = 0) and (posts.deleteFlag is null or posts.deleteFlag = 0)/n	group by threads.threadsKey/n	order by replyKey desc	
'
where queriesKey = 13;


update fact_queries set query = '
SELECT threads.name, threads.threadsKey, threads.views,
      	(select count(*)-1 from fact_posts as p 
        where threads.threadsKey = p.thread and (p.deleteFlag is null or p.deleteFlag = 0)) as replies,
       	(select a.username from fact_posts as a 
        where threads.threadsKey = a.thread
        order by STR_TO_DATE(a.createdDate, \'%Y-%m-%d\') desc
        limit 1) as replyUser,      	(select a.createdDate from fact_posts as a
        where threads.threadsKey = a.thread
        order by STR_TO_DATE(a.createdDate, \'%Y-%m-%d\') desc
        limit 1) as replyDate,
      	(select a.postsKey from fact_posts as a 
        where threads.threadsKey = a.thread
        order by STR_TO_DATE(a.createdDate, \'%Y-%m-%d\') desc
        limit 1) as replyKey,
        board,
        fact_boards.name as "boardName"
        FROM fact_threads as threads
        INNER JOIN fact_boards on boardsKey = board
        WHERE boardsKey = ? and (threads.deleteFlag is null or threads.deleteFlag = 0)	
'
where queryLabel = 'getThreads';
        
update fact_queries set query = '
 SELECT boardsKey,
	 name, 
	 description,
     (select count(*) from fact_threads as a left join fact_boards as b 
     on a.board = b.boardsKey
     where boards.boardsKey = b.boardsKey and (a.deleteFlag is null or a.deleteFlag = 0) ) as threads,
     (select count(*) from fact_threads as a
     left join fact_boards as b on a.board = b.boardsKey
     left join fact_posts as c on c.thread = a.threadsKey
     where boards.boardsKey = b.boardsKey and (a.deleteFlag is null or a.deleteFlag = 0) and (c.deleteFlag is null or c.deleteFlag = 0)) as posts,
     (select a.name from fact_threads as a 
     left join fact_boards as b on a.board = b.boardsKey
     left join fact_posts as c on c.thread = a.threadsKey 
     where boards.boardsKey = b.boardsKey and (a.deleteFlag is null or a.deleteFlag = 0)
     order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc
     limit 1) as latestThread,
     (select c.postsKey from fact_threads as a 
     left join fact_boards as b on a.board = b.boardsKey
     left join fact_posts as c on c.thread = a.threadsKey 
     where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)
     order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc
     limit 1) as latestPostId,
     (select c.thread from fact_threads as a 
     left join fact_boards as b on a.board = b.boardsKey
     left join fact_posts as c on c.thread = a.threadsKey 
     where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)
     order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc
     limit 1) as latestThreadId,
     (select c.createdDate from fact_threads as a 
     left join fact_boards as b on a.board = b.boardsKey
     left join fact_posts as c on c.thread = a.threadsKey 
     where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)
     order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc
     limit 1) as latestThreadDate,
     (select c.username from fact_threads as a
     left join fact_boards as b on a.board = b.boardsKey
     left join fact_posts as c on c.thread = a.threadsKey 
     where boards.boardsKey = b.boardsKey and (c.deleteFlag is null or c.deleteFlag = 0)
     order by STR_TO_DATE(c.createdDate, \'%Y-%m-%d\') desc
     limit 1) as latestThreadUser
FROM fact_boards as boards;	
'
where queryLabel = 'getBoards';


update fact_queries set query = '
SELECT p.postsKey, t.name as title, body, p.createdDate, p.username, threadsKey, b.name as boardName, b.boardsKey
      FROM fact_threads as t 
      inner join fact_posts as p on p.thread = t.threadsKey
      inner join fact_boards as b on t.board = b.boardsKey
      where threadsKey = ? and (p.deleteFlag is null or p.deleteFlag = 0)	
 '
 where queryLabel='getPosts'