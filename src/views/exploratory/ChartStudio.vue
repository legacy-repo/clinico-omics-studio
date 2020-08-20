<template>
  <fullscreen ref="fullscreen">
    <a-layout
      class="chart-studio"
      :class="{ fullscreen: fullscreenActive, 'non-fullscreen': !fullscreenActive }"
    >
      <a-layout-sider v-model="collapsed" class="menu" :trigger="null" collapsible>
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
            <a-menu-item v-for="subitem in item.children" :key="subitem.key">{{ subitem.title }}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="panel-container">
          <a-col class="left-panel">
            <a-row class="panel-header">
              <a-icon type="arrows-alt" />
              <span>&nbsp;Expand All</span>
            </a-row>
            <a-row class="panel-body"></a-row>
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
                  :header="header"
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
      <import-form class="popup-form-container" v-if="importFormActive"></import-form>
    </a-layout>
  </fullscreen>
</template>

<script>
import ImportForm from './ImportForm'
import ChartTable from './ChartTable'
import Plotly from '@/views/plotly'
import { fileLogo } from '@/core/icons'

const trace1 = {}

const trace2 = {}

const layout = {
  hovermode: 'closest',
  autosize: true,
  height: '420',
  margin: {
    l: 80,
    r: 80,
    b: 80,
    t: 50,
    pad: 4
  }
}

const config = { responsive: true }

const data = [trace1, trace2]

export default {
  components: {
    ImportForm,
    ChartTable,
    fileLogo
  },
  data() {
    return {
      collapsed: false,
      fileBrowserActive: false,
      importFormActive: false,
      header: ['test', 'test2'],
      menu: [
        {
          key: 'structure',
          icon: 'build',
          title: 'Structure',
          children: [
            {
              key: 'traces',
              icon: '',
              title: 'Traces'
            },
            {
              key: 'subplots',
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
              key: 'choose',
              icon: '',
              title: 'Choose'
            },
            {
              key: 'create',
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
              key: 'general',
              icon: '',
              title: 'General'
            },
            {
              key: 'traces',
              icon: '',
              title: 'Traces'
            },
            {
              key: 'axes',
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
              key: 'text',
              icon: '',
              title: 'Text'
            },
            {
              key: 'shape',
              icon: '',
              title: 'Shape'
            },
            {
              key: 'images',
              icon: '',
              title: 'Images'
            }
          ]
        }
      ],
      tableHeight: 150,
      fullscreenActive: false
    }
  },
  methods: {
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
    Plotly.newPlot('graph', data, layout, config)
    window.onresize = this.resizeGraph()
  },
  created() {}
}
</script>

<style lang="less" scoped>
@height: 628px;
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
  .panel-container {
    border-radius: @border-radius;
    height: 100%;
  }

  .menu {
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
      width: 295px;
      padding: 0px 10px;
      margin-right: 5px;
      border: 1px solid #d6d6d6;
      border-left: unset;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;

      .panel-header {
        height: 32px;
      }
    }

    .right-panel {
      width: calc(100% - 200px);
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