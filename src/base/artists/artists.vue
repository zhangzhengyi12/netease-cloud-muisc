<template>

<span class="arts">
  <span class="art" 
  :class="artCls" 
  v-for="(art,index) of artists"
  :key="index"
  @click.stop="$emit('select',index)"
  >{{art.name}}<span v-if="artists.length !== 1 && index !== artists.length -1">/</span>
  </span>
</span>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name: 'artists'
})
export default class App extends Vue {
  @Prop() artists: Array<any>
  @Prop() artCls: string
}
</script>

<style lang='stylus'>

</style>
