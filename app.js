const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const moment = require('moment');
dotenv.config()

mongoose.connect(process.env.DB_STRING) //< database string from .env file
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () =>{
    console.log('connected to mongodb')
})


const app = express()
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.locals.moment = require('moment');    //https://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views



  
    

      

            const commentSection = require('./routes/home.js')



            app.use('/', commentSection)  //THIS IS MAIN
            const PORT = process.env.PORT || 5000


            app.listen(PORT, () =>{
                console.log('SERVER RUNNING')
            })