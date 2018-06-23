const express = require('express');
const request=require('supertest');


const {app}=require('../index.js');
const {mongoose} =require('.././db/mongoose');
const {Todo} = require('.././models/todoSchema');
const {User}=require('.././models/userSchema');
const {ObjectID}=require('mongodb');

const todo={
  text:'This one is from the test'
};

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .end(done);
  });
});
describe('POST /todos',()=>{
  it('should create new todo',(done)=>{
    request(app)
    .post('/todos')
    .send({text:todo.text})
    .expect(200)
    .expect((res)=>{
      console.log(res.body);
      todo.id=res.body.id;
    }).end(done);
  });
});
Todo.findOne({text:'This one is from the test'}).then((doc)=>{
  describe('DELETE /todos',()=>{
    it('should delete existing todo',(done)=>{
      request(app)
      .delete('/todos/'+doc.id)
      .expect(200)
      .expect((res)=>{
        console.log(res.body);
      })
      .end(done);
    });
  });
}, (err) =>{
  console.log(err);
});
