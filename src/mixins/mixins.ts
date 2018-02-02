import { Vue, Component } from 'vue-property-decorator'
import MusicItem from 'base/music-item/music-item.vue'
import Loading from 'base/loading/loading.vue'
import { Getter, Mutation, Action } from 'vuex-class'

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
class musicItemMixin extends Vue {}

@Component({})
class timeAndArtisitMixin extends Vue {
  caluArtists(artists: Array<any>): string {
    let res: Array<any> = []
    artists.forEach(item => {
      res.push(item.name)
    })
    return res.join('/')
  }
  caluTime(dur: number, needTrans: boolean = true): string {
    let time: number
    if (needTrans) {
      time = dur / 1000
    } else {
      time = dur
    }
    time = Math.floor(time)
    let m, s
    if (time < 60) {
      s = time
      m = '00'
    } else {
      s = Math.floor(time % 60)
      m = Math.floor(time / 60)
      if (m < 10) m = `0${m}`
    }
    if (s < 10) s = `0${s}`
    return `${m}:${s}`
  }
}

// player mixin

@Component({})
class playerMixin extends Vue {}

// loadingMixin

@Component({
  components: {
    Loading
  }
})
class loadingMixin extends Vue {
  _showLoading: boolean = true
  showLoading() {
    this._showLoading = true
  }
  disLoading() {
    this._showLoading = false
  }
}
export { configMixin, musicItemMixin, timeAndArtisitMixin, playerMixin, loadingMixin }
