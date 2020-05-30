CREATE DATABASE WIN;

use WIN;
CREATE SCHEMA users;
GO
CREATE TABLE users.buyer(
buyerId int NOT NULL IDENTITY PRIMARY KEY,
age int NOT NULL,
photoName varchar (50) NOT NULL,
gender varchar (20) NOT NULL,
userName varchar (50) NOT NULL UNIQUE,
phone varchar (20) NOT NULL ,
userRole varchar (20) NOT NULL ,
email varchar (100) NOT NULL ,
job varchar (100) NOT NULL,
password varchar (100) ,
);


CREATE TABLE users.renter(
renterId int NOT NULL IDENTITY PRIMARY KEY,
age int NOT NULL,
photoName varchar (50) NOT NULL,
gender varchar (20) NOT NULL,
userName varchar (50) NOT NULL UNIQUE,
phone varchar (20) NOT NULL ,
userRole varchar (20) NOT NULL ,
email varchar (100) NOT NULL ,
job varchar (100) NOT NULL,
password varchar (100) ,
);


CREATE TABLE users.room(
roomId int NOT NULL IDENTITY PRIMARY KEY,
minRange int NOT NULL,
maxRange int NOT NULL,
roomType varchar (20) NOT NULL,
roomLocation varchar (100) NOT NULL,
furnitureStatus varchar (20) NOT NULL, 
avaliableFrom date NOT NULL,
renterId int NOT NULL,
CONSTRAINT renterId FOREIGN KEY (renterId) REFERENCES  users.renter(renterId),
);


CREATE TABLE users.room_photosNames(
photoName varchar(100) NOT NULL,
roomId int NOT NULL ,
CONSTRAINT roomId FOREIGN KEY (roomId) REFERENCES  users.room(roomId),
);


CREATE TABLE users.request(
reqId int NOT NULL IDENTITY PRIMARY KEY,
buyerId_FK int NOT NULL ,
renterId_FK int NOT NULL ,
roomId_FK int NOT NULL ,
price int NOT NULL ,
requestStatus varchar (100) NOT NULL ,
CONSTRAINT renterId_FK FOREIGN KEY (renterId_FK) REFERENCES  users.renter(renterId),
CONSTRAINT buyerId_FK FOREIGN KEY (buyerId_FK) REFERENCES  users.buyer(buyerId),
CONSTRAINT roomId_FK FOREIGN KEY (roomId_FK) REFERENCES  users.room(roomId),
);
GO
