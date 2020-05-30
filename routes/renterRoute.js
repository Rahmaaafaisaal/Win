const express = require('express');
const router  = express.Router();
const multer  = require('multer')
const conn = require('../dbConnection');
const sql=require('mssql');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/roomPics/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage });

function addRoomPhotos(roomPhotos,roomId)
{
  for(photoName of roomPhotos){
    try {   
      let query=new sql.Request(conn)
      query.query(
      `
      insert into users.room_photosNames (roomId,photoName) values (${roomId},'${photoName}')
      `,(err,result)=>{
          if(err)
          {
              console.log(err.message)
              return false
          }
      });
    } catch (err) {
      console.log(err)
      return false
    }
  }
  return true
}

function getRoomPhotos(roomId)
{
  try {   
    let query=new sql.Request(conn)
    return query.query(
    `select photoName from users.room_photosNames where roomId = ${roomId}` )
  } catch (err) {
    console.log(err)
    return false
  }
  
}

function getCustName(custId)
{
  try {   
    let query=new sql.Request(conn)
    return query.query(
    `select userName from users.buyer where buyerId = ${custId}` )
  } catch (err) {
    console.log(err)
    return false
  }
  
}

function deleteOtherRequests(roomId)
{
  try {   
    let query=new sql.Request(conn)
    return query.query(
    `
    DELETE FROM users.request where roomId_FK = ${roomId} and requestStatus = 'pending' `);
  } catch (err) {
    console.log(err)
    return false
  }
}

function getAllRenterRequests(renterId,res)
{
  let reqList = [ ]
  try {   
    let query=new sql.Request(conn)
    query.query(
    `
    select * from users.request where renterId_FK = ${renterId}
    `,(err,result)=>{
        if(err)
        {
            console.log(err.message)
            res.json({"status":"error"})
        }else{
          const requestsLen = result.recordset.length
          result.recordset.forEach(async(elem,index) =>{
           
            let ret = await getCustName(elem.buyerId_FK)
            if(ret.err)
            {
              console.log(ret.err.message)
              return false
            }else{
              elem.customerName = ret.recordset[0].userName
              reqList.push(elem)
            }
            if(index == requestsLen - 1){
              res.send({ "status":"success", "data": reqList })
              return
            }
        });
    }});
  } catch (err) {
    console.log(err)
    res.json({"status":"error"})
  }
}
router.post("/img",upload.array('img',4),(req,res) =>
{
  if (req.files) {
    console.log("images came");
    res.send({"status":"success"})
  }
  else res.send({"status":"error"})
})

router.post("/room/:id", (req,res) =>
{
  let newRoom=req.body;
  const renterId = req.params.id;
  console.log(newRoom)

  try {
        
    let query=new sql.Request(conn)
    query.query(
    `
    insert into users.room (minRange,maxRange,roomLocation,furnitureStatus,roomType,avaliableFrom,renterId) values (${newRoom.priceMin},'${newRoom.priceMax}','${newRoom.location}','${newRoom.furniture}','${newRoom.type}','${newRoom.date}',${renterId})
    SELECT SCOPE_IDENTITY() AS roomId;
    `,(err,result)=>{
        if(err)
        {
            console.log(err.message)
            res.send({"status":"error"})
        }
        else{
          let savedRoomId = result.recordset[0].roomId 
          const ret = addRoomPhotos(newRoom.roomImages,savedRoomId)
          if(ret == true ){
            res.send({"status":"success"})
          }  
        } 
    });
  } catch (err) {
    console.log(err)
  }
})

router.get("/rooms/:id",(req,res)=>{
  
  const renterId = req.params.id;
  let roomsList = [ ]
  try {   
    let query=new sql.Request(conn)
    query.query(
    `
    select * from users.room where renterId = ${renterId}
    `,(err,result)=>{
        if(err)
        {
            console.log(err.message)
            res.json({"status":"error"})
        }else{
          const roomsLen = result.recordset.length
          result.recordset.forEach(async(room,index) =>{
            room.roomImages = []
            let ret = await getRoomPhotos(room.roomId)
            if(ret.err)
            {
              console.log(ret.err.message)
              return false
            }else{
              ret.recordset.forEach( record =>{
                room.roomImages.push("img/roomPics/"+record.photoName)
              }) 
              roomsList.push(room)
            }
            if(index == roomsLen - 1){
              res.send({ "status":"success", "data": roomsList })
              return
            }
        });
    }});
  } catch (err) {
    console.log(err)
    res.json({"status":"error"})
  }
})


router.get("/req/:id",(req,res)=>{

  const renterId = req.params.id;
  getAllRenterRequests(renterId,res)
  
})


router.get("/req/accept/:id",(req,res)=>{
  const reqId = req.params.id;
    //query the request and accept it 
    // delete other requests for this room
    //direct to  "/req/:id" => id is the renter id 
   
    try {   
      let query=new sql.Request(conn)
      query.query(
      `
      UPDATE users.request SET requestStatus = 'accepted' where reqId = ${reqId};
      SELECT * From users.request where reqId = ${reqId};
      `,async (err,result)=>{
          if(err)
          {
            console.log(err.message)
            res.json({"status":"error"})
          }else{
            let savedRoomId = result.recordset[0].roomId_FK
            let renterId    = result.recordset[0].renterId_FK
            let ret = await deleteOtherRequests(savedRoomId)
            if(! ret.err){
              console.log("other requests deleted")
              getAllRenterRequests(renterId,res)
            }
          }
      });
    } catch (err) {
      console.log(err)
      res.json({"status":"error"})
    }
  
})


router.get("/req/decline/:id",(req,res)=>{
  const reqId = req.params.id;
  try {
        
    let query=new sql.Request(conn)
    query.query(
    `
    DELETE FROM users.request WHERE reqId = ${reqId}
    `,(err,result)=>{
        if(err)
        {
            console.log(err.message)
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success"})
        } 
    });
  } catch (err) {
    console.log(err)
    res.send({"status":"error"})
  }
})

module.exports = router;