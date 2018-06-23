const {User} = require('./../models/userSchema');
const authenticate=(req,next,res)=>{
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
}

module.exports={
  authenticate
};
