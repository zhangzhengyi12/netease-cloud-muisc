<template>

  <transition name="fade-in" appear="">
    <div class="window" @click.stop v-if="display">
      <slot/>
    </div>
  </transition>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name: 'right-in-window'
})
export default class App extends Vue {
  @Prop() display: boolean
}
</script>

<style lang='stylus' scoped>
.fade-in-enter, .fade-in-leave-to
  transform translateX(300px)
.fade-in-enter-active, .fade-in-leave-active
  transition all 0.3s
</style>