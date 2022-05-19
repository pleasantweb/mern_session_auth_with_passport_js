const {FRONTEND_URL} = process.env
const whiteList = [FRONTEND_URL]
const corsOptions = {
    origin:(origin,callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not Allowed by cors'))
        }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    // allowedHeaders: ['Content-Type', 'authorization'],
    optionSuccessStatus:200
}

module.exports = {corsOptions}