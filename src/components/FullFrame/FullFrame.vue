<template>
  <a-row>
    <a-spin :spinning="spinning" v-show="spinning" class="spinning" size="large"/>
    <iframe :id="id" v-show="!spinning" class="full-frame" :src="src" :scrolling="scrolling" frameborder="0"></iframe>
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
      default: Math.random().toString(36).slice(-8)
    }
  },
  data() {
    return {
      spinning: true
    }
  },
  methods: {},
  mounted() {
    const self = this
    this.$nextTick(() => {
      const iframe = document.querySelector('.full-frame')
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', function() {
          self.spinning = false
        })
      } else {
        iframe.onload = function() {
          self.spinning = false
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
  min-height: 650px;
  justify-content: center;
  align-items: center;
}

.full-frame {
  padding: 10px;
  width: 100%;
  height: 100%;
  min-height: 630px;
  // overflow: hidden;
  border-radius: 5px;
}
</style>
