import { getDatabase, ref, set } from "firebase/database";

function writeUserData( name, email, message) {
  const db = getDatabase();
  set(ref(db, 'contact/' + userId), {
    name: name,
    email: email,
    message : message
  });
}