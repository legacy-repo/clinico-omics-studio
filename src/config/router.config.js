import { project } from '@/config/defaultSettings'

const routerMap = require('@/custom/router/router.' + project + '.config')
const constantRouterMap = routerMap.constantRouterMap
const asyncRouterMap = routerMap.asyncRouterMap
export { constantRouterMap, asyncRouterMap }
