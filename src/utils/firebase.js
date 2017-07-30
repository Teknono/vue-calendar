import Vue from 'vue'
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

export const peopleRef = db.ref('people')

export const mixinFirebase = {
  mounted() {
    console.log('mixin chargé')
  },
  firebase() {
    return {
      ref: db.ref('people')
    }
  },
  methods: {
    remove(child) {
      this.$firebaseRefs.ref.child(child).remove()
    }
  }
}
