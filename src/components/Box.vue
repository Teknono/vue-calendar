<template>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="http://bulma.io/images/placeholders/128x128.png" alt="">
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ people.name }}</strong>
              <br> {{people.hair_color}}
            </p>
            <nav class="level is-mobile">
              <div class="level-left">
                <a :href="movie" class="level-item" v-for="movie in people.films" :key="movie">{{movie}}</a>
              </div>
            </nav>
          </div>
        </div>

      </article>
    </div>
</template>

<script>
import anchorfilms from "./Anchor"

export default {
  props: ["people"],
  name: "box",
  components: { anchorfilms },
  data() {
    return {}
  }

}
</script>

