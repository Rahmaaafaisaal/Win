const express = require('express');
const router  = express.Router();

router.get('/Rooms',(req,res)=>{

  let  rooms= [ {"text":"room1", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] },{"text":"room2", "images":['img/1.jpg',"img/2.jpg"] }  ]
    res.send(rooms)
})


module.exports=router;