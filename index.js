const cors = require('cors')

const express = require('express')
const app = express();
const port = 3000;


app.use(express.json())
app.use(cors())


app.listen(port,()=>{
    console.log(`Server listen on port ${port}`)
})

const db =  require('./database/database')

app.post('/pontos', db.addPonto)