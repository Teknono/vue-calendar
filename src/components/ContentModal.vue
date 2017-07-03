<template>
  <div class="box">
    <div class="field">
      <p class="control has-icons-left">
        <span class="select is-fullwidth">
          <select>
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
            <button class="button is-primary">
              Valider
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

class Reason {

  constructor(code, label) {
    this.code = code
    this.label = label
  }

  render() {
    return { code: this.code, label: this.label }
  }
}

export default {
  name: "ContentModal",
  data() {
    return {
      reasons: [
        new Reason('F', 'Formation').render(),
        new Reason('I', 'Intercontrat').render(),
        new Reason('CP', 'Congé payé').render(),
        new Reason('CSS', 'Congé sans solde').render(),
        new Reason('M', 'Maladie').render(),
        new Reason('ABS', 'Absence exceptionnelle payée').render(),
        new Reason('RTTE', 'RTT Employeur').render(),
        new Reason('RTTS', 'RTT Salarié').render()].sort((a, b) => a.code > b.code)
    }
  },
  methods: {
    close() {
      this.$store.commit('toggleModal')
    }
  }
}
</script>

