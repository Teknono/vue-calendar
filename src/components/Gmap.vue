<template>
  <div class="container">
    <gmap-map style="width: 100%; height: 100%; position: absolute; left:0; top:0" :center="{lat: 1.38, lng: 103.8}" :zoom="12">

    </gmap-map>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: 'AIzaSyD3vS5bU986HJTXvDFJHBV92Ug5sz3LlYA',
  v : '3.28'
})

export default {
  name: 'gmap',
  watch: {
    '$route'(to, from) {
      // Call resizePreserveCenter() on all maps
      Vue.$gmapDefaultResizeBus.$emit('resize')
    }
  }
}
</script>

