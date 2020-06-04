const express = require('express');
const router  = express.Router();
const sql=require('mssql');
const conn =require('../dbConnection');

router.get('/Rooms',(req,res)=>{

  // let  rooms= [ {"text":"room1", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] }  ]
    
  getAllRooms(res)
  
})


router.get('/requets',(req,res)=>{


  let requests=[{'roomId':'1','request_status':'succes'},{'roomId':'2','request_status':'pending'},{'roomId':'2','request_status':'declined'}]
   
    res.send(requests)
})




async function getAllRooms(response)
{
        let queryBuyer=new sql.Request(conn)
        let roomsList = [ ]
        queryBuyer.query(
        `
        select * from users.room
        `,(err,res)=>{


          console.log(res)
          if(err)
          {
              console.log(err.message)
             
          }
          else {
              if(res.recordset.length!=0)
              {

                const roomsLen = res.recordset.length
                res.recordset.forEach(async(room,index) =>{
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
                    response.send({ "status":"success", "data": roomsList })
                    return
                  }
              });
                // response.send({"status":"success","data":res.recordset})
              }
                 else{
                  response.send({"status":"error"})
                 }
              }


        })
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

module.exports=router;