<template>
  <div id="app" class="container">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item is-brand">
          <img src="./assets/logo.png" alt="vuejs">
        </a>
        <transition enter-active-class="animated slideInLeft" leave-active-class="animated fadeOut" mode="out-in">
          <span class="tag is-danger">{{firebaseEvent}}</span>
        </transition>
      </div>
      <div class="nav-center"></div>
      <span id="nav-toggle" class="nav-toggle">

      </span>
      <div id="nav-menu" class="nav-right nav-menu">
        <router-link to="/" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-lastfm"></i>
          </span>Last FM</router-link>
        <router-link to="/Calendar" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-calendar"></i>
          </span>Calendrier</router-link>
        <router-link to="/FileSystem" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-floppy-o"></i>
          </span>Files</router-link>
        <router-link to="/Netatmo" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-sun-o"></i>
          </span>Weather</router-link>
          <router-link to="/Charts" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-line-chart"></i>
          </span>Charts</router-link>
      </div>
    </nav>
    <div class="container">
      <transition enter-active-class="animated slideInLeft" leave-active-class="animated fadeOut" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>
</template>

<script>
require('bulma')
require('font-awesome-webpack')
require('./assets/Font-face/stylesheet.css')
require("animate.css")
import { db } from './utils/firebase'



export default {
  mounted() {
    db.ref('people').on("child_changed", (el) => {
      this.firebaseEvent = el.key
    })

  },
  name: 'app',
  data() {
    return {
      transitionClass: "",
      firebaseEvent: ""
    }
  },
  computed: {
    onLine() {
      return !window.navigator.onLine
    }
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionClass = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

