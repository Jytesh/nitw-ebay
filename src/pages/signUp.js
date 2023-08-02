import Link from "next/link";
import styles from "../styles/SignIn.module.css";
import {
  Auth,
  auth,
  emailVerification,
  signUp,
  useAuth,
} from "@/utils/authentication";
import { sendEmailVerification, signOut } from "firebase/auth";
import { getWebsite } from "@/utils";

export default function SignUp() {
  const router = useAuth(Auth.SIGNED_OUT);
  function handleSubmit(e) {
    e.preventDefault();
    const email = document.querySelector("input[type=email]").value;
    const password = document.querySelector("input[type=password]").value;
    if (email.split("@")[1] != "student.nitw.ac.in") {
      alert("Only student email is allowed!");
    }
    (async () => {
      const user = await signUp(email, password).catch((e) => {
        const errorCode = e.code;
        if (errorCode == "auth/email-already-in-use") {
          alert("This email is already in use, try signing up instead!");
        } else if (errorCode == "auth/invalid-email") {
          alert("This email is invalid!");
        } else if (errorCode == "auth/weak-password") {
          alert("Your password is too weak! Try a stronger password!");
        } else {
          alert("Some error occurred, contact the developers");
        }
        signOut(auth);
      });

      if (user && !user.user.emailVerified) {
        emailVerification();
        router.push("/verifyEmail");
      }
    })();
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "5%", fontSize: "300%" }}>
        NITW-EBAY
      </h1>
      <div className={styles.box}>
        <br></br>
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>
        <br></br>
        <form id="signUp" onSubmit={handleSubmit}>
          <div style={{ marginLeft: "5%", display: "grid" }}>
            <label htmlFor="mailId">
              <h2>College Mail Id</h2>
            </label>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter Mail Id"
              name="ebay-mailId"
              required
            ></input>
            <label htmlFor="password">
              <h2>Password</h2>
            </label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter Password"
              name="ebay-password"
              required
            ></input>
            <button className={styles.button}>Sign Up</button>
            <Link href="/" style={{ textAlign: "center" }}>
              Go Back
            </Link>
            <Link href="/forgotPassword" style={{ textAlign: "center" }}>
              Forgot Password?
            </Link>
            <Link href="/signUp" style={{ textAlign: "center" }}>
              Dont have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
