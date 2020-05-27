const express = require('express');
const router  = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/roomPics/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage });

router.post("/img",upload.array('img',4),(req,res) =>
{
  if (req.files) {
    console.log("images came");
    res.send({"status":"success"})
  }
  else res.send({"status":"error"})
})

router.post("/room", (req,res) =>
{
  let newRoom=req.body;
  console.log(newRoom)
  res.send({"status":"success"})
})

router.get("/rooms/:id",(req,res)=>{
  renterList = [{"id":1 , "rooms":[{ roomId : 1 ,
    location: 'First settlement',
  priceMin: '321',
  priceMax: '321',
  type: 'Double',
  furniture: 'Furnished',
  roomImages:
   [ '1.jpeg', '2.jpeg' ,'3.jpeg'] } ,
   {roomId : 2 ,
   location: 'Fifth settlement',
     priceMin: '25',
     priceMax: '250',
     type: 'Double',
     furniture: 'Furnished',
     roomImages:
      [ '4.jpeg',
        '5.jpeg' ] } ,{ roomId :3 ,
          location: 'First settlement',
        priceMin: '321',
        priceMax: '321',
        type: 'Double',
        furniture: 'Furnished',
        roomImages:
         [ '6.jpeg',
           '3.jpeg' ] },
           { roomId : 4 ,
            location: 'First settlement',
           priceMin: '321',
           priceMax: '321',
           type: 'Double',
           furniture: 'Furnished',
           roomImages:
            [ '2.jpeg',
              '1.jpeg' ] } ]}]

  const renterId = req.params.id;
  for(renter of renterList){
      if( renter.id ==  renterId){
          renter.rooms.forEach(room =>{
          room.roomImages.map( (image,i) =>{
          room.roomImages[i] = "img/roomPics/" + image
           })
        })
      // res.setHeader('Content-Type', 'application/json');
      res.send({ "status":"success", "data":renter.rooms })
      return 
    }
  }
  // if the loop ended without responsing to the frontend, which means the renter is not existed, send error
  res.json({"status":"error"})
  
})


router.get("/req/:id",(req,res)=>{
  renterList = [{"id":1 , "requests": [ {customerName:"rahma", customerId :2, roomId:1, price:2000, reqId:1},
                                        {customerName:"karim", customerId :1, roomId:2, price:1000, reqId:2},
                                        {customerName:"ahmed", customerId :4, roomId:2, price:3000, reqId:3}  ]}]

  const renterId = req.params.id;
  for(renter of renterList){
      if( renter.id ==  renterId){
     
      res.send({ "status":"success", "data":renter.requests })
      return 
    }
  }
  // if the loop ended without responsing to the frontend, which means the renter is not existed, send error
  res.json({"status":"error"})
  
})


router.get("/req/accept/:id",(req,res)=>{
  const reqId = req.params.id;
    //query the request and accept it 
    // delete other requests for this room
    //direct to  "/req/:id" => id is the renter id 
    console.log(reqId)
    res.send({ "status":"success" ,body :{customerName:"ahmed", customerId :4, roomId:2, price:3000, reqId:3} })
  // res.json({"status":"error"})
  
})


router.get("/req/decline/:id",(req,res)=>{
  const reqId = req.params.id;
  //query the request and delete it 
  console.log(reqId)
  res.send({ "status":"success" })
  
  // res.json({"status":"error"})
  
})

module.exports = router;