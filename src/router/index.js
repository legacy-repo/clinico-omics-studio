import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

Vue.use(Router)

const isElectron = process.env.VUE_APP_ELECTRON === 'true'
const mode = isElectron ? 'hash' : 'history'

export default new Router({
  mode: mode,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
