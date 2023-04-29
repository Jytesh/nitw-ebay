import { Auth, useAuth } from "@/utils/firebase";

export default function Home() {
  useAuth(Auth.SIGN_OUT);
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "5%", fontSize: "300%" }}>
        NITW-EBAY
      </h1>
    </div>
  );
}
