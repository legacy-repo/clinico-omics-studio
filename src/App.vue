<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

import { AppDeviceEnquire } from '@/utils/mixin'
import { mapGetters } from 'vuex'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {}
  },
  mounted() {},
  computed: {
    ...mapGetters(['lang']),
    locale() {
      if (this.lang === 'en-US') {
        return enUS
      } else if (this.lang === 'zh-CN') {
        return zhCN
      } else {
        return enUS
      }
    }
  }
}
</script>

<style lang="less">
@import url('./components/global.less');

#app {
  height: 100%;
}
</style>
