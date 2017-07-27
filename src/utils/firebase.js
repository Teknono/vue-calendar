import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAbNwGU25UEK-LjdAWmO7TGWDESUv3Ycw0",
  authDomain: "necci-project.firebaseapp.com",
  databaseURL: "https://necci-project.firebaseio.com",
  projectId: "necci-project",
  storageBucket: "",
  messagingSenderId: "265968416777"
})

export const db = firebaseApp.database()
