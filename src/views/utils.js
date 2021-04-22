import v from 'voca'

export const formatTitle = function(self, title) {
  const key = v.camelCase(title)
  const formatedTitle = self.$t('router.meta.' + key)
  if (formatedTitle === 'router.meta.' + key) {
    return title
  } else {
    return formatedTitle
  }
}

export const downloadFile = function(content, filename) {
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  const blob = new Blob([content])
  eleLink.href = URL.createObjectURL(blob)
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}
