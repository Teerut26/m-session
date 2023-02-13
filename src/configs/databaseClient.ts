import { getDatabase } from "firebase/database";
import appClient from "./firebaseClient";
const databaseClient = getDatabase(appClient);

export default databaseClient;