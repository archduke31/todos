const express = require('express');
const bodyParser=require('body-parser');

const app=express();

const {mongoose} =require('./db/mongoose');
const {Todo} = require('./models/todoSchema');
const {User}=require('./models/userSchema');


app.use(bodyParser.json());

app.post('/todos',function(req,res){
  console.log(req);
  var todo=new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(err)=>{
    res.status(400).send(err);
  });
});

app.listen('5000');
