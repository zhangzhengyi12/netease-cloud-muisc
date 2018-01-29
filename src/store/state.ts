import { cache } from 'common/js/cache.ts'
import { viewport } from './getter'
import playList from '../common/js/playList'
import { initPlayData } from 'common/js/initData'

interface playData {
  playing: boolean
  fullScreen: boolean
  playlist: Array<any>
  sequenceList: Array<any>
  mode: number
  currentIndex: number
}
interface state {
  userLoginState: {
    isLogin: boolean
    userData: object
  }
  viewport: {
    width: number
    height: number
  }
  playData: playData
}

const defaultLogin: state['userLoginState'] = {
  isLogin: false,
  userData: {}
}

// 从缓存中获取并合并之前保存的播放数据，但播放状态和全屏为默认值
const playData = Object.assign(cache.get(initPlayData, 'playData'), { playing: false, fullScreen: false })

export default {
  userLoginState: cache.get(defaultLogin, 'LOGIN'),
  viewport: { width: document.body.clientWidth, height: window.innerHeight },
  playData
}
