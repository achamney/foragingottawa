
use foragingottawa;

drop table if exists fact_boards;
create table fact_boards (boardsKey int primary key not null auto_increment,
	name varchar(100),
    description text,
    createdDate date,
    updatedDate date,
    deleteFlag smallint);
    
drop table if exists fact_threads;
create table fact_threads (threadsKey int primary key not null auto_increment,
	name varchar(100),
    user int,
    icon int, 
    views int,
    createdDate date,
    updatedDate date,
    deleteFlag smallint);
    
    
drop table if exists fact_posts;
create table fact_posts (postsKey int primary key not null auto_increment,
	body text,
    quotedPost int,
    user int,
    createdDate date,
    updatedDate date,
    deleteFlag smallint);
    
    
drop table if exists fact_users;
create table fact_users (usersKey int primary key not null auto_increment,
	username varchar(50),
    password varchar(50),
    avatarUrl varchar(200),
    location varchar (100),
    userRole int,
    createdDate date,
    updatedDate date,
    deleteFlag smallint);    
    
drop table if exists lkup_userRole;
create table fact_users (userRoleKey int primary key not null auto_increment,
	userRoleText varchar(50));
    
insert into lkup_userRole values(default, 'admin');
insert into lkup_userRole values(default, 'user');
    
    