CREATE DATABASE WIN;

use WIN;

CREATE SCHEMA users;

create table users.buyer(
buyer_id int NOT NULL IDENTITY PRIMARY KEY,
age int NOT NULL,
photoName varchar (50) NOT NULL,
gender varchar (20) NOT NULL,
userName varchar (50) NOT NULL UNIQUE,
phone varchar (20) NOT NULL UNIQUE,
user_role varchar (20) NOT NULL ,
email varchar (100) NOT NULL UNIQUE,
job varchar (100) NOT NULL,
);


create table users.renter(
renter_id int NOT NULL IDENTITY PRIMARY KEY,
age int NOT NULL,
photoName varchar (50) NOT NULL,
gender varchar (20) NOT NULL,
userName varchar (50) NOT NULL UNIQUE,
phone varchar (20) NOT NULL UNIQUE,
user_role varchar (20) NOT NULL ,
email varchar (100) NOT NULL UNIQUE,
job varchar (100) NOT NULL,
);


create table users.room(
room_id int NOT NULL IDENTITY PRIMARY KEY,
min_range int NOT NULL,
max_range int NOT NULL,
gender varchar (20) NOT NULL,
room_status varchar (100) NOT NULL,
room_location varchar (100) NOT NULL,
Avaliable_From date NOT NULL,
renter_id int NOT NULL,
CONSTRAINT renter_id FOREIGN KEY (renter_id) REFERENCES  users.renter(renter_id),
);


create table users.room_photosNames(
photoName varchar(100) NOT NULL,
room_id int NOT NULL ,
CONSTRAINT room_id FOREIGN KEY (room_id) REFERENCES  users.room(room_id),
);


create table users.request(
request_id int NOT NULL IDENTITY PRIMARY KEY,
buyer_id int NOT NULL ,
renterId int NOT NULL ,
roomId int NOT NULL ,
request_status varchar (100) NOT NULL ,
CONSTRAINT renterId FOREIGN KEY (renterId) REFERENCES  users.renter(renter_id),
CONSTRAINT buyer_id FOREIGN KEY (buyer_id) REFERENCES  users.buyer(buyer_id),
CONSTRAINT roomId FOREIGN KEY (roomId) REFERENCES  users.room(room_id),
);