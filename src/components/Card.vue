<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <vue-lazy-img :source="image()" placeholder=""></vue-lazy-img>
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="image(0)" alt="">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{people.name}}</p>
          <p class="subtitle is-6">Playcount : {{people.playcount}}</p>
          <!--<p class="subtitle is-6" v-for="(attribute, index) in Object.keys(people)" :key="index">{{attribute}} : {{people[attribute]}}</p>-->

        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item"><span>View on <a :href="people.url">{{people.url}}</a></span></p>
    </footer>
  </div>
</template>

<script>
import VueLazyImg from 'vue-lazy-img';
var numeral = require('numeral')

export default {
  props: ["people"],
  components: {
    VueLazyImg
  },
  methods: {
    numeral(value) {
      return numeral(value).format('0,0')
    }
  },
  methods: {
    image(size = 4) {
      return this.people.image[size]["#text"]
    }
  }
}
</script>

