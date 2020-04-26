const express = require('express');
const router = express.Router();
const multer  = require('multer')
const util = require("util");
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
    res.send("done");
  }
  else res.send("failed");
})

router.post("/room", (req,res) =>
{
  let newRoom=req.body;
  console.log(newRoom)
  res.send("done")
})


module.exports = router;