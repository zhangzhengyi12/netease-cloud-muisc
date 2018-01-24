import { Vue, Component } from 'vue-property-decorator'
import MusicItem from 'base/music-item/music-item.vue'

declare module 'vue/types/vue' {
  interface Vue {
    CODE_OK: number
  }
}

/**
 * Mixin test
 *
 * @export
 * @class TestMixin
 * @extends {Vue}
 */
@Component({})
class configMixin extends Vue {
  CODE_OK = 200
}

@Component({
  components: {
    MusicItem
  }
})
class musicItemMixin extends Vue{

}  



export { configMixin,musicItemMixin }
