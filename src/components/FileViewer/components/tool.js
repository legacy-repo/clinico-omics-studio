/**
 Function: 工具类方法
 User: burning <923398776@qq.com>
 Date: 2020年08月31日
 */

// 创建一个div
export const newDiv = () => {
  let canvasBox = document.createElement('div')
  canvasBox.classList.add('list')
  return canvasBox
}

export const arrayEquals = function(array1, array2) {
  if (!(array1 || array2)) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (array2.indexOf(array1[i]) < 0) {
      return false
    }
  }

  return true
}
