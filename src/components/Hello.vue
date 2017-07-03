<template>
  <div class="hello">
    <div class="block">
      <a @click="fetchPeople" class="button">Remplir </a>
    </div>
    <div class="container is-fluid">

      <transition-group name="swapi" tag="div" class="columns is-desktop is-multiline is-mobile">
        <div class="column is-half-mobile is-one-third-tablet is-one-third-desktop" v-for="p in people" :key="p">
          <box :people="p"></box>
        </div>
      </transition-group>
    </div>

  </div>
</template>

<script>

import box from './Box'
import _ from "lodash"
import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios)

export default {
  name: 'hello',
  data() {
    return {
      people: [],
      peopleNumber: 0,
      message: "coucou"
    }
  },
  components: {
    box
  },
  methods: {
    fetchPeople() {
      const api = `http://swapi.co/api/people/`

      axios.get(api)
        .then(response => {
          this.people = _.sortBy(response.data.results, o => { return o.name });

        })
        .catch(error => { console.log(error); this.people = [] })
    }
  }
}
</script>

<style>
.swapi-enter-active, .swapi-leave-active {
  transition: all 1s;
}
.swapi-enter, .swapi-leave-to /* .list-leave-active for <2.1.8 */ {
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
  transition: transform 1s;
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
