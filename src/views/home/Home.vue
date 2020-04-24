<template>
  <div id="home" :class="['home-wrapper', device]">
    <datains-header></datains-header>
    <search-page @show-page="onShowPage"></search-page>
    <datains-footer></datains-footer>
    <a-back-top />
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import DatainsFooter from './DatainsFooter'
import DatainsHeader from './DatainsHeader'
import SearchPage from './SearchPage'

export default {
  name: 'Home',
  components: {
    DatainsFooter,
    DatainsHeader,
    SearchPage
  },
  mixins: [mixinDevice],
  data () {
    return {

    }
  },
  methods: {
    onShowPage (event) {
      console.log('Show Page: ', event)
      const link = event.link
      // Set src attribute for iframe
      if (event.iframe_enabled) {
        this.$router.push({ name: 'Webapps', query: { src: link } })
      } else {
        window.open(link, '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
#home.home-wrapper {
  width: 100%;
  height: 100%;
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
