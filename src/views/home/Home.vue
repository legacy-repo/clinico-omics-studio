<template>
  <div id="home" :class="['home-wrapper', device]">
    <embeded-frame :src="src" v-if="showFrame" @return="onClickBack"></embeded-frame>
    <a-row class="home-page" v-else>
      <datains-header></datains-header>
      <search-page @show-page="onShowPage"></search-page>
      <datains-footer></datains-footer>
    </a-row>
  </div>
</template>

<script>
import NProgress from 'nprogress' // progress bar
import { mixinDevice } from '@/utils/mixin'
import DatainsFooter from './DatainsFooter'
import DatainsHeader from './DatainsHeader'
import SearchPage from './SearchPage'
import EmbededFrame from '@/views/iframe/EmbededFrame';

export default {
  name: 'Home',
  components: {
    DatainsFooter,
    DatainsHeader,
    SearchPage,
    EmbededFrame
  },
  mixins: [mixinDevice],
  data() {
    return {
      showFrame: false,
      src: 'http://webapps.3steps.cn'
    }
  },
  methods: {
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
}
</style>

<style lang="less">
*::-webkit-scrollbar {
  display: none;
}

* {
  overflow: -moz-scrollbars-none;
}
</style>
