const express = require('express');
const bodyParser=require('body-parser');
const _=require('lodash');
const app=express();

const {mongoose} =require('./db/mongoose');
const {Todo} = require('./models/todoSchema');
const {User}=require('./models/userSchema');
const {ObjectID}=require('mongodb');

const {authenticate} =require('./middlewares/authenticate');


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

app.delete('/todos/:id',function(req,res){
  var id=req.params.id;
  if(ObjectID.isValid(id)){
    Todo.findByIdAndRemove(id).then((doc)=>{
      if(!doc){
        res.status(404).send({message:"object not found"});
      }else{
          res.send({doc});
      }
    },(err)=>{
      res.status(400).send(err);
    });
  }else{
    res.status(404).send();
  }
});


app.post('/users',authenticate,(req,res) => {
  var body=_.pick(req.body,['email','password']);
  console.log(body);
  var user=new User(body);
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e)
  });
});



app.get('/users/me',(req,res)=>{
  console.log(req.header('x-auth'));
  var token=req.header('x-auth');

  User.findByToken(token).then((user)=>{
    console.log(user);
    if(!user){
        Promise.reject();
    }
    res.send(user);
  }).catch((e)=>{
    res.status(401).send();
  });
});

var port=process.env.PORT|| 5000;
app.listen(port,function(){
  console.log(`Server started ${port}`);
});

module.exports={
  app
};
