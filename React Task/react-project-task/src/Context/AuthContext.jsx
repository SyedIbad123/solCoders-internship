import { createContext,useState } from "react";
import { toast } from 'react-toastify'


const Authorizer = createContext();

const AuthProvider = ({children}) => {
    const credentials = {
        email: "ibad@gmail.com",
        password: "12345"
    };
    const [credential, setCredential] = useState({email: "", password: ""});
    const [login, setLogin] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        if (credentials.email === credential.email && credentials.password === credential.password) {
            setLogin(true);
            localStorage.setItem("login", JSON.stringify(true));
            toast.success("Login Successful");
        } else{
            toast.error("Invalid Credentials");
        }
    }
    function handleChange(e) {
        const {name, value} = e.target;
        setCredential({...credential, [name]: value});
    }
    return (
        <Authorizer.Provider value={{handleChange, handleSubmit, login, credential}}>
            {children}
        </Authorizer.Provider>
    );
}

export { AuthProvider, Authorizer };