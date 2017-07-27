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
          </span> {{format(artist.stats.playcount)}}</p>
        <p>
          <span class="icon">
            <i class="fa fa-headphones"></i>
          </span> {{format(artist.stats.listeners)}}</p>
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
import { db } from '../utils/firebase'

export default {
  created() {
    this.findArtist()
  },
  data() {
    return {
      artist: {}
    }
  },
  // firebase: {
  //   artistRef: db.ref('people')
  // },
  // watch: {
  //   '$route': 'findArtist'
  // },
  computed: {
    onTour() {
      console.log('ontour', this.artist)
      return {
        'is-success': this.artist.ontour === "1",
        'is-danger': this.artist.ontour !== "1"
      }
    },
    image: {
      get() {
        console.log(this.artist)
        return '' //Object.values(this.artist.image[2])[0]
      }
    },
  },
  methods: {

    format(value) {
      return numberWithCommas(value)
    },
    findArtist() {
      const method = "artist.getinfo"
      const mbid = decodeURIComponent(this.$route.params.id)
      const apiLastFm = `http://ws.audioscrobbler.com/2.0/?method=${method}&artist=${mbid}&api_key=dad46f2867c8fbc2a0bd6e78a09805af&format=json`
      this.$http.get(apiLastFm)
        .then(response => {
          console.log('artist => ', response.data.artist)
          this.artist = response.data.artist
          this.$firebaseRefs.artistRef.child(response.data.artist.name).update({ content: response.data.artist.bio.content })
        })
        .catch(response => console.error(response))
    }
  }
}
</script>
