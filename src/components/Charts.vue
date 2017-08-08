<template>
  <section class="section">
    <div class="container Chart">
      <Charts :chart-data="dataCollection" :options="options" :width="400" :height="200" v-if="lolo.length"> 0"></Charts>
      <span v-if="lolo.length === 0">No data here</span>
    </div>
    <div class="container">
      <button class="button" v-for="(prop, index) in Object.keys(lolo[0]).filter(f => f === 'playcount' || f === 'listeners')" :key="index" @click="sortResult(prop)">{{prop}}</button>
    </div>
  </section>
</template>

<script>
import Charts from '@/utils/charts'
import Vue from "vue"
import { db, peopleRef } from '@/utils/firebase'

var lineCanvas = function () {
  this.gradient = document.getElementById('line-chart').getContext('2d').createLinearGradient(0, 0, 0, 450)
  this.gradient2 = document.getElementById('line-chart').getContext('2d').createLinearGradient(0, 0, 0, 450)

  this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
  this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
  this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

  this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
  this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
  this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

}

export default {
  mounted() {
    this.onRemove()
    this.onAdded()

    this.gradient = document.getElementById('line-chart').getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = document.getElementById('line-chart').getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

  },
  components: {
    Charts
  },
  data() {
    return {
      lolo: [],
      gradient: null,
      gradient2: null,
      sortAsc: true,
      sortBy: ''
    }
  },
  computed: {
    options() {
      return {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
          text: 'Last Fm Statistics'
        },
        scales: {
          yAxes: [{
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "left",
            id: "y-axis-1",
          }, {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            display: true,
            position: "right",
            id: "y-axis-2",

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    },
    dataCollection() {
      return {
        labels: this.lolo.map(l => { return l.name }),
        datasets: [
          {
            label: 'Listeners',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: this.lolo.map(l => { return l.listeners }),
            yAxisID: "y-axis-1",


          },
          {
            label: 'Playcount',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            backgroundColor: this.gradient,
            data: this.lolo.map(l => { return l.playcount }),
            yAxisID: "y-axis-2",

          },
        ]
      }
    }
  },
  firebase() {
    return {
      artists: peopleRef
    }
  },
  methods: {
    onRemove() {
      const self = this
      peopleRef.on('child_removed', function (snapshot) {
        self.lolo = self.lolo.filter(elem => { return elem.name !== snapshot.val().name })
      })
    },
    onAdded() {
      const self = this
      peopleRef.on('child_added', function (snapshot) {
        self.lolo.push(snapshot.val())
      })
    },
    sortResult(attribute) {
      if (this.sortBy === attribute) {
        this.sortAsc = !this.sortAsc
      } else {
        this.sortBy = attribute
        this.sortAsc = true
      }

      return this.lolo.sort((a, b) => {
        if (this.sortAsc) {
          [a, b] = [b, a]
        }
        if (Number(a[attribute]) < Number(b[attribute])) {
          return -1
        }
        else if (Number(a[attribute]) > Number(b[attribute])) {
          return 1
        }
        else {
          return 0
        }
      })
    }
  }
}
</script>

<style>
.Chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin: 25px 0;
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color: rgba(255, 0, 0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>

