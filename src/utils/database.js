import { initializeApp } from "firebase-admin/app";
import { readFileSync } from "fs";

initializeApp({
  credential: admin.credential.cert(
    JSON.parse(readFileSync(process.env.SERVICE_ACCOUNT))
  ),
  // The database URL depends on the location of the database
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: "my-service-worker",
  },
});

var db = admin.database();
var ref = db.ref("/public_resource");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});
