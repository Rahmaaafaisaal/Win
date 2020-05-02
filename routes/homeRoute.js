const express = require('express');
const router = express.Router();

router.post("/signUp", (req,res) =>
{
console.log(req.body)
res.send("ok")
})

router.post("/login", (req,res) =>
{
console.log(req.body)
res.send("ok")
})


module.exports = router;