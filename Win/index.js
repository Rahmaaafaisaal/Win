const express = require('express')
const app = express()
const router = express.Router();
const port = 3000

router.get('/', function (req, res){

res.sendFile('heeeelllo')

})


app.use('/', router);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))