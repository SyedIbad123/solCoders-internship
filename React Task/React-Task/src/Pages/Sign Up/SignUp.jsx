import SignUpCard from "../../components/SignUpCard";
import styles from "../../Styles/SignUp.module.css";

const SignUpPage = () => {
  return (
    <div className={styles.mainDiv}>
      <h1 className={styles.heading}>Sign Up to Register</h1>
      <SignUpCard />
    </div>
  )
}

export default SignUpPage;
