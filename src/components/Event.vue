<template>
  <span class="event tag">{{event}}<button class="delete is-small"></button></span>
</template>

<script>
export default {
  name: 'Event',
  props: ["event"]
}
</script>

