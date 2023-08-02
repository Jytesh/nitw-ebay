import { Auth, useAuth } from "@/utils/authentication";

export default function Home() {
  useAuth(Auth.SIGNED_IN);
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "5%", fontSize: "300%" }}>
        NITW-EBAY
      </h1>
    </div>
  );
}
