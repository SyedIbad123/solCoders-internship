import { createContext,useEffect,useState } from "react";
const Authorizer = createContext();

const AuthProvider = ({children}) => {

    const [login , setLogin] = useState(JSON.parse(sessionStorage.getItem("login")));

  
    useEffect(()=>{
        sessionStorage.setItem("login", JSON.stringify(login));
    },[login]);
    
    return (
        <Authorizer.Provider value={{login,setLogin}}>
            {children}
        </Authorizer.Provider>
    );
}

export { AuthProvider, Authorizer };