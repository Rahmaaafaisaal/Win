const express = require('express');
const router = express.Router();


router.post("/room", (req,res) =>
{
  let newRoom=req.body;
  console.log(newRoom)
  res.send("done")
})


module.exports = router;