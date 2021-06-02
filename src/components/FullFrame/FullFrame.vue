<template>
  <a-row>
    <a-spin :spinning="spinning" v-show="spinning" class="spinning" size="large" />
    <iframe
      :id="id"
      v-show="!spinning"
      class="full-frame"
      :src="src"
      :scrolling="scrolling"
      frameborder="0"
    ></iframe>
  </a-row>
</template>

<script>
export default {
  name: 'FullFrame',
  props: {
    src: {
      type: String,
      required: true
    },
    scrolling: {
      type: String,
      required: false,
      default: 'yes'
    },
    id: {
      type: String,
      required: false,
      default: Math.random()
        .toString(36)
        .slice(-8)
    },
    onloadfn: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      spinning: true
    }
  },
  methods: {
    reset() {
      this.spinning = true
    },
    inject(self) {
      self.spinning = false

      console.log('FullFrame: ', self.onloadfn)
      if (self.onloadfn) {
        self.onloadfn(self.id)
      }
    }
  },
  watch: {
    $route: 'reset'
  },
  mounted() {
    const self = this
    this.$nextTick(() => {
      const iframe = document.getElementById(self.id)
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          self.inject(self)
        })
      } else {
        iframe.onload = () => {
          self.inject(self)
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
.spinning {
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
}

.full-frame {
  // padding: 10px;
  width: 100%;
  height: 100%;
  min-height: 92vh;
  // overflow: hidden;
  border-radius: 5px;
}
</style>
