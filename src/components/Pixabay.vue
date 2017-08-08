<template>
  <section class="section">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field has-addons">
            <div class="control" :class="{'is-loading': isLoading}">
              <input class="input" type="text" placeholder="Search..." v-model="search" @keydown.enter="image">
            </div>
            <div class="control">
              <span class="select">
                <select v-model="selected" @change="image">
                  <option v-for="(type, index) in types" :key="index">{{type}}</option>
                </select>
              </span>
            </div>
            <div class="control">
              <a class="button is-primary" @click="image" :disabled="isLoading">
                Search
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="level-item">
        <label class="checkbox">
          <input type="checkbox" v-model="display">Affichage développeur</label>
      </div>
      <div class="level-item">
        <div class="tags" v-if="historySearch.length > 0">
          <transition-group name="tags" mode="out-in">
            <span class="tag is-primary" v-for="(tag, index) in historySearch" :key="index">{{tag}}
              <button class="delete is-small" @click="removeHistorySearch(tag)"></button>
            </span>
          </transition-group>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <a href="https://pixabay.com/">
            <img src="https://pixabay.com/static/img/logo.png" style="height:30px" alt="">
          </a>
        </div>
      </div>
    </nav>
    <hr>
    <div class="columns is-multiline is-mobile">
      <div class="column is-one-quarter-desktop is-one-third-tablet is-half-mobile" v-for="(prop, index) in message.hits" :key="index">
        <div class="card">
          <div class="card-image" @mouseover.stop="show = prop.id" @mouseout.stop="show = ''">
            <figure class="image">
              <img :src="prop.webformatURL" :height="prop.webformatHeight" :width="prop.webformatWidth" alt="">
            </figure>
            <transition name="fade">
              <nav class="level" v-if="show === prop.id">
                <div class="level-left">
                  <div class="level-item">
                    <span>{{prop.user}}</span>
                  </div>
                </div>

                <div class="level-right">
                  <div class="level-item">
                    <span class="icon">
                      <i class="fa fa-thumbs-o-up"></i>
                    </span>{{prop.likes}}</span>

                  </div>
                </div>
              </nav>
            </transition>
          </div>
          <div class="card-content" v-if="display">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48" v-if="prop.userImageURL">
                  <img alt="" :src="prop.userImageURL">
                </figure>
              </div>
              <div class="media-content is-desktop">
                <p class="title is-4">{{prop.user}}</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="tags">
              <transition-group name="tags" mode="out-in">
                <span class="tag is-primary" style="cursor:pointer" v-for="(tag, index) in formatTags(prop)" :key="index" @click="searchTag(tag)">{{tag}}</span>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LayoutModal>
      <ContentModal></ContentModal>
    </LayoutModal>
  </section>
</template>

<script>
import { naturalSort } from '@/utils'
import debounce from 'lodash.debounce'
import { KEY } from '../../pixabay.key'
import LayoutModal from './modal/LayoutModal'
import ContentModal from './modal/ContentModal'

export default {
  created() {
    this.image()
  },
  data() {
    return {
      types: ['all', 'photo', 'illustration', 'vector'],
      message: '',
      search: '',
      selected: 'all',
      show: false,
      historySearch: [],
      isLoading: false,
      display: false
    }
  },
  methods: {
    removeHistorySearch(tag) {
      this.historySearch = this.historySearch.filter(f => { return f !== tag })
      this.search = this.historySearch[this.historySearch.length - 1]
      this.image()
    },
    searchTag(tag) {
      this.search = tag
      this.image()
    },
    formatTags(prop) {
      return prop.tags.split(',').sort((a, b) => { return naturalSort(a, b) })
    },
    image() {
      this.isLoading = true
      this.$http.get('https://pixabay.com/api/', {
        params: {
          key: KEY,
          image_type: 'photo',
          lang: 'fr',
          orientation: 'horizontal',
          q: this.search,
          image_type: this.selected
        }
      })
        .then(response => { this.message = response.data })
        .then(() => this.message.hits = this.message.hits.sort((a, b) => { return naturalSort(a.webformatHeight, b.webformatHeight) }))
        .then(() => {
          if (this.search !== '' && this.search !== this.historySearch[this.historySearch.length - 1]) {
            this.historySearch.push(this.search)
          }
          this.isLoading = false
        })
        .catch(error => { this.message = error.data; this.isLoading = false })
    },
  }
}
</script>

<style lang="scss">
@import "./node_modules/bulma/sass/utilities/initial-variables";

span.tag.is-primary {
  transition: all 1s;
  display: inline-block;
}

.tags-enter,
.tags-leave-to
/* .list-complete-leave-active below version 2.1.8 */

{
  opacity: 0;
  transform: translateY(30px);
}

.tags-leave-active {
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all ease .25s;
}

.fade-enter,
.fade-leave-to {
  transform: translateY(15px);
  opacity: 0
}

.card-image {

  overflow: hidden;

  .level {
    position: absolute;
    left: 0;
    right: 0;
    padding: 10px 10px 8px;
    bottom: 0px;
    background: linear-gradient(to top, rgba(0, 0, 0, .6) 0, rgba(0, 0, 0, 0) 100%);
    font-size: 14px;
    color: #fff
  }
}
</style>

