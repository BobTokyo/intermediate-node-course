# Intermediate Node.js

Check out the issues of this repo for the course materials.

Refactor =>
client side req.body = 
{
  "newData":{
    "name":"Jim",
    "email":"jim@email.com",
    "password":"newPassword"
  }
}
mongoDB request = 
 User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password
    },
    {
      new:true
    },

refactor mongoDB request using spread syntax = 
 User.findByIdAndUpdate(
    req.params.id,
    {...req.body.newData},
    {
      new:true
    },
