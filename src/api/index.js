import Firebase from './Firebase'

const FStorage = Firebase.storage();
const Database = Firebase.database();
const Firestore = Firebase.firestore();
const settings = {};
Firestore.settings(settings);
const Messaging = Firebase.messaging();
const Functions = Firebase.functions();

export {
    Firebase,
    FStorage,
    Database,
    Firestore,
    Messaging,
    Functions
}