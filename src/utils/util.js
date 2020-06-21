export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? 'Good Morning' : hour <= 11 ? 'Good Morning' : hour <= 13 ? 'Good Afternoon' : hour < 20 ? 'Good Afternoon' : 'Good Evening'
}

// SeqFlow
export function initSeqFlowApiPrefix () {
  const seqFlowApiPrefix = localStorage.getItem('seqFlowApiPrefix')
  console.log(`SEQ_FLOW_API_PREFIX: ${seqFlowApiPrefix}`)
  return seqFlowApiPrefix || '/api'
}

export function saveSeqFlowApiPrefix (seqFlowApiPrefix) {
  localStorage.setItem('seqFlowApiPrefix', seqFlowApiPrefix)
}

export function initSeqFlowHost () {
  const seqFlowHost = localStorage.getItem('seqFlowHost')
  console.log(`SEQ_FLOW_HOST: ${seqFlowHost}`)
  return seqFlowHost || 'http://localhost:3000'
}

export function saveSeqFlowHost (seqFlowHost) {
  localStorage.setItem('seqFlowHost', seqFlowHost)
}

// BASE_API
export function initApiService () {
  const apiService = initSeqFlowHost() + initSeqFlowApiPrefix()
  console.log(`BASE_API_URL: ${apiService}`)
  return apiService
}

// TService
export function initTServiceApiPrefix () {
  const tServiceApiPrefix = localStorage.getItem('tServiceApiPrefix')
  console.log(`TSERVICE_API_PREFIX: ${tServiceApiPrefix}`)
  return tServiceApiPrefix || '/api'
}

export function saveTServiceApiPrefix (tServiceApiPrefix) {
  localStorage.setItem('tServiceApiPrefix', tServiceApiPrefix)
}

export function initTServiceHost () {
  const tServiceHost = localStorage.getItem('tServiceHost')
  console.log(`TSERVICE_HOST: ${tServiceHost}`)
  return tServiceHost || 'http://localhost:3000'
}

export function saveTServiceHost (tServiceHost) {
  localStorage.setItem('tServiceHost', tServiceHost)
}

// File Manager
export function initFileManagerHost () {
  const fileManagerHost = localStorage.getItem('fileManagerHost')
  console.log(`FILE_MANAGER_HOST: ${fileManagerHost}`)
  return fileManagerHost || 'http://localhost:3000'
}

export function saveFileManagerHOst (fileManagerHost) {
  localStorage.setItem('fileManagerHost', fileManagerHost)
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
