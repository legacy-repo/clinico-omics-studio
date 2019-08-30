import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  report: '/report'
}

export default api

export function getAppList () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/apps.json',
    method: 'get',
    params: {}
  })
}

export function getWorkflowList () {
  return axios({
    url: 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/tasks-2.json',
    method: 'get',
    params: {}
  })
}

export function getReport () {
  return axios({
    url: 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/test.json',
    method: 'get',
    params: {}
  })
}

export function getReportList (parameter) {
  return axios({
    url: api.report,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveReport (parameter) {
  return axios({
    url: api.report,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
