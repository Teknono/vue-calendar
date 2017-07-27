<template>
    <div class="box">
      <article class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img :src="image" alt="">
          </figure>
        </div>
        <div class="media-content is-hidden-mobile">
          <div class="content">
            <p>
              <strong>{{people.name}}</strong>
            </p>
          </div>
        </div>

      </article>
    </div>
</template>

<script>

export default {
  props: ["people"],
  name: "box",
  data() {
    return {}
  },
  computed: {
    image() {
      return this.people.image[2]['#text']
    }
  }

}
</script>

