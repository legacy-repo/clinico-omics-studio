import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings';
import themeColor from './themeColor.js'

// let lessNodesAppended

const colorList = [
  {
    key: 'Dusk', color: '#F5222D'
  },
  {
    key: 'Volcano', color: '#FA541C'
  },
  {
    key: 'Nightfall', color: '#FAAD14'
  },
  {
    key: 'Bright Cyan', color: '#13C2C2'
  },
  {
    key: 'Aurora Green', color: '#52C41A'
  },
  {
    key: 'Blue Dawn（Default）', color: '#1890FF'
  },
  {
    key: 'Geek Blue', color: '#2F54EB'
  },
  {
    key: 'Dark Purple', color: '#722ED1'
  }
]

const updateTheme = newPrimaryColor => {
  const hideMessage = message.loading('Change the theme...', 0)
  themeColor.changeColor(newPrimaryColor).finally(t => {
    hideMessage()
  })
}

/*
const updateTheme = primaryColor => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return;
  } * /
  // Determine if the component is remounted
  if (!primaryColor) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt () {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor
        })
        .then(() => {
          hideMessage()
        })
        .catch(() => {
          message.error('Failed to update theme')
          hideMessage()
        })
    }, 200)
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}
*/

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
