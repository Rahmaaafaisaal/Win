const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/profilePics/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage })
router.post("/",upload.single('img'),(req,res) =>
{

})


module.exports = router;