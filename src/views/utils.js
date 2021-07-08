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

export const downloadAsJSON = function(data, elementId) {
  var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  var dlAnchorElem = document.getElementById(elementId)
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute('download', 'data.json')
  dlAnchorElem.click()
}

export const removeFields = function(fields, exclude) {
  return fields.filter(x => !exclude.includes(x));
}

export const json2csv = function(data, exclude) {
  var fields = removeFields(Object.keys(data[0]), exclude)
  var replacer = function(key, value) {
    return value === null ? '' : value
  }

  var csv = data.map(function(row) {
    return fields
      .map(function(fieldName) {
        return JSON.stringify(row[fieldName], replacer)
      })
      .join(',')
  })

  csv.unshift(fields.join(',')) // add header column
  csv = csv.join('\r\n')
  return csv
}

export const downloadAsCSV = function(data, elementId, exclude) {
  const csv = json2csv(data, exclude)
  var dataStr = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
  var dlAnchorElem = document.getElementById(elementId)
  dlAnchorElem.setAttribute('href', dataStr)
  dlAnchorElem.setAttribute('download', 'data.csv')
  dlAnchorElem.click()
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
