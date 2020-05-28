const express = require('express');
const router = express.Router();
const conn = require('../dbConnection');
const sql=require('mssql');
router.post("/signUp", (req, res) => {






    console.log(req.body)
    res.send("ok")
})

router.post("/login", (req, res) => {
   
    console.log(req.body)
    res.send("ok")
})




async function addBuyer(buyerInfo) {
    try {

        let query=new sql.Request(conn)
        query.query(
        `
        insert into users.buyer (age,photoName,gender,userName,phone,user_role,email,job) values (12,'rahma','rahma','rahma','rahma','rahma','rahma','rahma')
        `,(err,res)=>{
            if(err)console.log(err)
            else console.log(res)
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = router;