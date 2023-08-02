import Link from "next/link";
import styles from "../styles/SignIn.module.css";
import { Auth, signIn, useAuth } from "@/utils/authentication";
export default function SignIn() {
  const router = useAuth(Auth.SIGNED_OUT);
  function handleSubmit(e) {
    e.preventDefault();
    const email = document.querySelector("input[type=email]").value;
    const password = document.querySelector("input[type=password]").value;
    if (email.split("@")[1] != "student.nitw.ac.in") {
      alert("Only student email is allowed!");
    }
    (async () => {
      const user = await signIn(email, password).catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/wrong-password") {
          alert("Wrong password!");
        } else if (errorCode == "auth/user-not-found") {
          alert("No user found with this email!");
        } else if (errorCode == "auth/invalid-email") {
          alert("This email is invalid!");
        } else {
          alert("Some error occurred, contact the developers");
        }
      });
      if (user && !user.user.emailVerified) {
        router.push("/verifyEmail");
      } else if (user) {
        router.push("/");
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
        <h1 style={{ textAlign: "center" }}>Sign In</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div style={{ marginLeft: "5%", display: "grid" }}>
            <label htmlFor="mailId">
              <h2>College Mail Id</h2>
            </label>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter Mail Id"
              name="mailId"
              required
            ></input>
            <label htmlFor="password">
              <h2>Password </h2>
            </label>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            ></input>
            <button className={styles.button}>Sign In</button>
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
