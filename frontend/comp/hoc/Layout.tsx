import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react'
import styles from '../.././styles/Comp.module.scss'
import { refreshUser } from '../fetch/refreshUser';

import Navbar from '../Navbar'

type Props = {
    children?: React.ReactNode;
};
export type User = {
  email:string
roles: Object
username: string
}
type userContext ={
  isAuthenticated:boolean,
  user:User | null
  // setUserInfoDetails:(isAuthenticated:boolean,user:string,email:string)=>void
}
const demoContext ={
  isAuthenticated:false,
  user:{
    email: " ",
    roles: {},
     username: "",
  },
  
}
export const userContextHook = createContext<userContext>(demoContext)

const Layout = ({children}:Props) => {
  const router = useRouter()

  const [userInfo,setUserInfo] = useState({
    isAuthenticated:false,
    user:null
  })
  const {isAuthenticated,user} = userInfo


  const userContextValue:userContext = {
    isAuthenticated:isAuthenticated,
    user:user,
  
  }

  
  useEffect(()=>{
    const getUser=async()=>{
      const data = await refreshUser()
      if(data){
        const {success,user} = data
        if(success){
          setUserInfo({isAuthenticated:true,user:user})
        }
        console.log(data);
      }
     
    }
    if(!isAuthenticated){
      getUser()
    }
  },[isAuthenticated,router.asPath])

  return (
    <div className={styles.site_container}>
      <userContextHook.Provider value={userContextValue}>
        <Navbar isAuthenticated={isAuthenticated} setUserInfo={setUserInfo}  />
        {children}
        </userContextHook.Provider>
    </div>
  )
}

export default Layout