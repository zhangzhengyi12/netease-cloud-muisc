// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import store from './store/index.ts'
import { Carousel, CarouselItem, Message,  MessageBox} from 'element-ui'
import 'common/css/index.styl'
import vueLazyLoad from 'vue-lazyload'
import { prototype } from 'events'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

OfflinePluginRuntime.install()

Vue.use(vueLazyLoad, {
  loading: require('./assets/logo.png'),
  observer: true,
  lazyComponent: true,
  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})

Vue.use(Carousel)
Vue.use(CarouselItem)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})

Date.prototype.Format = function(this: Date, fmt: string) {
  var o: {
    [props: string]: any
  } = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message