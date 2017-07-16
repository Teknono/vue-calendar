<template>
  <nav class="pagination is-centered">
    <a class="pagination-previous" @click="previousPage" :disabled="clickPage == 1">Previous page</a>
    <a class="pagination-next" @click="nextPage" :disabled="clickPage == totalPages">Next page</a>
    <ul class="pagination-list" v-show="totalPages >0">
      <li v-for="n in totalPages" :key="n">
        <a class="pagination-link" :class="{'is-current' : currentlyPage(n)}" @click="setCurrentPage(n)">{{n}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['itemPerPages', 'totalItems'],
  data() {
    return {
      clickPage: 1
    }
  },
  computed: {
    totalPages() {
      if (this.itemPerPages && this.itemPerPages > 0)
        return Math.ceil(this.totalItems.length / this.itemPerPages)
      return 0
    }
  },
  watch: {
    clickPage() {
      this.$emit("changepage", this.clickPage)
    }
  },
  methods: {
    currentlyPage(page) {
      return this.clickPage === page
    },
    setCurrentPage(currentPage) {
      this.clickPage = currentPage
    },
    previousPage() {
      if (this.clickPage > 1) {
        this.clickPage--
      }

    },
    nextPage() {
      if (this.clickPage < this.totalPages) {
        this.clickPage++
      }
    }
  }
}
</script>
