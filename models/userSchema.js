const mongoose=require('mongoose');
const User=mongoose.model('User',{
    email:{
      type:String,
      email:true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index:true,
      required:[true,'can\\t be left blanked'],
      unique:true
    }
});
module.exports={
  User
}
