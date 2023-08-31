const express = require('express');
const cors = require('cors');
const { MongoConnect } = require('./mongoconnect');
const { usercontrol } = require('./controler');
const app = express();
app.use(express.json());
app.use(cors());

app.use(usercontrol);
app.get('/',(req,res)=>{
    res.send({
        res: "hello App"
    })
})
const port  = process.env.PORT||8080;
app.listen(port,async ()=>{
    console.log(`server is running on http://localhost:${port}`);
    await MongoConnect();
})