import firebase from "firebase/app"
import 'firebase/firestore' 
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA2lFfexda89L5w0rrtz4P9qLQoainbakg",
  authDomain: "vue-chat-19258.firebaseapp.com",
  projectId: "vue-chat-19258",
  storageBucket: "vue-chat-19258.appspot.com",
  messagingSenderId: "854474666704",
  appId: "1:854474666704:web:2790770a3359177353e4d5"
};

firebase.initializeApp(firebaseConfig)  

const auth = firebase.auth()
const firestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const storage = firebase.storage()

export { firestore, timestamp, auth, storage }
