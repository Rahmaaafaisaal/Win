const sql=require('mssql');
let conn;
let connPool;
let dbConfig = {
    server: "LAPTOP-SJH58R2J",
    port:1433,
    database:"WIN",
    user:  "winAdmin",
    password: "123456",
    "options": {
        "encrypt": false,
        "enableArithAbort": true
        }
  
};

async function poolHndler() {
  conn=new sql.ConnectionPool(dbConfig)
  connPool=conn.connect().then(()=>{
  console.log("Database connected !!")
  })
  await connPool;
}
poolHndler();
module.exports=conn;