import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle } from '@/utils/domUtil'
import { domTitle, config } from '@/config/defaultSettings'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

const whiteList = ['/404', '/jupyter', '/metabase', '/api-mgmt', '/webapps', '/welcome', '/user/login', '/user/register', '/user/recover', '/cool-dashboard'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  // Check token whether is valid and set isAuthenticated variable.
  let tokenIsValid = false
  if (config.noPermission) {
    tokenIsValid = true
  } else {
    store.dispatch('CheckToken')
    tokenIsValid = store.getters.isAuthenticated
  }

  console.log('Token', tokenIsValid)
  console.log('Debug', to, from)

  if (tokenIsValid) {
    if (store.getters.roles.length === 0) {
      store
        .dispatch('GetInfo')
        .then(userInfo => {
          const roles = userInfo.role
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
              // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              next({ ...to, replace: true })
            } else {
              // 跳转到目的路由
              next({ path: redirect })
            }
          })
        })
        .catch(error => {
          console.log('Login Error: ', error)
          // 待解决，部分api无法正常工作
          // notification.error({
          //   message: '错误',
          //   description: '请求用户信息失败，请重试'
          // })
          store.dispatch('Logout').then(() => {
            next({ name: 'welcome', query: { redirect: to.fullPath } })
          })
          next()
        })
    } else {
      next()
    }
  } else if (!tokenIsValid) {
    // 过期清理
    store.dispatch('Logout')

    if (!whiteList.includes(to.path)) {
      next({ name: 'welcome', query: { redirect: to.fullPath } })

      notification.warn({
        message: 'Unauthorized',
        description: 'Authorization verification failed. You need to login if you want to access private resource.'
      })
    } else if (to.path === '/') {
      next({ name: 'welcome', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
