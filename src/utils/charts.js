import { Bar } from 'vue-chartjs'
import Vue from "vue"
import VueFire from 'vuefire'
import { db } from '../utils/firebase'

Vue.use(VueFire)

var peopleRef = db.ref('people')
// var lolo = []

export default Bar.extend({
  mounted() {
    this.bar()
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.lolo.map(l => { return l.name }),
      datasets: [
        {
          label: 'Last Fm Listeners',
          backgroundColor: '#f87979',
          data: this.lolo.map(l => { return l.listeners })
        },
        {
          label: 'Last Fm Playcount',
          // backgroundColor: '#f479',
          data: this.lolo.map(l => { return l.playcount })
        },
      ]
    })
  },
  data() {
    return {
      lolo: []
    }
  },
  firebase: {
    artists: peopleRef
  },
  computed: {

  },
  methods: {
    bar() {
      const self = this
      peopleRef.once('value', function (snapshot) {
        snapshot.forEach(function (child) {
          self.lolo.push(child.val())
        })
      })
    }
  }
})
