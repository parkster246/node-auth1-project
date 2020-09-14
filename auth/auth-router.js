const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post("/register", (req, res) => {
    const { username , password} = req.body
    // validate the user credentials , check password length , make sure it's alphanumeric, ect
    // loook at joi or express-validator for validation 
const rounds = process.env.HASH_ROUNDS || 8;
 const hash = bcrypt.hashSync(password , rounds)
  Users.add({username , password: hash})
    .then(user => {
      res.status(201).json({data: user});
    })
    .catch(err => {
        res.status(500).json({ error : err.message})
    });
});


router.post( '/login', (req, res)=>{
  let {username , password} = req.body;

  Users.findBy({username})
  .then(users =>{
    const user = users[0]
    if(user && bcrypt.compareSync(password, user.password)){
      res.status(200).json({
        hello: user.username ,
        session: req.session,
      })
    }else{
      res.status(401).json({ error: 'You shall not pass'})
    }
  })
})


router.get('/logout', (req,res)=>{
  if(req.session){
    req.session.destroy( error =>{
      if(error){
        res.status(500).json({
          error: "could not log you out, please try again later"
        })
      } else {
        res.status(204).end();
      }
    })
  } else{
    res.status(200).json({message: "already logged out"})
  }
})

module.exports = router;