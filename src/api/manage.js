import { axios } from '@/utils/request'
import { initTServiceHost, initDataSeqHost, initSeqFlowHost, initTServiceAiHost } from '@/config/defaultSettings'

const seqFlowHost = initSeqFlowHost()
const tserviceHost = initTServiceHost()
const dataSeqHost = initDataSeqHost()
const tserviceAiHost = initTServiceAiHost()

const api = {
  // Datains
  seqFlow: {
    project: seqFlowHost + '/api/projects',
    workflow: seqFlowHost + '/api/workflows',
    log: seqFlowHost + '/api/logs',
    message: seqFlowHost + '/api/messages',
    notification: seqFlowHost + '/api/notifications',
    apps: seqFlowHost + '/apps',
    appStore: {
      installedApps: seqFlowHost + '/api/installed-apps',
      apps: seqFlowHost + '/api/apps',
      manifest: seqFlowHost + '/api/app-manifest'
    }
  },
  // Tservice
  tservice: {
    manifest: tserviceHost + '/api/manifest',
    root: tserviceHost,
    reportEndpoint: tserviceHost + '/api/report/',
    report: tserviceHost + '/api/tasks',
    // Deprecated
    chart: tserviceHost + '/api/chart',
    pathologyAiModel: tserviceAiHost + '/api/tool/pathology-model'
  },
  // Data Commons
  dataCommons: {
    listCollections: dataSeqHost + '/api/list-collections',
    schema: dataSeqHost + '/api/schema',
    collections: dataSeqHost + '/api/collections',
    groups: dataSeqHost + '/api/count-collections',
    repo: dataSeqHost + '/api/repo'
  }
}

export default api

export function getServices() {
  return axios({
    url: seqFlowHost + '/api/fs-services',
    method: 'get'
  })
}

export function getServiceApi(service) {
  return seqFlowHost + '/api/services/' + service + '/buckets'
}

// Materials Data
export function getMaterialsSeqData() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_seqdata.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsMetadata() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_metadata.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsDIN() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_din.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsRIN() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_rin.json',
    method: 'get',
    params: {}
  })
}

export function getMaterialsLicense() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_license.md',
    method: 'get',
    params: {}
  })
}

export function getMaterialsTemperature() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/materials_temperature.json',
    method: 'get',
    params: {}
  })
}

// Omics Data Commons - Metadata
export function listCollections() {
  return axios({
    url: api.dataCommons.listCollections,
    method: 'get'
  })
}

export function getDataSchema(collection) {
  return axios({
    url: api.dataCommons.schema + '/' + collection,
    method: 'get'
  })
}

export function getCollections(collection, parameter, payload) {
  return axios({
    url: api.dataCommons.collections + '/' + collection,
    method: 'post',
    params: parameter,
    data: payload
  })
}

export function countCollections(collection, parameter, payload) {
  return axios({
    url: api.dataCommons.groups + '/' + collection,
    method: 'post',
    params: parameter,
    data: payload
  })
}

// Data Repo
export function listRepo() {
  return axios({
    url: api.dataCommons.repo,
    method: 'get'
  })
}

export function addRepo(name, description) {
  return axios({
    url: api.dataCommons.repo,
    method: 'post',
    data: {
      name: name,
      description: description
    }
  })
}

export function updateRepo(name, files, config) {
  return axios({
    url: api.dataCommons.repo,
    method: 'put',
    data: {
      name: name,
      files: files,
      config: config
    }
  })
}

export function listRepoVersion(name) {
  return axios({
    url: api.dataCommons.repo + '/' + name + '/commits',
    method: 'get'
  })
}

export function addRepoVersion(name, message, files) {
  return axios({
    url: api.dataCommons.repo + '/' + name + '/commits',
    method: 'post',
    data: {
      message: message,
      files: files
    }
  })
}

export function getRepoStatus(name, subpath) {
  return axios({
    url: api.dataCommons.repo + '/' + name + '/status',
    method: 'get',
    params: {
      subpath: subpath
    }
  })
}

export function getRepoFiles(name, commitId, subpath) {
  console.log('getRepoFiles: ', name, commitId, subpath)
  return axios({
    url: api.dataCommons.repo + '/' + name + '/files',
    method: 'get',
    params: {
      'commit-ish': commitId,
      subpath: subpath
    }
  })
}

// Minio/OSS/S3: Bucket + Object
export function getBuckets(service) {
  return axios({
    url: getServiceApi(service),
    method: 'get',
    params: {}
  })
}

export function addBucket(service, data) {
  // data - {"name": "bucket_name"}
  return axios({
    url: getServiceApi(service),
    method: 'post',
    data: data
  })
}

export function getObjects(service, bucketName, parameter) {
  // parameter - {"page": 1, "per_page": 10}
  return axios({
    url: getServiceApi(service) + '/' + bucketName,
    method: 'get',
    params: parameter
  })
}

export function makeDirectory(service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName,
    method: 'post',
    params: parameter
  })
}

export function deleteBucket(service, bucketName) {
  return axios({
    url: getServiceApi(service) + '/' + bucketName,
    method: 'delete'
  })
}

export function makeDownloadUrl(service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object',
    method: 'get',
    params: parameter
  })
}

export function makeUploadUrl(service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object',
    method: 'post',
    params: parameter
  })
}

export function deleteObject(service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object',
    method: 'delete',
    params: parameter
  })
}

export function getObjectMeta(service, bucketName, parameter) {
  // parameter - {"key": "test"}
  return axios({
    url: getServiceApi(service) + '/' + bucketName + '/object-meta',
    method: 'get',
    params: parameter
  })
}

// App Store
export function getWebapps() {
  return axios({
    url: 'http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/webapps.json',
    method: 'get',
    params: {}
  })
}

export function getAppList() {
  return axios({
    url: api.seqFlow.appStore.apps,
    method: 'get',
    params: {}
  })
}

export function getAppManifest() {
  return axios({
    url: api.seqFlow.appStore.manifest,
    method: 'get',
    params: {}
  })
}

export function getToolManifest() {
  return axios({
    url: api.tservice.manifest,
    method: 'get',
    params: {}
  })
}

export function getReportSchema(tool) {
  return axios({
    url: api.tservice.root + '/api/report/' + tool,
    method: 'get',
    params: {}
  })
}

export function getInstalledAppList() {
  return axios({
    url: api.seqFlow.appStore.installedApps,
    method: 'get',
    params: {}
  })
}

export function getAppSchema(appName) {
  return axios({
    url: api.seqFlow.apps + '/' + appName + '/schema.json',
    method: 'get',
    params: {}
  })
}

export function getHelpMsg(appName) {
  return axios({
    url: api.seqFlow.apps + '/' + appName + '/README.md',
    method: 'get',
    params: {},
    responseType: 'text',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

export function getWorkflowList(parameter) {
  return axios({
    url: api.seqFlow.workflow,
    method: 'get',
    params: parameter
  })
}

export function updateWorkflow(workflowId, payload) {
  return axios({
    url: api.seqFlow.workflow + '/' + workflowId,
    method: 'put',
    data: payload
  })
}

export function getWorkflow(workflowId) {
  return axios({
    url: api.seqFlow.workflow + '/' + workflowId,
    method: 'get',
    params: {}
  })
}

// TService AI Model
export function submitPathologyAiTask(filepath, modelType, payload) {
  return axios({
    url: api.tservice.pathologyAiModel,
    method: 'post',
    data: {
      filepath: filepath,
      parameters: {
        model_type: modelType,
        description: payload
      }
    }
  })
}

// TService
export function getReport(reportId) {
  return axios({
    url: api.tservice.report + '/' + reportId,
    method: 'get'
  })
}

export function submitReport(reportName, data) {
  return axios({
    url: api.tservice.reportEndpoint + reportName,
    method: 'post',
    data: data
  })
}

export function getReportList(parameter) {
  return axios({
    url: api.tservice.report,
    method: 'get',
    params: parameter
  })
}

export function postChart(chartName, data) {
  // data: {} | { data: { dataType: '', dataFile: '' }, attributes: { xAxis: '' ... } }
  return axios({
    url: api.tservice.chart + '/' + chartName,
    method: 'post',
    data: data
  })
}

export function getChartSchema(chartName, parameter) {
  // parameter: filepath
  return axios({
    url: api.tservice.chart + '/' + chartName + '/schema',
    method: 'get',
    params: parameter
  })
}

export function submitProject(data) {
  return axios({
    url: api.seqFlow.project,
    method: 'post',
    data: data
  })
}

export function getProjectList(parameter) {
  return axios({
    url: api.seqFlow.project,
    method: 'get',
    params: parameter
  })
}

export function getProject(projectId) {
  return axios({
    url: api.seqFlow.project + '/' + projectId,
    method: 'get'
  })
}

export function updateProject(projectId, payload) {
  return axios({
    url: api.seqFlow.project + '/' + projectId,
    method: 'put',
    data: payload
  })
}

export function getProjectStat(projectId) {
  return axios({
    url: api.seqFlow.project + '/' + projectId + '/stats',
    method: 'get'
  })
}

export function getLogList(workflowId, parameter) {
  return axios({
    url: api.seqFlow.workflow + '/' + workflowId + '/logs',
    method: 'get',
    params: parameter
  })
}

export function getNotificationList(parameter) {
  return axios({
    url: api.seqFlow.notification,
    method: 'get',
    params: parameter
  })
}

export function getMessageList(parameter) {
  return axios({
    url: api.seqFlow.message,
    method: 'get',
    params: parameter
  })
}

export function submitMessage(data) {
  return axios({
    url: api.seqFlow.message,
    method: 'post',
    data: data
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveReport(parameter) {
  return axios({
    url: api.tservice.report,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
