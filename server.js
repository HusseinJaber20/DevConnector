const express = require('express')
const connectDB = require('./config/db')

const app = express()

// Connect Database 
connectDB()

// Init Middleware function to parse the POST requests
// Before every request, this middleware function will get called, parse the request into a json and insert it into
// the req.body. Then the function will call the next middleware function which is the post method for example.
app.use(express.json({extended: false}))


app.get('/', (req,res) => {
    res.send('API RUNNING')
})

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/post'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server startet on PORT ${PORT}`)
})