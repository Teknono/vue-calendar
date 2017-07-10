<template>
  <div class="hello">
    <div class="block">
      <a @click="fetchPeople" class="button">Remplir </a>
    </div>
    <div class="container is-fluid">

      <transition-group name="swapi" tag="div" class="columns is-multiline is-mobile">
        <div @click="isActive = !isActive" class="column is-12-desktop is-one-third-tablet is-one-quarter-mobile" :class="{'is-one-third' : isActive}" v-for="p in people" :key="p">
          <box :people="p" v-if="!isActive"></box>
          <card :people="p" v-else></card>
        </div>
      </transition-group>
    </div>

  </div>
</template>

<script>

import Vue from "vue"
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

import box from './Box'
import card from './Card'
import _ from "lodash"
var VueResource = require('vue-resource')

Vue.use(VueResource);

export default {
  name: 'hello',
  data() {
    return {
      people: [],
      peopleNumber: 0,
      message: "coucou",
      isActive: false
    }
  },
  components: {
    box, card
  },
  methods: {
    fetchPeople() {
      const api = `http://swapi.co/api/people/`
      const apiLastFm = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=dad46f2867c8fbc2a0bd6e78a09805af&format=json'
      this.$http.get(apiLastFm/*'http://api.brewerydb.com/v2/?key=0670efb6e5ec64a924718a98a988b026'*/)
        .then(response => { console.log(response);this.people = response.data.artists.artist.sort((a,b) => b.playcount - a.playcount) })
        .catch(response => { console.log(response) })

      //const api = "http://api.brewerydb.com/v2/?key=0670efb6e5ec64a924718a98a988b026"

      // axios.get(api)
      //   .then(response => {
      //     console.log(response)
      //     // this.people = _.sortBy(response.data.results, o => { console.log(o) });

      //   }, 'jsonp')
      //   .catch(error => { console.log(error); this.people = [] })
    }
  }
}
</script>

<style>
.swapi-enter-active,
.swapi-leave-active {
  transition: all 1s;
}

.swapi-enter,
.swapi-leave-to
/* .list-leave-active for <2.1.8 */

{
  opacity: 0;
  transform: translateY(30px);
}

.swapi-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.swapi-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
  position: absolute;
}

.swapi-move {
  transition: transform .5s;
}

.swapi-data-enter-active {
  animation: fadeInUp .5s;
}

.swapi-data-leave-active {
  animation: bounce-out .5s;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>-->
