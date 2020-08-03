import { axios } from '@/utils/request'
import { initFileManagerHost } from '@/utils/util'

const fileManagerHost = initFileManagerHost()

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  // Custom
  report: '/api/reports',
  project: '/api/projects',
  workflow: '/api/workflows',
  log: '/api/logs',
  notification: '/api/notifications',
  appStore: {
    installedApps: '/api/installed-apps',
    apps: '/api/apps',
    manifest: '/api/app-manifest'
  },
  fsBuckets: '/api/buckets',
  apps: '/apps',
  filemanager: {
    url: fileManagerHost,
    getImageUrl: fileManagerHost + '/GetImage',
    uploadUrl: fileManagerHost + '/Upload',
    downloadUrl: fileManagerHost + '/Download'
  }
}

export default api

// Minio/OSS/S3: Bucket + Object
export function getBuckets () {
  return axios({
    url: api.fsBuckets,
    method: 'get',
    params: {}
  })
}

export function addBucket (data) {
  // data - {"name": "bucket_name"}
  return axios({
    url: api.fsBuckets,
    method: 'post',
    data: data
  })
}

export function getObjects (bucketName, parameter) {
  // parameter - {"page": 1, "per_page": 10}
  return axios({
    url: api.fsBuckets + '/' + bucketName,
    method: 'get',
    params: parameter
  })
}

export function makeDirectory (bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: api.fsBuckets + '/' + bucketName,
    method: 'post',
    params: parameter
  })
}

export function deleteBucket (bucketName) {
  return axios({
    url: api.fsBuckets + '/' + bucketName,
    method: 'delete'
  })
}

export function makeDownloadUrl (bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: api.fsBuckets + '/' + bucketName + '/object',
    method: 'get',
    params: parameter
  })
}

export function makeUploadUrl (bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: api.fsBuckets + '/' + bucketName + '/object',
    method: 'post',
    params: parameter
  })
}

export function deleteObject (bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: api.fsBuckets + '/' + bucketName + '/object',
    method: 'delete',
    params: parameter
  })
}

export function getObjectMeta (bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: api.fsBuckets + '/' + bucketName + '/object-meta',
    method: 'get',
    params: parameter
  })
}

// App Store
export function getWebapps () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/webapps.json',
    method: 'get',
    params: {}
  })
}

export function getAppList () {
  return axios({
    url: api.appStore.apps,
    method: 'get',
    params: {}
  })
}

export function getAppManifest () {
  return axios({
    url: api.appStore.manifest,
    method: 'get',
    params: {}
  })
}

export function getInstalledAppList () {
  return axios({
    url: api.appStore.installedApps,
    method: 'get',
    params: {}
  })
}

export function getAppSchema (appName) {
  return axios({
    url: api.apps + '/' + appName + '/schema.json',
    method: 'get',
    params: {}
  })
}

export function getHelpMsg (appName) {
  return axios({
    url: api.apps + '/' + appName + '/README.md',
    method: 'get',
    params: {},
    responseType: 'text',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

export function getWorkflowList (parameter) {
  return axios({
    url: api.workflow,
    method: 'get',
    params: parameter
  })
}

export function getWorkflow (workflowId) {
  return axios({
    url: api.workflow + '/' + workflowId,
    method: 'get',
    params: {}
  })
}

export function getReport (reportId) {
  return axios({
    url: api.report + '/' + reportId,
    method: 'get'
  })
}

export function getReportList (parameter) {
  return axios({
    url: api.report,
    method: 'get',
    params: parameter
  })
}

export function submitProject (data) {
  return axios({
    url: api.project,
    method: 'post',
    data: data
  })
}

export function getProjectList (parameter) {
  return axios({
    url: api.project,
    method: 'get',
    params: parameter
  })
}

export function getProject (projectId) {
  return axios({
    url: api.project + '/' + projectId,
    method: 'get'
  })
}

export function getProjectStat (projectId) {
  return axios({
    url: api.project + '/' + projectId + '/stats',
    method: 'get'
  })
}

export function getLogList (workflowId, parameter) {
  return axios({
    url: api.workflow + '/' + workflowId + '/logs',
    method: 'get',
    params: parameter
  })
}

export function getNotificationList (parameter) {
  return axios({
    url: api.notification,
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
