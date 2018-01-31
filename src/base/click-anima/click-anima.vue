<template>

<span class="scale" ref="scaleTarget" @click="onClick">
  <slot></slot>
</span>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
  name: 'clickAnima'
})
export default class App extends Vue {
  scaleAnima(): void {
    ;(this.$refs.scaleTarget as HTMLElement).style.transform = `scale(.95,.95)`
    setTimeout(() => {
      if (!this.$refs.scaleTarget) return
      ;(this.$refs.scaleTarget as HTMLElement).style.transform = ``
    }, 200)
  }
  onClick(e: any) {
    this.$emit('click')
    this.scaleAnima()
  }
}
</script>

<style lang='stylus'>
.scale
  display inline-block
  transition scale 0.2s
</style>
