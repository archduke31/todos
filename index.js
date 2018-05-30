const express = require('express');
const bodyParser=require('body-parser');

const app=express();

const {mongoose} =require('./db/mongoose');
const {Todo} = require('./models/todoSchema');
const {User}=require('./models/userSchema');
const {ObjectID}=require('mongodb');

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

app.get('/todos',function(req,res){
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status.send(err);
  })
});

app.get('/todos/:id',function(req,res){
  if(!ObjectID.isValid(req.params.id)){
    res.status(404).send();
  }else{
    console.log(req.params.id);
    Todo.findById(req.params.id).then((todo)=>{
      console.log(todo);
      if(!todo){
        res.status(404).send({message:"object not found"});
      }else{
        res.send({todo});
      }
    }).catch((e)=>{
      res.status(400).send();
    });
  }
});

app.listen(process.env.PORT|| 5000);

module.exports={
  app
};
