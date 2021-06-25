<template>
  <full-frame :id="id" :src="url" :onloadfn="onload(minHeight)"></full-frame>
</template>

<script>
import FullFrame from '@/components/FullFrame'

export default {
  name: 'DataPortal',
  components: {
    FullFrame
  },
  props: {
    id: {
      type: String,
      required: false,
      default: Math.random()
        .toString(36)
        .slice(-8)
    },
    subpath: {
      type: String,
      required: false,
      default: undefined
    },
    minHeight: {
      type: Number,
      required: false,
      default: 600
    }
  },
  computed: {
    url() {
      return this.joinPath(this.src, this.subpath)
    }
  },
  data() {
    return {
      // src: 'http://data.3steps.cn',
      src: 'http://cbioportal.oss-cn-shanghai.aliyuncs.com'
    }
  },
  methods: {
    onload(minHeight) {
      return function (id) {
        console.log('DataPortal: ', id)
        const iframe = document.getElementById(id)
        const resizeIframe = function(iframe, height) {
          iframe.setAttribute('style', 'height: ' + height + 'px;')
        }

        window.addEventListener(
          'message',
          event => {
            console.log('iFrame postMessage: ', event, minHeight)
            if (event.data.iframeId === id) {
              const height = event.data.pageHeight < minHeight ? minHeight : event.data.pageHeight
              resizeIframe(iframe, height)
            }
          },
          false
        )

        iframe.contentWindow.postMessage(
          { resizeIframe: true, hideHeader: true, disableLink: true, iframeId: id, element: '#reactRoot' },
          'http://cbioportal.oss-cn-shanghai.aliyuncs.com/'
        )
      }
    },
    joinPath(root, subpath) {
      if (subpath) {
        return root.replace(/\/$/g, '') + subpath
      } else {
        return root + '?hideHeader=true'
      }
    }
  }
}
</script>

<style>
</style>