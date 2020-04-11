const express = require('express')
const app = express()
const router = express.Router();
const port = 3000
const cors = require('cors');
const path= require("path");
const renterRoute = require("./routes/renterRoute");

app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

app.use("/renter", renterRoute);

app.use('/', router);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))