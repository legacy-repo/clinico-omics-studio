<template>
  <a-row>
    <a-drawer
      title="Chart List"
      placement="left"
      :closable="false"
      :visible="visible"
      :get-container="false"
      :wrap-style="{ position: 'absolute' }"
      @close="onClose"
    >
      <p>Some contents...</p>
    </a-drawer>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onClose() {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>