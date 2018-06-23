const mongoose=require('mongoose');
const validator = require('validator');
const _=require('lodash');
const jwt=require('jsonwebtoken');

const UserSchema=mongoose.Schema({
  email:{
    type:String,
    unique:[true,'Provided Email {VALUE} is already present'],
    required:true,
    trim:true,
    minlength:6,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not an valid email'
    }
  },
  password:{
    type:String,
    required:[true,'Password must be provided'],
    minlength:[6,'Password must be atleast 6,Current provided: {VALUE}']
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});
UserSchema.methods.toJSON=function(){
    var user=this;
    var userObject=user.toObject();
    return _.pick(userObject,['_id','email']);
};
UserSchema.methods.generateAuthToken=function(){
  var user=this; //This is only available inside function
  var access='auth';
  var token =jwt.sign({id:user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({access,token});

  return user.save().then(()=>{
    return token;
  });
}
UserSchema.statics.findByToken=function(token){
  let User=this;
  let decoded;
  try{
    decoded=jwt.verify(token,'abc123');
  }catch(e){
      return Promise.reject();
  }
  var user= User.findOne({
    '_id':decoded.id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
  //console.log(user);
  return user;


}
const User=mongoose.model('User',UserSchema);
module.exports={
  User
}
