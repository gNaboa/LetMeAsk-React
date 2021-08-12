import firebase from "firebase"
import { createContext, ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebase"


export const AuthContext = createContext({} as AuthContextType)

type User={
    id:string,
    name:string,
    photo:string
  }
  
  type AuthContextType = {
    user:User | undefined;
    handleSignIn:() => Promise<void>
  
  
  }

  type AutoContextProviderProps={
      children:ReactNode
  }

export function AuthContextProvder(props:AutoContextProviderProps){

    const[user,setUser] = useState<User>()


    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          const {uid,displayName,photoURL} = user
  
          if(!displayName || !photoURL){
            throw new Error('Missing information of your Google Account')
          }
  
        setUser({
          id:uid,
          name:displayName,
          photo:photoURL
        })
  }
      })
    },[])
  
   async function handleSignIn(){
      const provider = new firebase.auth.GoogleAuthProvider()
  
       const result = await  auth.signInWithPopup(provider)
  
        if(result.user){
                const {uid,displayName,photoURL} = result.user
  
                if(!displayName || !photoURL){
                  throw new Error('Missing information of your Google Account')
                }
  
              setUser({
                id:uid,
                name:displayName,
                photo:photoURL
              })
    }
  
  }

    return(
             
        <AuthContext.Provider value={{user,handleSignIn}}>

            {props.children}
        </AuthContext.Provider>
    ) 

}