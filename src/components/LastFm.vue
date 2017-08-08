<template>
  <div>
    <div class="container">
      <div class="field is-grouped">
        <p class="control">
          <a @click="isActive = !isActive" class="button">Affichage</a>
        </p>
        <p class="control">
        </p>
      </div>
    </div>

    <section class="section" v-if="networkError">
      <p>Sorry, there was an error getting artists</p>
    </section>
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
      <transition-group name="swapi" tag="div" class="columns is-multiline is-mobile" appear>
        <div class="column is-12-desktop is-one-third-tablet is-one-quarter-mobile" :class="{'is-one-third' : isActive}" v-for="(p, index) in paginateItems" :key="index">
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
import box from './lastFm/Box'
import card from './lastFm/Card'
import pagination from './Pagination'
import loadingTop from './lastFm/Loading'
import router from '@/router'
import { db, peopleRef } from '@/utils/firebase'
import { naturalSort } from '@/utils'
import { KEY } from '../../lastfm.key'

export default {
  created() {
    this.fetchPeople()
  },
  firebase: {
    artists: peopleRef
  },
  data() {
    return {
      people: [],
      isActive: false,
      sortAsc: true,
      sortBy: "",
      itemPerPage: 9,
      currentPage: 1,
      artist: {},
      networkError: false,
      isLoading: false,
      paginateItems: []

    }
  },
  computed: {
    attributes() {
      if (this.people.length > 0)
        return Object.keys(this.people[0])
    }
  },
  components: {
    box, card, pagination, loadingTop
  },
  methods: {
    goto(index) {
      router.push({ name: "Detail", params: { id: this.paginateItems[index].name } })
    },

    updateCurrentPage(payload) {
      if (payload) {
        this.paginateItems = payload.collection
      }
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

      this.paginateItems = this.people.sort((a, b) => { return naturalSort(a[attribute], b[attribute], this.sortAsc) }).slice(1, this.itemPerPage)
    },

    fetchPeople() {
      this.isLoading = true
      const apiLastFm = 'http://ws.audioscrobbler.com/2.0/'
      this.$http.get(apiLastFm, {
        params: {
          method: 'chart.gettopartists',
          key: KEY,
          format: 'json'
        }
      })
        .then(response => {
          this.people = response.data.artists.artist;
          this.paginateItems = this.people.slice(0, this.itemPerPage)
          this.isLoading = false
        })
        .then(() => {
          this.people.forEach((p, index) => {
            let pref = Object.assign({}, p)
            delete pref.image
            peopleRef.child(p.name).set(pref)
          })
        })
        .catch(response => {
          console.log(response);
          this.networkError = true;
          this.isLoading = false
        })
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
.swapi-leave-to {
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
