<template>
  <iframe class="full-frame" :src="src" scrolling="no" frameborder="0"></iframe>
</template>

<script>
export default {
  name: 'FullFrame',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.full-frame {
  width: 100%;
  height: 100%;
  min-height: 640px;
  // overflow: hidden;
}
</style>
