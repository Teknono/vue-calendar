<template>
  <section class="section" v-cloak>
    <nav class="breadcrumb">
      <ul>
        <li>
          <router-link to="/" class="button is-link">Menu principal</router-link>
        </li>
        <li class="is-active">
          <a> {{$route.params.id}}</a>
        </li>
      </ul>
    </nav>
    <hr>
    <article class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="image">
        </p>
        <hr>
        <p>
          <span class="icon">
            <i class="fa fa-play-circle"></i>
          </span> {{artist.stats.playcount | numberWithCommas}}</p>
        <p>
          <span class="icon">
            <i class="fa fa-headphones"></i>
          </span> {{artist.stats.listeners | numberWithCommas}}</p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <h1 class="title">{{$route.params.id}}</h1>
            <h2 class="subtitle is-6">{{artist.bio.published}}</h2>
          </p>
          <p>{{artist.bio.content}}</p>
        </div>
      </div>
      <div class="media-right">
        <span class="tag" :class="onTour">On Tour</span>
      </div>
    </article>
  </section>
</template>

<script>
import { numberWithCommas } from '../utils'
import { db, peopleRef } from '../utils/firebase'

export default {
  created() {
    this.findArtist()
  },
  data() {
    return {
      artist: {}
    }
  },
  firebase() {
    return {
      artistRef: peopleRef
    }
  },
  watch: {
    '$route': 'findArtist'
  },
  computed: {
    onTour() {
      return {
        'is-success': this.artist.ontour === "1",
        'is-danger': this.artist.ontour !== "1"
      }
    },
    image() {
      return '' /*this.artist.image[2]['#text']*/
    },
  },
  filters: {
    numberWithCommas(value) {
      return numberWithCommas(value)
    }
  },
  methods: {
    findArtist() {
      const method = "artist.getinfo"
      const mbid = decodeURIComponent(this.$route.params.id)
      const apiLastFm = `http://ws.audioscrobbler.com/2.0/?method=${method}&artist=${mbid}&api_key=dad46f2867c8fbc2a0bd6e78a09805af&format=json`
      this.$http.get(apiLastFm)
        .then(response => {
          this.artist = response.data.artist
          return this.artist
        })
        .then(artist => {
          this.$firebaseRefs.artistRef.child(artist.name).update({ content: artist.bio.content })
        })
        .catch(response => console.error(response))
    }
  }
}
</script>
