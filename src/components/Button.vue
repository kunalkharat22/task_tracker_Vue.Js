<template>
  <button @click="onClick()" :style="{background: color}" class="btn">{{text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {
      this.$emit('btn-click')
    } // TODO add functionality for button click event.
  }
}
</script>