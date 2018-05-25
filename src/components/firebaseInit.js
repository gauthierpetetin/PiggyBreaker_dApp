import firebase from 'firebase'
import 'firebase/firestore'
// Initialize Firebase
let firebaseConfig = process.env.FIRESTORE_APIKEY
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()
