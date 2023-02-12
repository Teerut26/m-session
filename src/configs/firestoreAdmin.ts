import { getFirestore } from "firebase-admin/firestore";
import firebaseAdmin from "./firebaseAdmin";

const dbAdmin = getFirestore(firebaseAdmin);

export default dbAdmin