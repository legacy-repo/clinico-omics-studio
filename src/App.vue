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

import { mixin as langMixin } from '@/store/i18n-mixin'
import { AppDeviceEnquire } from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { projectSettings } from '@/config/defaultSettings'
import map from 'lodash.map'
import { forEach } from '_element-resize-detector@1.2.1@element-resize-detector/src/collection-utils'

const tourSteps = projectSettings.tourSteps

export default {
  mixins: [AppDeviceEnquire, langMixin],
  data() {
    return {}
  },
  methods: {
    listen(shepherd) {
      ['close', 'cancel'].forEach(event =>
        shepherd.on(event, () => {
          this.$store.dispatch('ToggleTourMode', false)
        })
      )
    },
    genSteps(tour, routeSteps) {
        if (routeSteps) {
          const steps = []
          for (let idx in routeSteps) {
            console.log('tourSteps: ', idx)
            const step = routeSteps[idx]
            let buttons = null

            if (idx == 0) {
              buttons = [
                {
                  text: 'Exit',
                  action: () => {
                    this.$store.dispatch('ToggleTourMode', false)
                    tour.complete()
                  }
                },
                {
                  text: 'Next',
                  action: tour.next
                }
              ]
            } else if (idx == routeSteps.length - 1) {
              buttons = [
                {
                  text: 'Prev',
                  action: tour.back
                },
                {
                  text: 'Exit',
                  action: () => {
                    this.$store.dispatch('ToggleTourMode', false)
                    tour.complete()
                  }
                }
              ]
            } else {
              buttons = [
                {
                  text: 'Prev',
                  action: tour.back
                },
                {
                  text: 'Next',
                  action: tour.next
                }
              ]
            }

            steps.push({
              ...step,
              attachTo: {
                element: document.querySelector(step.attachTo.element),
                on: step.attachTo.on
              },
              buttons: buttons
            })
          }

          console.log('Steps: ', steps, routeSteps)
          return steps
        } else {
          return []
        }
    },
    startTour() {
      console.log('Start Tour', this)
      this.$nextTick(() => {
        const tour = this.$shepherd({
          name: 'tour',
          useModalOverlay: true,
          defaultStepOptions: {
            cancelIcon: {
              enabled: true
            }
          }
        })

        this.listen(tour)

        const steps = this.genSteps(tour, tourSteps[this.routeName])

        if (steps.length == 0) {
          this.$message.warning('No tour guide for the page.')
        }

        tour.addSteps(steps)
        tour.start()
      })
    }
  },
  watch: {
    tourMode(newValue, oldValue) {
      if (newValue) {
        this.startTour()
      }
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['lang', 'tourMode']),
    locale() {
      if (this.lang === 'en-US') {
        return enUS
      } else if (this.lang === 'zh-CN') {
        return zhCN
      } else {
        return enUS
      }
    },
    routeName() {
      return this.$route.name
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
@import '~shepherd.js/dist/css/shepherd.css';

#app {
  height: 100%;

  .v-tour__target--highlighted {
    box-shadow: 0 0 0 99999px #00000066;
    pointer-events: auto;
    z-index: 9999;
    border-radius: 5px;
  }
}
</style>
