<template>
  <div class="hello">
    <h1>{{ myName }}</h1>
    <a href="#" @click="changeName">66666666666666666666666666666</a>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  State,
  Mutation
} from 'vuex-class'

@Component({
  name:'TS'
})
export default class Hello extends Vue {
  @State(state=>state.name) myName:string
  @Mutation('CHANGE_NAME') M_ChangeName:any
  
  msg: String = this.myName

  changeName(){
    this.M_ChangeName('nihao')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.hello {
  a {
    color:red
  }
}

</style>
