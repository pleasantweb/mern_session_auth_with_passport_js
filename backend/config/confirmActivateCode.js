const jwt = require('jsonwebtoken')
const { transporter } = require('./mailTransport')

const sendConfirmationCode=(email,response)=>{

    const code = Math.floor(Math.random()*90000) + 10000

    const message = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Activate Your Account",
        // text: "Plaintext version of the message",
        html: `<h2>This is your confimation code for ${process.env.SITE_NAME}</h2> \n <h2>${code}</h2> `
       }

    const confirmationCode = jwt.sign(
       {"code":code},
       process.env.CONFIRM_CODE_TOKEN,
       {expiresIn:'120s'})

    const pendingUserEmail =jwt.sign(
        {"email":email},
        process.env.CONFIRM_CODE_TOKEN,
        {expiresIn:'100d'})
    

    transporter.sendMail(message,(err, info)=>{
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
     })

    response.cookie('confirmation_code',confirmationCode,{
            httpOnly:true,
            maxAge:2 * 60 * 1000,
            sameSite:'None',
            secure:true 
    })
    response.cookie('pending_user_email',pendingUserEmail,{
        httpOnly:true,
        maxAge:100 * 24 * 60 * 60 * 1000,
        sameSite:'None',
        secure:true 
    })
    
    return confirmationCode

}
module.exports = {sendConfirmationCode}