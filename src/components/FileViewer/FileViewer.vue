<template>
  <a-row class="file-viewer">
    <a-row class="title" v-if="title">{{ title }}</a-row>
    <pathology :data="data" v-if="viewerType == 'PATHOLOGY'" :class="{'title-mode': title}"></pathology>
    <dicom :data="data" v-else-if="viewerType == 'DICOM'" :class="{'title-mode': title}"></dicom>
    <a-empty v-else />
  </a-row>
</template>

<script>
import Pathology from './Pathology'
import Dicom from './Dicom'

export default {
  components: {
    Pathology,
    Dicom
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    baseUrl: {
      type: String,
      required: true
    },
    instanceId: {
      type: String,
      required: true
    },
    viewerType: {
      type: String,
      required: false,
      validator: viewerType => {
        const viewerList = ['PATHOLOGY', 'DICOM', '']
        return viewerList.indexOf(viewerType) >= 0
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    data() {
      if (this.viewerType == 'PATHOLOGY') {
        return {
          id: Math.random()
            .toString(36)
            .slice(-8),
          tileSources: `${this.baseUrl}/${this.instanceId}.dzi`
        }
      } else if (this.viewerType == 'DICOM') {
        return {
          instanceId: this.instanceId,
          baseUrl: `${this.baseUrl}`
        }
      } else {
        return {}
      }
    }
  },
  methods: {},
  created() {}
}
</script>

<style lang="less" scoped>
.file-viewer {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  // border: 1px solid #d9d9d9;

  .title {
    font-size: 16px;
    background-color: #fff;
    color: #6b6262;
    padding: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .title-mode {
    height: calc(100% - 44px);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .ant-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>