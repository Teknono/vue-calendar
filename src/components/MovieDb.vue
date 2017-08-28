<template>
  <section class="section">
    <div class="container">
      <div class="field">
        <label class="label">Recherche</label>
        <div class="control">
          <input type="text" class="input" v-model="query" placeholder="Search..." @keydown.enter="fetchMovie">
        </div>
      </div>
    </div>
    <div class="container">
      <pre>{{$data}}</pre>
    </div>
  </section>
</template>

<script>
import { KEY, URL } from '../../moviedb.key'

export default {
  mounted() {
    this.authenticate()
  },
  data() {
    return {
      query: '',
      message: {},
      token: '',
      sessionId: ''
    }
  },
  methods: {
    session() {
      this.$http.get(URL + 'authentication/session/new', {
        params: {
          api_key: KEY,
          request_token: this.token
        }
      })
      .then(response => this.sessionId = this.response)
    },
    authorize() {
      this.$http.get(`https://www.themoviedb.org/authenticate/${this.token}`)
        .then(response => console.log(response))
        .catch(error => console.error(error))
    },
    authenticate() {
      this.$http.get(URL + 'authentication/token/new', {
        params: {
          api_key: KEY
        }
      })
        .then(response => { this.token = response.data.request_token })
        //.then(this.authorize)
        .then(this.session())
        .then(response => { console.log("ICI JE DOIS REGARDER", response) })
        .catch(error => { console.error(error) })
    }
  }
}
</script>
