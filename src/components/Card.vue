<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="people.image[4]['#text']" alt="">
      </figure>
    </div>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="people.image[0]['#text']" alt="">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{people.name}}</p>
          <p class="subtitle is-6">{{numeral(people.playcount)}}</p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item"><span>View on <a :href="people.url">{{people.url}}</a></span></p>
    </footer>
  </div>
</template>

<script>
var numeral = require('numeral')

export default {
  props: ["people"],
  methods: {
    numeral(value) {
      return numeral(value).format('0,0')
    }
  }
}
</script>

