const defaultSettings = {
  initialComponentSettings: {
    disabledContextMenu: 'true',
    disabledExploratory: 'true',
    dashboardName: 'QuartetDashboard'
  },
  domTitle: 'The QUALITY Platform',
  // eslint-disable-next-line no-undef
  websiteLogo: require('@/assets/logo.png'),
  websiteName: 'QUALITY',
  websiteDesc: 'The QUALITY Platform for Clinico OMICS & BioMedGPS'
}

export function getDnaHost () {
  const hostname = window.location.hostname
  if (hostname == 'pgx.fudan.edu.cn') {
    return 'http://pgx.fudan.edu.cn/dnaseq/'
  } else {
    return 'http://10.157.72.56:8081/quartet-dna-vis/'
  }
}

export function getRnaHost () {
  const hostname = window.location.hostname
  if (hostname == 'pgx.fudan.edu.cn') {
    return 'http://pgx.fudan.edu.cn/rnaseq/'
  } else {
    return 'http://10.157.72.56:8081/quartet-rna-vis/'
  }
}

// SeqFlow
export function initSeqFlowHost () {
  const seqFlowHost = localStorage.getItem('seqFlowHost')
  console.log(`SEQ_FLOW_HOST: ${seqFlowHost}`)

  const hostname = window.location.hostname
  if (hostname == 'pgx.fudan.edu.cn') {
    return 'http://pgx.fudan.edu.cn/seqflow'
  }

  return seqFlowHost || 'http://10.157.72.56:3000'
}

// BASE_API
export function initApiService () {
  const apiService = initSeqFlowHost()
  console.log(`BASE_API_URL: ${apiService}`)
  return apiService
}

// TService
export function initTServiceHost () {
  const tServiceHost = localStorage.getItem('tServiceHost')
  console.log(`TSERVICE_HOST: ${tServiceHost}`)

  const hostname = window.location.hostname
  if (hostname == 'pgx.fudan.edu.cn') {
    return 'http://pgx.fudan.edu.cn/tservice'
  }

  return tServiceHost || 'http://10.157.72.56:3001'
}

// DataSeq
export function initDataSeqHost () {
  const dataSeqHost = localStorage.getItem('dataSeqHost')
  console.log(`DATA_SEQ_HOST: ${dataSeqHost}`)

  const hostname = window.location.hostname
  if (hostname == 'pgx.fudan.edu.cn') {
    return 'http://pgx.fudan.edu.cn/dataseq'
  }

  return dataSeqHost || 'http://10.157.72.56:3002'
}

// Component Settings
export function initComponentSettings () {
  let componentSettings = JSON.parse(localStorage.getItem('componentSettings'))
  console.log(`Component Settings(initComponentSettings): ${componentSettings}`)

  if (componentSettings == undefined) {
    componentSettings = {}
  }

  return Object.assign(defaultSettings.initialComponentSettings, componentSettings)
}

// -------------------------------------------------

export const domTitle = defaultSettings.domTitle

export const websiteName = defaultSettings.websiteName

export const websiteLogo = defaultSettings.websiteLogo

export const websiteDesc = defaultSettings.websiteDesc

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? 'Good Morning' : hour <= 11 ? 'Good Morning' : hour <= 13 ? 'Good Afternoon' : hour < 20 ? 'Good Afternoon' : 'Good Evening'
}

export function saveSeqFlowHost (seqFlowHost) {
  localStorage.setItem('seqFlowHost', seqFlowHost)
}

export function saveTServiceHost (tServiceHost) {
  localStorage.setItem('tServiceHost', tServiceHost)
}

export function saveDataSeqHost (dataSeqHost) {
  localStorage.setItem('dataSeqHost', dataSeqHost)
}

export function saveComponentSettings (componentSettings) {
  localStorage.setItem('componentSettings', JSON.stringify(componentSettings))
}

export function welcome () {
  const arr = []
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export const parseJwt = (token) => {
  try {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
  } catch (error) {
    return {}
  }
}

export const tokenExp = (token) => {
  if (token) {
    const parsed = parseJwt(token)
    return parsed.exp ? parsed.exp * 1000 : null
  }
  return null
}

export const tokenIsExpired = (token) => {
  const tokenExpiryTime = tokenExp(token)
  if (tokenExpiryTime) {
    return tokenExpiryTime < new Date().getTime()
  }
  return false
}
