const mongoose=require('mongoose');
var Todo=mongoose.model('Todo',{
  text:{
    type:String,
    trim:true,
    required:true,
    minlength:2
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number
  }
});

module.exports={
  Todo
}
