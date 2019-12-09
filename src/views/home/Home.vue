<template>
  <div id="home" :class="['home-wrapper', device]">
    <keep-alive>
      <a-row class="frame-container" v-if="showFrame">
        <a-button class="button" type="primary" shape="circle" icon="left" size="large" @click="onClickBack" />
        <vue-friendly-iframe :src="src" class="vue-iframe" @document-load="onLoad"
                             frameborder="0" allowfullscreen="true" scrolling="no">
        </vue-friendly-iframe>
      </a-row>
      <a-row class="home-page" v-else>
        <datains-header></datains-header>
        <search-page @show-page="onShowPage"></search-page>
        <datains-footer></datains-footer>
      </a-row>
    </keep-alive>
  </div>
</template>

<script>
import NProgress from 'nprogress' // progress bar
import { mixinDevice } from '@/utils/mixin'
import DatainsFooter from './DatainsFooter'
import DatainsHeader from './DatainsHeader'
import SearchPage from './SearchPage'
import VueFriendlyIframe from 'vue-friendly-iframe';

export default {
  name: 'Home',
  components: {
    DatainsFooter,
    DatainsHeader,
    SearchPage,
    VueFriendlyIframe
  },
  mixins: [mixinDevice],
  data() {
    return {
      showFrame: false,
      src: 'http://webapps.3steps.cn'
    }
  },
  methods: {
    onLoad() {
      NProgress.done()
    },
    onClickBack() {
      this.showFrame = false
    },
    onShowPage(event) {
      console.log('Show Page: ', event)
      const link = event.link
      // Set src attribute for iframe
      if (event.iframe_enabled) {
        this.src = link
        this.showFrame = true
        NProgress.start()
      } else {
        window.open(link, '_blank')
      }
    }
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#home.home-wrapper {
  height: 100%;

  .home-page {
    width: 100%;
    height: 100%;
  }

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
    }
  }
}
</style>

<style lang="less">
*::-webkit-scrollbar {
  display: none;
}

* {
  overflow: -moz-scrollbars-none;
}

.vue-iframe {
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
