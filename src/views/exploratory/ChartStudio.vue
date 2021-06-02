<template>
  <fullscreen ref="fullscreen">
    <a-layout
      class="chart-studio"
      :class="{ fullscreen: fullscreenActive, 'non-fullscreen': !fullscreenActive }"
    >
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        :class="{ 'menu': !collapsed, 'mini-menu': collapsed }"
      >
        <a-row class="menu-header">
          <!-- <a-avatar style="backgroundColor:#87d068" icon="bar-chart" @click="toggleCollapsed" /> -->
          <file-logo
            @click="toggleCollapsed"
            :class="{ 'mini-icon': collapsed, 'icon': !collapsed }"
          ></file-logo>
        </a-row>
        <a-menu mode="inline" class="menu-body" theme="light">
          <a-sub-menu :key="item.key" v-for="item in menu">
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{ item.title }}</span>
            </span>
            <a-menu-item v-for="subitem in item.children" :key="subitem.key" @click="redirectKey(subitem.key)">{{ subitem.title }}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="panel-container">
          <a-col class="left-panel">
            <trace-panel :fields="fields" v-if="defaultKey == 'structure-traces'"></trace-panel>
            <json-viewer :data="jsonData" showLength :deep="2" v-if="defaultKey == 'json-tree'"></json-viewer>
          </a-col>
          <a-col class="right-panel">
            <a-row class="panel-header">
              <a-button icon="upload" @click="switchImportForm">Import</a-button>
              <a-button icon="fullscreen" v-if="!fullscreenActive" @click="fullscreenChange"></a-button>
              <a-button icon="fullscreen-exit" v-else @click="fullscreenChange"></a-button>
            </a-row>
            <a-row class="panel-body">
              <a-col class="table-container">
                <chart-table
                  :clientHeight="tableHeight"
                  @resize-height="resizeHeight"
                ></chart-table>
              </a-col>
              <a-col class="graph-container">
                <div id="graph" ref="graph"></div>
              </a-col>
            </a-row>
          </a-col>
        </a-layout-content>
      </a-layout>
      <div class="mask-window" v-if="importFormActive" @click="switchImportForm"></div>
      <import-form
        class="popup-form-container"
        v-if="importFormActive"
        @finished="switchImportForm"
      ></import-form>
    </a-layout>
  </fullscreen>
</template>

<script>
import ImportForm from './ImportForm'
import ChartTable from './ChartTable'
import TracePanel from './TracePanel'
import Plotly from '@/views/plotly'
import { fileLogo } from '@/core/icons'
import { mapState } from 'vuex'
import map from 'lodash.map'
import flatten from 'lodash.flatten'
import JsonViewer from './JsonViewer'

export default {
  components: {
    ImportForm,
    ChartTable,
    fileLogo,
    TracePanel,
    JsonViewer
  },
  computed: mapState({
    fields: state => {
      const fields = map(state.chartStudio.files, file => {
        if (file.data.length > 0) {
          return map(Object.keys(file.data[0]), item => {
            return file.name + '.' + item
          })
        } else {
          return []
        }
      })

      return flatten(fields)
    },
    data: state => state.chartStudio.figure.data,
    config: state => state.chartStudio.figure.config,
    layout: state => state.chartStudio.figure.layout,
    jsonData: state => state.chartStudio.figure
  }),
  watch: {
    data: {
      handler(newData, oldData) {
        if (oldData && newData) {
          console.log('Update Plotly\'s Chart: ', newData, oldData)
          Plotly.newPlot('graph', newData, this.layout, this.config)
        }
      },
      immediate: true,
      deep: true
    },
    layout: {
      handler(newData, oldData) {
        if (oldData && newData) {
          console.log('Update Plotly\'s Layout: ', newData, oldData)
          Plotly.newPlot('graph', this.data, newData, this.config)
        }
      },
      immediate: true,
      deep: true
    },
    config: {
      handler(newData, oldData) {
        if (oldData && newData) {
          console.log('Update Plotly\'s Config: ', newData, oldData)
          Plotly.newPlot('graph', this.data, this.layout, newData)
        }
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      collapsed: false,
      fileBrowserActive: false,
      importFormActive: false,
      defaultKey: 'structure-traces',
      menu: [
        {
          key: 'structure',
          icon: 'build',
          title: 'Structure',
          children: [
            {
              key: 'structure-traces',
              icon: '',
              title: 'Traces'
            },
            {
              key: 'structure-subplots',
              icon: '',
              title: 'Subplots'
            }
          ]
        },
        {
          key: 'theme',
          icon: 'bg-colors',
          title: 'Theme',
          children: [
            {
              key: 'theme-choose',
              icon: '',
              title: 'Choose'
            },
            {
              key: 'theme-create',
              icon: '',
              title: 'Create'
            }
          ]
        },
        {
          key: 'style',
          icon: 'setting',
          title: 'Style',
          children: [
            {
              key: 'style-general',
              icon: '',
              title: 'General'
            },
            {
              key: 'style-traces',
              icon: '',
              title: 'Traces'
            },
            {
              key: 'style-axes',
              icon: '',
              title: 'Axes'
            }
          ]
        },
        {
          key: 'annotate',
          icon: 'reconciliation',
          title: 'Annotate',
          children: [
            {
              key: 'annotate-text',
              icon: '',
              title: 'Text'
            },
            {
              key: 'annotate-shape',
              icon: '',
              title: 'Shape'
            },
            {
              key: 'annotate-images',
              icon: '',
              title: 'Images'
            }
          ]
        },
        {
          key: 'export',
          icon: 'export',
          title: 'Export',
          children: [
            {
              key: 'export-image',
              icon: '',
              title: 'Image'
            },
            {
              key: 'export-html',
              icon: '',
              title: 'Html'
            }
          ]
        },
        {
          key: 'json',
          icon: 'file-text',
          title: 'JSON',
          children: [
            {
              key: 'json-tree',
              icon: '',
              title: 'Tree'
            }
          ]
        }
      ],
      tableHeight: 150,
      fullscreenActive: false
    }
  },
  methods: {
    redirectKey(key) {
      this.defaultKey = key
    },
    fullscreenChange() {
      const instance = this.$refs['fullscreen']
      if (instance.getState()) {
        instance.exit()
        this.fullscreenActive = false
      } else {
        instance.enter()
        this.fullscreenActive = true
      }
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
      this.resizeGraph()
    },
    switchImportForm() {
      this.importFormActive = !this.importFormActive
    },
    resizeHeight(height) {
      this.tableHeight = height
      console.log('resizeHeight: ', height)
    },
    resizeGraph() {
      setTimeout(() => {
        const width = this.$refs.graph.clientWidth
        console.log('resizeGraph: ', width)
        Plotly.Plots.resize(document.getElementById('graph'), { width: width })
      }, 100)
    }
  },
  mounted() {
    Plotly.newPlot('graph', this.data, this.layout, this.config)
    window.onresize = this.resizeGraph()
  },
  created() {}
}
</script>

<style lang="less" scoped>
@height: 91vh;
@border-radius: 5px;

.fullscreen {
  height: 100%;
}

.non-fullscreen {
  height: @height;
}

.chart-studio {
  width: 100%;
  border-radius: @border-radius;

  .menu,
  .mini-menu,
  .panel-container {
    border-radius: @border-radius;
    height: 100%;
  }

  .menu {
    width: 150px !important;
    max-width: 150px !important;
    min-width: 150px !important;
  }

  .menu,
  .mini-menu {
    background-color: #fff;
    border: 1px solid #d6d6d6;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    .ant-menu {
      z-index: 1000;
    }

    .menu-header {
      height: 60px;
      margin: 10px 0px;
      font-size: 16px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        cursor: pointer;
        width: 80%;
        height: 80%;
      }

      .mini-icon {
        cursor: pointer;
        width: 60%;
        height: 60%;
      }

      .ant-avatar:hover {
        cursor: pointer;
      }
    }

    .menu-body {
      overflow: scroll;
      height: calc(100% - 80px);
      width: 100%;
      border: unset;
      border-radius: @border-radius;
    }
  }

  .panel-container {
    width: 100%;
    display: flex;
    flex-direction: row;

    .left-panel,
    .right-panel {
      background-color: #fff;
      border-radius: @border-radius;

      .panel-header {
        width: 100%;
        display: flex;
        align-items: center;
      }

      .panel-body {
        height: calc(100% - 48px);
        width: 100%;
        border-radius: @border-radius;
      }
    }

    .left-panel {
      width: 395px;
      margin-right: 5px;
      border: 1px solid #d6d6d6;
      border-left: unset;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      background-color: #ebf0f8;

      .panel-header {
        height: 32px;
      }
    }

    .right-panel {
      width: calc(100% - 300px);
      border: 1px solid #d6d6d6;

      .panel-header {
        padding-right: 10px;
        height: 48px;
        display: flex;
        justify-content: flex-end;

        .ant-btn {
          margin-left: 5px;
        }
      }

      .panel-body {
        overflow: scroll;

        .table-container {
          margin: 0px 10px;
          min-height: 150px;
        }

        .graph-container {
          max-height: 428px;
          width: 100%;
          padding: 5px 0px 0px;
        }
      }
    }
  }
}
</style>