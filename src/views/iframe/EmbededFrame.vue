<template>
  <a-row class="frame-container">
    <a-button
      class="button"
      shape="circle"
      v-if="toPath"
      icon="left"
      size="large"
      @click="onClickBack"/>
    <vue-friendly-iframe
      :src="src"
      class="vue-iframe"
      @document-load="onLoad"
      frameborder="0"
      allowfullscreen="true"
      scrolling="auto">
    </vue-friendly-iframe>
  </a-row>
</template>

<script>
import NProgress from 'nprogress' // progress bar
import VueFriendlyIframe from 'vue-friendly-iframe'

export default {
  name: 'EmbededFrame',
  components: {
    VueFriendlyIframe
  },
  data () {
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
      required: false,
      default: null
    }
  },
  methods: {
    onLoad () {
      NProgress.done()
    },
    onClickBack () {
      if (this.toPath) {
        this.$router.push({ name: this.toPath })
      }

      this.$emit('return')
    }
  },
  created () {
    NProgress.start()
    this.$notification['info']({
      message: 'Notice',
      description: 'Please be patient, the page may loads slightly.'
    })
  }
}
</script>

<style lang="less">
.frame-container {
  width: 100%;
  min-height: 100%;

  .button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }

  .vue-iframe {
    iframe {
      border: 0;
      height: 100%;
      // max-height: 650px;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
}
</style>
