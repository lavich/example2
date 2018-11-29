<template>
    <div :id="id" class="embed-responsive embed-responsive-16by9"></div>
</template>

<script>
import Clappr from 'clappr'

export default {

  name: 'Clappr',

  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 160
    }
  },

  data () {
    return {
      id: '',
      player: null
    }
  },

  computed: {
    height () {
      return this.width * 90 / 160
    }
  },

  watch: {
    src (newSource) {
      this.player.configure({ source: newSource })
    }
  },

  beforeMount () {
    this.id = 'clapper_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  },

  mounted () {
    this.player = new Clappr.Player({
      parentId: '#' + this.id,
      source: this.src,
      width: this.width,
      height: this.height,
      autoPlay: true,
    })
  },

  beforeDestroy () {
    if (this.player) {
      this.player.destroy()
    }
  }
}
</script>

<style scoped>

</style>
