const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
const app = express()
var cors = require('cors')

app.use(cors())


app.use(express.json())

const port = 5000

//  Passes the endpoint to required file
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app is listening on port ${port}`)
})