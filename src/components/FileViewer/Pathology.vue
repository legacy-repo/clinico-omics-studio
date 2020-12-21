<template>
  <a-row class="pathology-container">
    <div :id="id" class="viewer"></div>
  </a-row>
</template>

<script>
import OpenSeadragon from 'openseadragon'
import { arrayEquals } from './components/tool'

export default {
  props: {
    prefixUrl: {
      type: String,
      required: false,
      default: 'https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/'
    },
    // DOM ID
    // dzi文件路径，形如`http://10.157.72.54/pathology/FUSCCTNBC118.dzi`
    data: {
      type: Object,
      required: true,
      validator: data => {
        return (
          arrayEquals(['id', 'tileSources'], Object.keys(data)) &&
          typeof data['id'] == 'string' &&
          typeof data['tileSources'] == 'string'
        )
      }
    }
  },
  data() {
    return {
      viewer: null
    }
  },
  computed: {
    id() {
      return this.data.id
    },
    tileSources() {
      return this.data.tileSources
    }
  },
  mounted() {
    this.viewer = OpenSeadragon({
      id: this.id,
      prefixUrl: this.prefixUrl,
      tileSources: this.tileSources,
      showNavigator: true,
      // Initial rotation angle
      degrees: 90,
      // Show rotation buttons
      showRotationControl: true,
      // Enable touch rotation on tactile devices
      gestureSettingsTouch: {
        pinchRotate: true
      }
    })
  },
  created() {}
}
</script>

<style lang="less" scoped>
.pathology-container {
  width: 100%;
  height: 100%;
  background-color: #000;

  .viewer {
    height: 100%;
    width: 100%;
  }
}
</style>
