import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { tokenIsExpired, tokenExp } from '@/utils/util'
import { OIDC_AUTH } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/webapps', '/welcome', '/oidc-popup-callback'] // no redirect whitelist

function CheckToken (commit) {
  // Token可能过期
  const user = JSON.parse(localStorage.getItem(OIDC_AUTH))
  var tokenIsValid = null
  if (user) {
    commit('oidcStore/setOidcAuth', user)
    tokenIsValid = !tokenIsExpired(user.access_token)
    console.log('user', user, tokenIsValid, tokenExp(user.access_token))
  }
  // return tokenIsValid
  return true
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  const tokenIsValid = CheckToken(store.commit)
  console.log('Token', store.commit, store.getters)
  console.log('Debug', to, from)

  if (tokenIsValid) {
    if (store.getters.roles.length === 0) {
      store
        .dispatch('GetInfo')
        .then(res => {
          const roles = res.result && res.result.role
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
        .catch(() => {
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
