<template>
  <div id="app" class="container">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item is-brand">
          <img src="./assets/logo.png" alt="vuejs">
        </a>
      </div>
      <div class="nav-center"></div>
      <span id="nav-toggle" class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
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
        <router-link to="/Gmap" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-globe"></i>
          </span>Maps</router-link>
        <router-link to="/Netatmo" class="nav-item is-tab">
          <span class="icon">
            <i class="fa fa-sun-o"></i>
          </span>Weather</router-link>
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

export default {
  name: 'app',
  data() {
    return {
      transitionClass: ""
    }
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionClass = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
}
</script>

