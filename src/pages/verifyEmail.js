import { Auth, emailVerification, useAuth } from "@/utils/authentication";

export default function VerifyEmail() {
  useAuth(Auth.SIGNED_IN);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "2vw",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", margin: "5%", fontSize: "300%" }}>
        NITW-EBAY
      </h1>
      <div
        style={{
          backgroundColor: "rgb(247 214 41 / 50%)",
          borderColor: "rgb(247 214 41 / 50%)",
          borderStyle: "solid",
          borderRadius: "4px",
          borderWidth: "4px",
          padding: "2vw",
        }}
      >
        Please check your email for verification link.
        <br></br>
        <small> Check spam and junk folders too.</small>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          (async () => {
            await emailVerification();
            alert("Email sent!");
          })();
        }}
        style={{
          backgroundColor: "rgb(41 152 247 / 50%)",
          border: "none",
          borderRadius: "4px",
          padding: "2vw",
          width: "50%",
          marginTop: "4vh",
        }}
      >
        Resend Email
      </button>
    </div>
  );
}
