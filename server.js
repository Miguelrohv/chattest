var express = require('express') //require express

var bodyParser = require('body-parser')//required for the post. since express has no built in body parser

var app = express()//create express isntance

var http = require('http').Server(app)//http lib from node. create server

var io = require('socket.io')(http)//pass in reference to http

var mongoose = require('mongoose')

app.use(express.static(__dirname))//serves a response IE. HTML file
app.use(bodyParser.json())//parses the body to json
app.use(bodyParser.urlencoded({extended:false}))//parses the body from HTML page
//error if empty

var db = 'mongodb://miguelrohv:123qwe@ds058579.mlab.com:58579/prayerappdb'

var Message = mongoose.model('Message',{name:String,message:String})//(NAME,SCHEMA)create the model for mongoose like in python Django

// var messages =[ //messages holder
//     {name:'BOT',message:'THE BEGINNING'},

// ]

app.get('/messages',(req,res)=>{ //request and response
    Message.find({},(err,messages)=>{// messages to var message and errors to var err   
        res.send(messages)// the messages here now is the parameter in the function above which retries them
    })
    //res.send(messages)// sends it to localhost:3000/messages   //messages being the var messages array of json
})//handle route for end point

app.post('/messages',(req,res)=>{
    var message = new Message(req.body)
    message.save((err)=>{ //callback that takes error if there is
        if(err)  
           sendStatus(500)
        else
        console.log(req.body)//express has no built in support to parse/ needs body-parser
        //messages.push(req.body)
        io.emit('message',req.body)
        res.sendStatus(200)//will tell client that everything went well
    })
   //moved all functionalities from here up above   
})

io.on('connection',(socket)=>{
    console.log('a user connected!')
})

mongoose.connect(db,{ useNewUrlParser: true },(err)=>{ // add { useNewUrlParser: true } to remove deprecation warning
    console.log('mongo db connection',err)
})

var server = http.listen(3000,()=>{//replaced to http from app  
    console.log('server is listening... PORT:',server.address().port)
})//listen for request



//run here:
//in browser - localhost:3000 ... 3000 is the port



//add app.use()- and create the HTML to serve
// app.use(express.static(__dirname)) - to tell express we'll be serving  static file
//set callback for app.listen() so we can do stuff regarding the app.listen() IE. print the port

//from the start you can create a var to put app.listen() so you can get references within the app.listen()

//next create an app.get() to retrieve from server 

//next create an app.post() to send install body-parser

//next add another app.use() for the urlencoded body. to parse to html

//install socket.io npm install -s socket.io
    //install is tricky. needs to tie in with express  
// add var http = require('http').server(app)
//add io = require('socket.io)(http) // pass reference to http

//replace the app.listen() to http.listen()

/// create database----------------------

///create connection to database in mlab

//require mongoose

// create var db that contains the string for the connection to the database 

//connect to the database with mongoose just above the var server

//create a model for mongoose as var Message