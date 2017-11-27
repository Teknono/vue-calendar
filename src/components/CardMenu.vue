<template>
  <div class="card">
    <header class="card-header is-centered">
      <p class="card-header-title">
        {{nom}}
      </p>
      <span class="icon" @click="deleteMenu" style="cursor:pointer">
        <i class="fa fa-trash"></i>
      </span>
    </header>
    <div class="card-content">
      <div class="content">
        <p>{{entree | prefix("Entree")}}</p>
        <p>{{plat | prefix("Plat")}}</p>
        <p>{{dessert | prefix("Dessert")}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["nom", "entree", "plat", "dessert"],
  filters: {
    prefix(value, preValue) {
      if(value) 
        return `${preValue} : ${value}`
    }
  },
  computed: {
    isDangerClass() {
      return this.class
    }
  },
  methods: {
    deleteMenu() {
      this.$emit("deleteMenu", {
        nom: this.nom
      })
    }
  }
}
</script>

