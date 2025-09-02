

import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

 
export let AuthContext = createContext();

export default function AuthContextProvider({children}) {
    let [token , setToken] = useState(null);
    let [userData, setuserData] = useState(null);

    useEffect(()=>{
        let localToken = localStorage.getItem('token');
        if(localToken){
            setToken(localToken);
            decodeData(localToken)
        }   
    },[])

    function decodeData(token){
           let data = jwtDecode(token)
           setuserData(data);
        }
    
  return (
    <AuthContext.Provider value={{token, setToken,userData}}>
      {children}
    </AuthContext.Provider>
  )
}
