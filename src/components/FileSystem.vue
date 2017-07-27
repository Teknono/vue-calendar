<template>
  <section class="section">
    <div class="container">
      <table class="table" v-if="artists.length > 0">
        <thead>
          <tr>
            <th v-for="(header,index) in Object.keys(artists[0])" :key="index">{{header}}</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tfoot></tfoot>
        <tbody>
          <tr v-for="(a, index) in artists" :key="index">
            <td v-for="(prop,index) in a" :key="index">{{prop}}</td>
            <td>
              <a class="button" @click="remove(a['.key'])">Ok</a>
            </td>
          </tr>
        </tbody>
      </table>
      <!--<pagination :totalItems="artists" :itemPerPages="itemPerPage" @changepage="updateCurrentPage"></pagination>-->
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import pagination from './Pagination'

import { db } from '../utils/firebase'

import VueFire from 'vuefire'
Vue.use(VueFire)
var artistRef = db.ref('people')
export default {
  firebase() {
    return {
      artists: artistRef
    }
  },
  data() {
    return {
      itemPerPage: 10,
      currentPage: 0
    }
  },
  components: {
    pagination
  },
  computed: {
    paginateArtist() {
      // const artistsclone = {...artistRef}
      // return artistsclone.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }
  },
  methods: {
    remove(child) {
      this.$firebaseRefs.artists.child(child).remove()
    },
    updateCurrentPage() {

    }
  }


}
</script>

