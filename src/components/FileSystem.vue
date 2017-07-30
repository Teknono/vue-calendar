<template>
  <section class="section">
    <div class="container">
      <table class="table" v-if="artists.length > 0">
        <thead>
          <tr>
            <th v-for="(header,index) in Object.keys(artists[0])" :class="{'asc' : sortAsc, 'desc' : !sortAsc, 'is-active' : header === sortBy}" :key="index" @click="sort(header)">{{header}}</th>
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
    </div>
  </section>
</template>

<script>
import { db } from '@/utils/firebase'
import orderBy from 'lodash.orderby'

export default {
  created() {
    this.onAdded()
  },
  firebase() {
    return {
      ref: db.ref('people')
    }
  },
  data() {
    return {
      sortBy: '',
      sortAsc: true,
      artists: []
    }
  },
  methods: {
    onAdded() {
      var self = this
      this.$firebaseRefs.ref.on('child_added', snapshot => {
        self.artists.push(snapshot.val())
      })
    },
    remove(child) {
      this.$firebaseRefs.ref.child(child).remove()
    },
    sort(attribute) {
      if (this.sortBy === attribute) {
        this.sortAsc = !this.sortAsc
      } else {
        this.sortBy = attribute
        this.sortAsc = true
      }
      this.artists = orderBy(this.artists,[attribute],[this.sortAsc ? 'asc' : 'desc'])

    }
  }
}
</script>

<style>
.is-active.asc::after {
  content: "▼"
}

.is-active.desc::after {
  content: "▲"
}
</style>

