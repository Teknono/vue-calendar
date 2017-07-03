<template>
  <div class="modal" :class="{'is-active' : isActive}">
    <div @click="close" class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <button @click="close" class="modal-close"></button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "LayoutModal",
  created() {
    const that = this
    document.addEventListener("keydown", e => {
      if (e.keyCode === 27)
        that.close()
    })
  },
  computed: {
    ...mapState({
      isActive: state => state.isActive
    })
  },
  methods: {
    close() {
      this.$store.commit('toggleModal')
    }
  }
}
</script>

