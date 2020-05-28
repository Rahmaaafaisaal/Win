const express = require('express');
const router  = express.Router();
const sql=require('mssql');
const conn =require('../dbConnection');

router.get('/Rooms',(req,res)=>{

  let  rooms= [ {"text":"room1", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] }  ]
    res.send(rooms)
})


router.get('/requets',(req,res)=>{


  let requests=[{'roomId':'1','request_status':'succes'},{'roomId':'2','request_status':'pending'},{'roomId':'2','request_status':'declined'}]
   
    res.send(requests)
})


module.exports=router;