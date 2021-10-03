const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const bodyParser= require('body-parser'); //bodyParser deprecated
const port = 8000;
const app = express();

const User = require('./models/User');
let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: "userData"
};
let uri = "mongodb://localhost:27017";
mongoose.connect(uri, options);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

function testInfo(req){
  console.log(`content-type = ${req.get('content-type')}`);
  console.dir(`originalUrl = ${req.originalUrl}`);
  console.dir(`path = ${req.path}`);
}

function sendResponse(res,err,data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}


// CREATE
  app.post('/users',(req,res)=>{
    User.create(
      {...req.body.newData},
      (err,data)=>{
        sendResponse(res,err,data);
      }
      )
  })
  const filePathOptions = {
    root: path.join(__dirname, '/files/')
    }

app.route('/users/:id')
// READ
.get((req,res)=>{
  testInfo(req);
  User.findById(req.params.id,
    (err,data)=>{
    //  sendResponse(res,err,data);
     res.sendFile('camera.png', filePathOptions);
    }
    )
})

// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    {
      new:true
    },
    (err,data)=>{sendResponse(res,err,data)}
  )
})

// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{sendResponse(res,err,data)}
  )
})

