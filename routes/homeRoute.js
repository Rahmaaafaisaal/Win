const express = require('express');
const router = express.Router();
const conn = require('../dbConnection');
const sql=require('mssql');
router.post("/signUp", (req, res) => {
    if(req.body.user_role=='Buyer')
    {
        addBuyer(req.body,res)
    }
    else{
        addRenter(req.body,res)
    }
  
   
})

router.post("/login", (req, res) => {
   
    checkUser(req.body,res)
  
})




async function addBuyer(buyerInfo,response) {
    
    try {
        console.log(buyerInfo)
        let query=new sql.Request(conn)
        query.query(
        `
        insert into users.buyer (age,photoName,gender,userName,phone,userRole,email,job,password) values (${buyerInfo.age},'${buyerInfo.photoName}','${buyerInfo.gender}','${buyerInfo.userName}','${buyerInfo.phone}','${buyerInfo.user_role}','${buyerInfo.email}','${buyerInfo.job}','${buyerInfo.password}')
        `,(err,res)=>{
            if(err)
            {
                console.log(err.message)
                response.send({"status":"error"})
            }
            else response.send({"status":"success"})
        });
    } catch (err) {
        console.log(err)
    }
}


async function addRenter(renterInfo,response) {
    
    try {
        
        let query=new sql.Request(conn)
        query.query(
        `
        insert into users.renter (age,photoName,gender,userName,phone,userRole,email,job,password) values (${renterInfo.age},'${renterInfo.photoName}','${renterInfo.gender}','${renterInfo.userName}','${renterInfo.phone}','${renterInfo.user_role}','${renterInfo.email}','${renterInfo.job}','${renterInfo.password}')
        `,(err,res)=>{
            if(err)
            {
                console.log(err.message)
                response.send({"status":"error"})
            }
            else response.send({"status":"success"})
        });
    } catch (err) {
        console.log(err)
    }
}

async function checkUser(user,response)
{
        let queryBuyer=new sql.Request(conn)
        queryBuyer.query(
        `
        select * from users.buyer where userName='${user.userName}'
        `,(err,res)=>{
            console.log(res)
            if(err)
            {
                console.log(err.message)
               
            }
            else {
                if(res.recordset.length!=0)
                {
                    console.log("hena")
                    if(res.recordset[0].password==user.password)
                    {
                        response.send({"status":"success","user":res.recordset[0]})
                    }
                   else{
                    response.send({"status":"error"})
                   }
                }
              else{

                let query=new sql.Request(conn)
                query.query(
                `
                select * from users.renter where userName='${user.userName}'
                `,(err,res)=>{
                    console.log(res)
                    if(err)
                    {
                        console.log(err.message)
                        response.send({"status":"error"})
                    }
                    else {
                        if(res.recordset.length!=0){
                           if(res.recordset[0].password==user.password)
                            {
                                response.send({"status":"success","user":res.recordset[0]})
                            }
                           else{
                            response.send({"status":"error"})
                           }
                        }
                        else{
                            response.send({"status":"userNotFound"})
                        }
                        
                    }
                });
            }
        }
    })
}


module.exports = router;