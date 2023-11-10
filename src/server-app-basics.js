var mongoClient = require('mongodb').MongoClient; //for communicating with database

var express = require('express'); // using express for creating server side app that configures what data to load on user's request

var cors=require('cors') //cross object resource sharing so that application can accept user input data and modify database if require

var app=express();//creating express() app to access express properties || express() is top level express function provided by express module
app.use(cors());//making app use cors

app.use(express.urlencoded({  
    extended:true
}))

app.use(express.json())

var conStr='mongodb://127.0.0.1:27017';

app.get('/',(req,res)=>{
    res.send(
        '<h2>Home</h2>'
    )
})

app.get('/categories',(req,res)=>{
    mongoClient.connect(conStr).then((clientObj)=>{
        var database = clientObj.db('ytclone')

        database.collection('tblcategories').find({}).toArray().then(docs=>{
            res.send(docs);
            res.end();
        })
        })
    })



app.listen(8000,()=>{
    console.log('server started at port 8000');
})

