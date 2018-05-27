const express = require('express');
const request=require('supertest');


const {app}=require('../index.js');
const {mongoose} =require('.././db/mongoose');
const {Todo} = require('.././models/todoSchema');
const {User}=require('.././models/userSchema');


describe('Get /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      console.log(res.body);
    })
    .end(done);
  });
});