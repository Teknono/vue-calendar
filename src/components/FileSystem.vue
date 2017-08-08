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
              <a class="button" @click="remove(a.name)">Ok</a>
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
import { naturalSort } from '@/utils'

export default {
  created() {
    this.onAdded()
    this.onRemove()
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
    onRemove() {
      var self = this
      this.$firebaseRefs.ref.on('child_removed', snapshot => {
        this.artists = this.artists.filter(a => { return a.name !== snapshot.val().name })
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

      this.artists.sort((a, b) => { return naturalSort(a[attribute], b[attribute], this.sortAsc) })

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

