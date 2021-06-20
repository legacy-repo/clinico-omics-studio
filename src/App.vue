<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
      <v-tour name="clinicoOmicsTour" v-if="steps" :steps="steps" :callbacks="clinicoOmicsCallbacks"></v-tour>
    </div>
  </a-locale-provider>
</template>

<script>
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

import { mixin as langMixin } from '@/store/i18n-mixin'
import { AppDeviceEnquire } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { projectSettings } from '@/config/defaultSettings'

const tourSteps = projectSettings.tourSteps

export default {
  mixins: [AppDeviceEnquire, langMixin],
  data() {
    return {
      steps: tourSteps,
      clinicoOmicsCallbacks: {
        onNextStep: function (currentStep) {
          // Just make sure to execute the route change only if it's the last step of the current page, here for example index = 2 (so it's step 3, the callback will be called from step 3 to 4)
          if (currentStep === tourSteps.length - 1) {
            this.$router.push('dashboard')
          }
        }
      }
    }
  },
  methods: {},
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
  },
  created() {
    // 从缓存設置中加载当前语言
    let langCache = this.$ls.get('lang')
    if (langCache !== null) {
      this.setLang(langCache)
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
