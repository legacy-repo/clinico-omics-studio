export const project = require('@/custom/index').project

const customConfig = require('@/custom/config/' + project)

export const config = customConfig.projectSettings
export const initBaseURL = customConfig.initBaseURL

// PreQC Pack
export function initPreQCHost() {
  // TODO: How to access serverless function by proxy server
  // const preQcHost = localStorage.getItem('preQcHost')
  // console.log(`PRE_QC_HOST: ${preQcHost}`)

  // return preQcHost || `${initBaseURL()}/preqc-pack`

  // Temporary Solution
  return 'http://serverless.3steps.cn'
}

// SeqFlow
export function initSeqFlowHost() {
  const seqFlowHost = localStorage.getItem('seqFlowHost')
  console.log(`SEQ_FLOW_HOST: ${seqFlowHost}`)

  return seqFlowHost || `${initBaseURL()}/datains`
}

// TService
export function initTServiceHost() {
  const tServiceHost = localStorage.getItem('tServiceHost')
  console.log(`TSERVICE_HOST: ${tServiceHost}`)

  return tServiceHost || `${initBaseURL()}/tservice`
}

// DataSeq
export function initDataSeqHost() {
  const dataSeqHost = localStorage.getItem('dataSeqHost')
  console.log(`DATA_SEQ_HOST: ${dataSeqHost}`)

  return dataSeqHost || `${initBaseURL()}/dataseq`
}

// Component Settings
export function initComponentSettings() {
  let componentSettings = JSON.parse(localStorage.getItem('componentSettings'))
  console.log(`Component Settings(initComponentSettings): ${componentSettings}`)

  if (componentSettings == undefined) {
    componentSettings = {}
  }

  return Object.assign(config.initialComponentSettings, componentSettings)
}

// -------------------------------------------------

export const domTitle = config.domTitle

export const websiteName = config.websiteName

export const websiteLogo = config.websiteLogo

export const websiteDesc = config.websiteDesc

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? 'Good Morning'
    : hour <= 11
    ? 'Good Morning'
    : hour <= 13
    ? 'Good Afternoon'
    : hour < 20
    ? 'Good Afternoon'
    : 'Good Evening'
}

export function saveSeqFlowHost(seqFlowHost) {
  localStorage.setItem('seqFlowHost', seqFlowHost)
}

export function saveTServiceHost(tServiceHost) {
  localStorage.setItem('tServiceHost', tServiceHost)
}

export function saveDataSeqHost(dataSeqHost) {
  localStorage.setItem('dataSeqHost', dataSeqHost)
}

export function saveComponentSettings(componentSettings) {
  localStorage.setItem('componentSettings', JSON.stringify(componentSettings))
}

export function welcome() {
  const arr = []
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
