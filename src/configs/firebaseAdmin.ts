import { env } from "@/env/server.mjs";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(env.FIREBASE_ADMIN as string);
const config = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: env.FIREBASE_DATABASE_URL,
};

let appAdmin: admin.app.App;

if (!admin.apps.length) {
    appAdmin = admin.initializeApp(config);
} else {
    appAdmin = admin.app();
}

export default appAdmin;