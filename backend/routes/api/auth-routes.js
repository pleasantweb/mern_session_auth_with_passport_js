const router = require('express').Router()
const passport = require('passport')
const { handleActivation } = require('../../controllers/activationController')
const {handleRegister} =require('../../controllers/registerController')
const { resendActiveCode } = require('../../controllers/resendActiveCodeController')


// User register and activation
router.post('/register',handleRegister)
router.post('/activate',handleActivation)
router.get('/resendCode',resendActiveCode)


//User login
router.get('/login/success',(req,res)=>{
    console.log('yooo');
    if (req.user) {
        res.status(200).json({
          success: true,
          user: req.user,
        });
      }else{
          res.status(400).json({"error":"Something went wrong"})
      }
})
router.get('/login/failed',(req,res)=>{
    res.send(400).json('Something went wrong')
})
router.post('/login',passport.authenticate('local'),(req,res)=>{
  console.log(req.user);
    res.status(200).json({"success":"Login successfull"})
})

//Google login
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))
router.get('/google/redirect',passport.authenticate('google',{
    successRedirect:process.env.FRONTEND_URL,
    failureRedirect:'/login/failed/'
}),(req,res)=>{
    res.status(200).json({"success":"User logged in"})
})

router.get('/logout',(req,res)=>{
    req.logOut()
    res.status(200).json({"success":"Logout success"})
})


module.exports = router