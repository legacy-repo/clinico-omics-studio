<template>
  <full-frame :id="id" :src="url" :onloadfn="onload"></full-frame>
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
      src: 'http://cbioportal.oss-cn-shanghai.aliyuncs.com',
      onload: function(id) {
        console.log('DataPortal: ', id)
        const iframe = document.getElementById(id)
        const resizeIframe = function(iframe, height) {
          iframe.height = height + 'px'
        }

        window.addEventListener("message", function(event) {        
          console.log("iFrame postMessage: ", event)
          resizeIframe(iframe, event.target)
        }, false);

        iframe.contentWindow.postMessage({ resizeIframe: true, hideHeight: true }, 'http://cbioportal.oss-cn-shanghai.aliyuncs.com/')
      }
    }
  },
  methods: {
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