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


module.exports = router;