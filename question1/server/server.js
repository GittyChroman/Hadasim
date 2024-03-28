require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const corsOptions = require('./Config/corsOptions')
const connectDB = require('./dbConnection')
const path=require('path')
const PORT = process.env.PORT || 2552
const app = express()
connectDB()


app.use(express.static("public"))

app.get('/uploads/:filename', (req, res) => {
    const imagePath = path.join(__dirname, '/public/upload/', req.params.filename);
    res.sendFile(imagePath, { headers: { 'Content-Type': 'image/jpeg' } });
});

app.use('/uploads', express.static(__dirname + '/public/upload'));
app.use(cors(corsOptions))
app.use(express.json())


//routes
app.use('/members', require('./Routes/memberRoute'))
app.use('/coronaVirusDetails', require('./Routes/coronaVirusDetailsRoute'))

//test connection to the db
mongoose.connection.once('open', () => {
    console.log('connected to DB');
    app.listen(PORT, () => { console.log(`Running on port ${PORT}`); })
    mongoose.connection.on('error', err => { console.log(err); })
})



