<template>
  <div id="app container is-fluid">
    <div class="container">
      <nav class="nav has-shadow">
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
          <router-link to="/" class="nav-item">
            <span class="icon">
              <i class="fa fa-home"></i>
            </span>Mes informations</router-link>
          <router-link to="/Calendar" class="nav-item">
            <span class="icon">
              <i class="fa fa-calendar"></i>
            </span>Calendrier</router-link>
          <router-link to="/Gmap" class="nav-item">
            <span class="icon">
              <i class="fa fa-globe"></i>
            </span>Maps</router-link>
          <router-link to="/Netatmo" class="nav-item">
            <span class="icon">
              <i class="fa fa-sun-o"></i>
            </span>Netatmo</router-link>
        </div>
      </nav>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
require('bulma')
require('font-awesome-webpack')
require('./assets/Font-face/stylesheet.css')

export default {
  name: 'app'
}
</script>

