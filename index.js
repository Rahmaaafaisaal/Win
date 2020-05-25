const express = require('express')
const app = express()
const router = express.Router();
const port = 3000
const cors = require('cors');
const path= require("path");
const renterRoute = require("./routes/renterRoute");
const homeRoute = require("./routes/homeRoute");
const customerRoute = require("./routes/customerRoute");
const imagesRoute=require("./routes/images")

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));
app.use("/renter", renterRoute);
app.use("/home", homeRoute);
app.use("/img", imagesRoute);
app.use("/customer", customerRoute);

router.get('/',(req,res)=>{
  res.sendFile('C:/Users/rahma/Desktop/Win/public/customer.html')
})


app.use('/', router);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




  