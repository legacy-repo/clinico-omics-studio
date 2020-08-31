<template>
  <div class="json-viewer-container">
    <a-row class="json-header">
      <a-button-group>
        <a-button @click="shrinkAll"> <a-icon type="vertical-align-middle" /> </a-button>
        <a-button @click="expandAll"> <a-icon type="column-height" /> </a-button>
      </a-button-group>
    </a-row>
    <vue-json-pretty class="json-viewer" :data="data" :deep="deep" showLength></vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  props: {
    data: {
      required: false,
      type: Object,
      default: () => Object()
    }
  },
  data () {
    return {
      deep: 1
    }
  },
  methods: {
    shrinkAll() {
      this.deep = 1
    },
    expandAll() {
      this.deep = 10
    }
  },
  components: {
    VueJsonPretty
  }
}
</script>

<style lang="less" scoped>
.json-viewer-container {
  height: 100%;

  .json-header {
    display: flex;
    height: 32px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    .ant-btn-group {
      width: 100%;
      padding: 0px;

      .ant-btn {
        background-color: #506784;
        color: #fff;
        width: 50%;
        border: 0px;
        border-radius: 0px;
      }

      .ant-btn:first-child {
        border-right: 1px;
      }

      .ant-btn:last-child {
        border-top-right-radius: 5px;
      }
    }
  }

  .json-viewer {
    height: calc(100% - 40px);
    overflow: scroll;
    padding: 20px;
  }
}
</style>
