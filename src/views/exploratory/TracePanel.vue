<template>
  <a-row class="trace-panel">
    <a-col class="panel-header">
      <a-button type="primary" @click="shrinkAll" v-if="collapsed"> <a-icon type="shrink" />Collapse All </a-button>
      <a-button v-else @click="expandAll"> <a-icon type="arrows-alt" />Expand All </a-button>
      <a-button type="primary" @click="addTrace('trace ' + traces.length)"> <a-icon type="plus" />Trace </a-button>
    </a-col>
    <a-col class="panel-body">
      <a-collapse v-for="trace in traces" :key="trace.name" :activeKey="activeKeys[trace.name]">
        <a-collapse-panel :key="trace.name" :header="trace.name">
          <a-row>
            <a-col :span="6">
              <span class="label">Type</span>
            </a-col>
            <a-col :span="18">
              <a-button @click="chooseChart" :icon="formatIcon(trace.type)" style="width: 100%" v-if="trace.type">{{ formatTitle(trace.type) }}</a-button>
              <a-button @click="chooseChart" style="width: 100%" v-else>Choose chart...</a-button>
              <a-select
                style="width: 100%; display: none"
                @change="changeTrace(trace.name, 'type', $event)"
                placeholder="Choose plot..."
              >
                <a-select-option :value="plotType" v-for="plotType in plotTypeList" :key="plotType">{{
                  plotType
                }}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6">
              <span class="label">X</span>
            </a-col>
            <a-col :span="18">
              <a-select style="width: 100%" @change="changeTrace(trace.name, 'x', $event)" placeholder="Choose data...">
                <a-select-option :value="field" v-for="field in fields" :key="field">{{ field }}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="6">
              <span>Y</span>
            </a-col>
            <a-col :span="18">
              <a-select style="width: 100%" @change="changeTrace(trace.name, 'y', $event)" placeholder="Choose data...">
                <a-select-option :value="field" v-for="field in fields" :key="field">{{ field }}</a-select-option>
              </a-select>
            </a-col>
          </a-row>
          <a-icon slot="extra" type="close" @click="removeTrace(trace.name)" />
        </a-collapse-panel>
        <div class="mask-window" v-if="chartPanelActive"></div>
        <chart-panel @select-chart="changeTrace(trace.name, 'type', $event)" v-if="chartPanelActive" @close="closeChartPanel"></chart-panel>
      </a-collapse>
      <a-row v-if="traces.length == 0" class="empty-container">
        <a-col>
          <a-icon type="bar-chart" style="font-size: 50px; color: #506784" />
        </a-col>
        <a-col>
          <h2 style="margin: 10px 0px; color: #506784">Trace your data.</h2>
        </a-col>
        <a-col>
          <p>Traces of various types like bar and line are the building blocks of your figure.</p>
          <br />
          <p>You can add as many as you like, mixing and matching types and arranging them into subplots.</p>
          <br />
          <p>Click on the + button above to add a trace.</p>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import v from 'voca'
import { mapActions, mapState } from 'vuex'
import ChartPanel from './ChartPanel'

export default {
  components: {
    ChartPanel
  },
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      plotTypeList: ['scatter'],
      collapsed: false,
      activeKeys: {},
      chartPanelActive: false
    }
  },
  computed: mapState({
    traces: state => state.chartStudio.figure.data
  }),
  methods: {
    ...mapActions({
      addTrace: 'AddTrace',
      updateTrace: 'UpdateTrace',
      removeTrace: 'RemoveTrace'
    }),
    formatIcon(type) {
      switch (type) {
        case 'scatter':
          return 'dot-chart'
        case 'line':
          return 'line-chart'
        case 'area':
          return 'area-chart'
        case 'heatmap':
          return 'heat-map'
        case 'pie':
          return 'pie-chart'
        case 'bar':
          return 'bar-chart'
        case 'table':
          return 'table'
        default:
          return 'picture'
      }
    },
    formatTitle(value) {
      return v.titleCase(value)
    },
    chooseChart() {
      this.chartPanelActive = true
    },
    closeChartPanel() {
      this.chartPanelActive = false
    },
    expandAll() {
      this.traces.forEach(trace => {
        this.activeKeys[trace.name] = trace.name
      })

      this.collapsed = true
    },
    shrinkAll() {
      this.activeKeys = {}
      this.collapsed = false
    },
    changeTrace(name, key, value) {
      console.log('Change Trace: ', name, key, value)
      const trace = {}
      trace['name'] = name
      trace[key] = value
      this.updateTrace(trace)
    }
  }
}
</script>

<style lang="less" scoped>
.trace-panel {
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 0px 10px;

  .panel-header {
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;

    .ant-btn:first-child {
      background-color: unset;
      border: unset;
      box-shadow: unset;
      padding: 0px;
      color: #506784;
    }
  }

  .panel-body {
    height: calc(100% - 52px);

    .ant-collapse-content-box {
      .ant-row {
        color: #506784;
        font-weight: 300;
        height: 55px;
        padding: 10px;
        border-bottom: 1px solid #c8d4e3;

        .ant-col {
          display: flex;
          align-items: center;
          height: 100%;
        }
      }

      .ant-row:last-child {
        border-bottom: 0px;
      }
    }

    .empty-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70%;
      flex-direction: column;
      text-align: justify;
    }
  }
}
</style>

<style lang="less">
.trace-panel {
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding-top: 5px;
    padding-bottom: 5px;
    color: #fff;
    background-color: #506784;
    border: 1px solid #506784;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(42, 63, 95, 0.4);
  }

  .ant-collapse > .ant-collapse-item {
    margin-bottom: 5px;
    border: unset;
  }

  .ant-collapse > .ant-collapse-item-active {
    .ant-collapse-header {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    .ant-collapse-content-active {
      border-radius: 4px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border: 1px solid #c8d4e3;
    }
  }

  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }

  .ant-collapse {
    background-color: unset;
    border: unset;
  }

  .chart-panel {
    width: 60%;
    height: 95%;
    position: fixed;
    top: 20px;
    left: 20%;
    z-index: 1000;
  }
}
</style>