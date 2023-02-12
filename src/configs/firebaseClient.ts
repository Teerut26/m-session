import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { env } from "../env/client.mjs";

// Initialize Firebase
const appClient = initializeApp(env.NEXT_PUBLIC_FIREBASE_CLIENT as any);
const analytics = getAnalytics(appClient);

export default appClient;