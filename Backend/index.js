const connectToMongo=require('./db');
const express = require('express')
const cors=require('cors')

connectToMongo();

const app = express()
app.use(cors())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb"}))

app.use(express.json())
 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/post',require('./routes/Post'))

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

