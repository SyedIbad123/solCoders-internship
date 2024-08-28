import styles from "../Styles/Logout.module.css";
import { useContext, useState } from "react";
import { Authorizer } from '../Context/AuthContext';
import {ToastSucces} from "../Services/ToastService";
import LoaderSpinner from "./LoaderSpinner"; 
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const {setLogin} = useContext(Authorizer);
  const [loading , setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(()=> {
      setLogin(false);
      ToastSucces("Logout Success");
      navigate("/");
    },3000);
  }

  return (
    <div className={styles.logoutDiv}>
      {loading && <LoaderSpinner color="white" loading={loading} size={20} />} 
      <button  className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;
