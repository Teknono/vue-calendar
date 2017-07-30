<template>
  <div id="app" class="container">
    <nav class="nav">
      <div class="nav-left">
        <a class="nav-item is-brand">
          <img src="./assets/logo.png" alt="vuejs">
        </a>
      </div>
      <div class="nav-center"></div>
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
</script>

