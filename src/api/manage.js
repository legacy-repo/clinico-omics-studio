import { axios } from '@/utils/request'
import { initFileManagerHost, initTServiceHost, initDataSeqHost } from '@/utils/util'

const fileManagerHost = initFileManagerHost()
const tserviceHost = initTServiceHost()
const dataSeqHost = initDataSeqHost()

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  // Datains
  project: '/api/projects',
  workflow: '/api/workflows',
  log: '/api/logs',
  notification: '/api/notifications',
  apps: '/apps',
  appStore: {
    installedApps: '/api/installed-apps',
    apps: '/api/apps',
    manifest: '/api/app-manifest'
  },
  // Tservice
  tservice: {
    manifest: tserviceHost + '/api/manifest',
    root: tserviceHost,
    report: tserviceHost + '/api/reports'
  },
  // Data Commons
  dataCommons: {
    collections: dataSeqHost + '/api/collections',
    groups: dataSeqHost + '/api/count-collections'
  },
  filemanager: {
    url: fileManagerHost,
    getImageUrl: fileManagerHost + '/GetImage',
    uploadUrl: fileManagerHost + '/Upload',
    downloadUrl: fileManagerHost + '/Download'
  }
}

export default api

// Materials Data
export function getMaterialsSeqData () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_seqdata.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsMetadata () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_metadata.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsDIN () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_din.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsRIN () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_rin.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsLicense () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_license.md',
    method: 'get',
    params: {}
  })
}

export function getMaterialsTemperature () {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_temperature.json',
    method: 'get',
    params: {}
  })
}

// Omics Data Commons - Metadata
export function getCollections (parameter, payload) {
  return axios({
    url: api.dataCommons.collections,
    method: 'post',
    params: parameter,
    data: payload
  })
}

export function countCollections (parameter, payload) {
  return axios({
    url: api.dataCommons.groups,
    method: 'post',
    params: parameter,
    data: payload
  })
}

function getServiceApi (service) {
  return '/api/services/' + service + '/buckets'
  // return '/api/buckets'
}

// Minio/OSS/S3: Bucket + Object
export function getBuckets (service) {
  return axios({
    url: getServiceApi(service),
    method: 'get',
    params: {}
  })
}

export function addBucket (service, data) {
  // data - {"name": "bucket_name"}
  return axios({
    url: getServiceApi(service),
    method: 'post',
    data: data
  })
}

export function getObjects (service, bucketName, parameter) {
  // parameter - {"page": 1, "per_page": 10}
  return axios({
    url: getServiceApi(service) + '/' + bucketName,
    method: 'get',
    params: parameter
  })
}

export function makeDirectory (service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName,
    method: 'post',
    params: parameter
  })
}

export function deleteBucket (service, bucketName) {
  return axios({
    url: getServiceApi(service) + '/' + bucketName,
    method: 'delete'
  })
}

export function makeDownloadUrl (service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object',
    method: 'get',
    params: parameter
  })
}

export function makeUploadUrl (service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object',
    method: 'post',
    params: parameter
  })
}

export function deleteObject (service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object',
    method: 'delete',
    params: parameter
  })
}

export function getObjectMeta (service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object-meta',
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

export function getToolManifest () {
  return axios({
    url: api.tservice.manifest,
    method: 'get',
    params: {}
  })
}

export function getToolSchema (tool) {
  return axios({
    url: api.tservice.root + '/api/' + tool,
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

export function updateWorkflow (workflowId, payload) {
  return axios({
    url: api.workflow + '/' + workflowId,
    method: 'put',
    data: payload
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
    url: api.tservice.report + '/' + reportId,
    method: 'get'
  })
}

export function submitReport (data) {
  return axios({
    url: api.tservice.report,
    method: 'post',
    data: data
  })
}

export function getReportList (parameter) {
  return axios({
    url: api.tservice.report,
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
    url: api.tservice.report,
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
