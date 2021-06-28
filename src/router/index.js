import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

Vue.use(Router)

// 解决重复点击路由报错的BUG
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onComplement, onCatch) {
//   return originalPush.call(this, location, onComplement, onCatch).catch((err) => err)
// }

const isElectron = process.env.VUE_APP_ELECTRON === 'true'
const mode = isElectron ? 'hash' : 'history'

export default new Router({
  mode: mode,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
