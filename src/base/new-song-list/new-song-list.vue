<template>


  
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import NewSong from 'base/new-song/new-song.vue'
interface newsong{
  
}
@Component({
  name:'newSonglist'
})

export default class App extends Vue{
  @Prop() list:Array<newsong>
  @Prop() isMultipleLine:boolean
}
</script>

<style lang='stylus'>

</style>
