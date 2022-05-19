import axios from 'axios'
axios.defaults.withCredentials = true;

export const logoutUser = async()=>{
    try{
    const url= process.env.NEXT_PUBLIC_BACKEND_URL
    const res = await axios(`${url}/auth/logout`,{
        method:"GET"
    })
    if(res.status === 200){
        return true
    }
    
}catch(err){
    return false
}
   
}