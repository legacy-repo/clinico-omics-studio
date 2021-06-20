import { project } from '@/config/defaultSettings'

// eslint-disable-next-line no-undef
const routerMap = require('@/custom/'+ project + '/router')
const constantRouterMap = routerMap.constantRouterMap
const asyncRouterMap = routerMap.asyncRouterMap
export { constantRouterMap, asyncRouterMap }
