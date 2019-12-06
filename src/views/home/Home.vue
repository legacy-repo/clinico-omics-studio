<template>
  <div id="home" :class="['home-wrapper', device]">
    <datains-header></datains-header>
    <search-page></search-page>
    <datains-footer></datains-footer>
  </div>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import DatainsFooter from './DatainsFooter'
import DatainsHeader from './DatainsHeader'
import SearchPage from './SearchPage'

export default {
  name: 'Home',
  components: { DatainsFooter, DatainsHeader, SearchPage },
  mixins: [mixinDevice],
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#home.home-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
