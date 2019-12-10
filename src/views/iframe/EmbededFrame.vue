<template>
  <a-row class="frame-container">
    <a-button class="button" type="primary" shape="circle" icon="left" size="large" @click="onClickBack" />
    <vue-friendly-iframe :src="src" class="vue-iframe" @document-load="onLoad"
                         frameborder="0" allowfullscreen="true" scrolling="auto">
    </vue-friendly-iframe>
  </a-row>
</template>

<script>
import NProgress from 'nprogress' // progress bar
import VueFriendlyIframe from 'vue-friendly-iframe';

export default {
  name: 'EmbededFrame',
  components: {
    VueFriendlyIframe
  },
  data() {
    return {

    }
  },
  props: {
    src: {
      type: String,
      required: true
    },
    toPath: {
      type: String,
      required: false
    }
  },
  methods: {
    onLoad() {
      NProgress.done()
    },
    onClickBack() {
      if (this.toPath) {
        this.$router.push({ path: this.toPath })
      }
      
      this.$emit('return')
    }
  },
  created() {
    NProgress.start()
  }
}
</script>

<style lang="less">
.frame-container {
  width: 100%;
  height: 100%;

  .button {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .vue-iframe {
    width: 100%;
    height: 100%;

    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>