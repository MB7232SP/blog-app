const express = require('express');
const cors = require('cors')
const { UserControl } = require('./Controler/Admin_Cwriter.controler');
const { BlogControler } = require('./Controler/Blog.controler');
const { Connection } = require('./DB_Connect/db');
const app = express();
app.use(express.json())
app.use(cors())
app.use(UserControl);
app.use(BlogControler);
app.get('/',(req,res)=>{
    res.send('hello app')
})
const port = process.env.PORT || 8080;
app.listen(port,async()=>{
    await Connection();
    console.log(`server is running on http://localhost:${port}`)
})