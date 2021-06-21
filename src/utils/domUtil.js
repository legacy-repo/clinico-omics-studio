export const setDocumentTitle = function(title) {
  document.title = title
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function() {
      setTimeout(function() {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

// More Details: https://newbedev.com/make-function-wait-until-element-exists
export const rafAsync = function() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve) //faster than set time out
  })
}

export const checkElement = function(selector) {
  console.log('Check Element: ', document.body.contains(document.querySelector(selector)))
  if (!document.body.contains(document.querySelector(selector))) {
    return rafAsync().then(() => checkElement(selector))
  } else {
    return Promise.resolve(true)
  }
}
