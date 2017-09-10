<template>
  <section class="section">
    <div class="columns">
      <div class="column" @dragover.prevent @dragenter="dragenter($event)" @dragleave="reset" @drop.prevent="drop($event)">
        First Column
        <div class="card" id="toDrag" draggable="true" @drag.stop.prevent="drag($event)" @dragend="dragend($event)">

          <div class="card-image">
            <figure class="image is-4by3">
              <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="http://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">John Smith</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>@bulmaio</a>.
              <a href="#">#css</a>
              <a href="#">#responsive</a>
              <br>
              <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
        </div>

      </div>
      <div class="column" @dragover.prevent @dragenter="dragenter($event)" @dragleave="reset" @drop.prevent="drop($event)">Second Column</div>
    </div>

  </section>
</template>
<script>
export default {
  data() {
    return {
      elementId: ''
    }
  },
  methods: {
    reset(event) {
      event.target.style.borderWidth = ''
      event.target.style.borderStyle = ''
    },
    dragend(event) {
      event.target.style.opacity = ''

    },
    dragenter(event) {
      if (event.target.classList.contains('column')) {
        event.target.style.borderWidth = '1px'
        event.target.style.borderStyle = 'dashed'

        console.log("je survole", event.target.innerText)
      }
    },
    drag(event) {
      event.target.style.opacity = 0.4
      this.elementId = event.target.id
    },
    drop(event) {
      event.target.appendChild(document.getElementById(this.elementId))
      this.reset(event)

    }
  }
}
</script>

