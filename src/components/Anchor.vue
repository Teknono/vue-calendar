<script>
export default {
  name : "anchor-films",
  render(createElement) {
    return createElement("a", [{
      attrs : {
        href: this.href
      },
      domProps : {
        innerHtml : this.shortUrl(this.value)
      }
        }])
  },
  props : ["href","value"],
  methods: {
    shortUrl(u) {
      const uend = u.slice(u.length - 15);
       const ustart = u.replace('http://', '').replace('https://', '').substr(0, 32);
       var shorter = ustart + '...' + uend;
       console.log(shorter)
       return shorter;
    }
  }
}

</script>
