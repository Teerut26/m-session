import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { env } from "../env/client.mjs";

// Initialize Firebase

const appClient = initializeApp({
  apiKey: "AIzaSyBSENSBfLZKpvGt3FEwcFk6qDs4ol-ykp4",
  authDomain: "m-session-dad13.firebaseapp.com",
  databaseURL:
    "https://m-session-dad13-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "m-session-dad13",
  storageBucket: "m-session-dad13.appspot.com",
  messagingSenderId: "467438346283",
  appId: "1:467438346283:web:452af619ff3061dd7bca6e",
  measurementId: "G-ZDP0TGFW7J",
});
// const analytics = getAnalytics(appClient);

export default appClient;
