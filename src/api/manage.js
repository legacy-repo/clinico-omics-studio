import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  report: '/report-list',
  workflow: '/workflow',
  app_store: {
    installed_apps: '/installed-apps',
    apps: '/apps'
  },
  filemanager: {
    url: 'http://localhost:8090/',
    getImageUrl: 'http://localhost:8090/GetImage',
    uploadUrl: 'http://localhost:8090/Upload',
    downloadUrl: 'http://localhost:8090/Download'
  }
}

export default api

export function getWebapps () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/webapps.json',
    method: 'get',
    params: {}
  })
}

export function getAppList () {
  return axios({
    url: api.app_store.apps,
    method: 'get',
    params: {}
  })
}

export function getInstalledAppList () {
  return axios({
    url: api.app_store.installed_apps,
    method: 'get',
    params: {}
  })
}

export function getWorkflowList (parameter) {
  return axios({
    url: api.workflow,
    method: 'get',
    params: parameter
  })
}

// TODO: use api instead of false
export function existProjectName (projectName) {
  return false
}

export function getReport () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/report-datainsEmbed-20190902.json',
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
