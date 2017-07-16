<template>
  <div>
    <div class="container">
      <div class="field is-grouped">
        <p class="control">
          <a @click="isActive = !isActive" class="button">Affichage</a>
        </p>
      </div>
    </div>
    <section class="section" v-show="people.length > 0">
      <div class="container">
        <div class="columns field is-grouped-centered">
          <div class="column" v-for="(attribute, index) in attributes" :key="index">
            <a class="button is-primary" :class="{'is-active' : currentlySorting(attribute)}" @click="sortPeople(attribute)">
              <span>{{attribute}}</span>
              <span class="icon">
                <i class="fa" :class="arrowSort(attribute)"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
      <hr>
      <transition-group name="swapi" tag="div" class="columns is-multiline is-mobile">
        <div class="column is-12-desktop is-one-third-tablet is-one-quarter-mobile" :class="{'is-one-third' : isActive}" v-for="(p, index) in paginatePeople" :key="index">
          <a @click="goto(index)" v-if="people[index].name">
            <box :people="p" v-if="!isActive"></box>
            <card :people="p" v-else></card>
          </a>
        </div>
      </transition-group>
      <pagination :totalItems="people" :itemPerPages="itemPerPage" @changepage="updateCurrentPage"></pagination>
    </section>
  </div>
</template>

<script>

import Vue from "vue"
import box from './Box'
import card from './Card'
import pagination from './Pagination'
import router from '../router'

export default {
  mounted() {
    this.fetchPeople()
  },
  data() {
    return {
      people: [],
      isActive: false,
      sortAsc: true,
      sortBy: "",
      itemPerPage: 10,
      currentPage: 1,
      artist: {}
    }
  },
  computed: {
    attributes() {
      if (this.people.length > 0)
        return Object.keys(this.people[0])
    },
    paginatePeople() {
      let peopleTemp = this.people
      return peopleTemp.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }
  },
  components: {
    box, card, pagination
  },
  methods: {
    goto(index) {
      router.push({name : "Detail", params: {id : this.people[index].name}})
    },
    updateCurrentPage(payload) {
      this.currentPage = payload
    },

    arrowSort(attribute) {
      return {
        'fa-arrow-circle-up': this.sortAsc && this.currentlySorting(attribute),
        'fa-arrow-circle-down': !this.sortAsc && this.currentlySorting(attribute)
      }
    },

    currentlySorting(header) {
      return header === this.sortBy
    },

    sortPeople(attribute) {
      if (this.sortBy === attribute) {
        this.sortAsc = !this.sortAsc
      } else {
        this.sortBy = attribute
        this.sortAsc = true
      }

      this.people.sort((a, b) => {
        if (this.sortAsc) {
          [a, b] = [b, a]
        }
        if (a[attribute] < b[attribute]) {
          return -1
        }
        else if (a[attribute] > b[attribute]) {
          return 1
        }
        else {
          return 0
        }
      })
    },
    fetchPeople() {
      const api = `http://swapi.co/api/people/`
      const apiLastFm = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=dad46f2867c8fbc2a0bd6e78a09805af&format=json'
      this.$http.get(apiLastFm/*'http://api.brewerydb.com/v2/?key=0670efb6e5ec64a924718a98a988b026'*/)
        .then(response => { this.people = response.data.artists.artist })
        .catch(response => { console.log(response) })
    },
    findArtist(mbid) {
      const method = "artist.getinfo"
      const apiLastFm = `http://ws.audioscrobbler.com/2.0/?method=${method}&artist=${mbid}&api_key=dad46f2867c8fbc2a0bd6e78a09805af&format=json`
      this.$http.get(apiLastFm)
        .then(response => { console.log(response); this.artist = response.data.artist })
        .catch(response => console.error(response))
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
