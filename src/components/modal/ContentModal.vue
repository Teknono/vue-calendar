<template>
  <div class="box">
    <div class="field">
      <p class="control has-icons-left">
        <span class="select is-fullwidth">
          <select v-model="selected">
            <option v-for="reason in reasons" :key="reason.code" :value="reason.code">{{reason.label}}</option>
          </select>
        </span>
        <span class="icon is-small is-left">
          <i class="fa fa-globe"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <div class="field-body">
        <div class="field is-grouped">
          <p class="control">
            <button @click="close" class="button is-link">
              Annuler
            </button>
          </p>
          <p class="control">
            <button @click="validate" class="button is-primary">
              Valider
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selected : ""
    }
  },
  computed: {
    ...mapGetters(['reasons'])
  },
  methods: {
    close() {
      this.$store.commit('toggleModal')
    },
    validate() {
      this.$store.dispatch('addEvent', this.selected)
      this.selected = ""
      this.close()
    }
  }
}
</script>

