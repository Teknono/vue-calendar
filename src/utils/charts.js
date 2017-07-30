import { Bar, Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Line.extend({
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {

    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
  },
})
