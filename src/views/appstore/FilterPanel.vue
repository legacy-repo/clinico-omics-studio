<template>
  <!--eslint-disable-->
  <a-row class="filter-panel" :gutter="16">
    <a-col class="left" :xl="{span: expanded ? 0 : 6}"
      :lg="{span: expanded ? 0 : 6}"
      :md="{span: expanded ? 0 : 24}"
      :sm="{span: expanded ? 0 : 24}"
      :xs="{span: expanded ? 0 : 24}">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Filter">
          <a-row style="display: flex; justify-content: center; margin: 10px 10px;">
            <a-input-search
              allowClear
              data-v-step="appstore-filter-panel-search"
              placeholder="Enter Search Text"
              style="margin-bottom: 5px;"
              @change="filterFieldsList"
            />
          </a-row>
          <a-collapse :activeKey="activeFilterList">
            <a-collapse-panel
              :header="toTitleCase(field.name)"
              :key="field.name"
              v-for="field in filteredFieldsList"
            >
              <filter-list :checkboxMode="false" :dataSource="field.data" @select-filter="filterItems(field.key, $event)"></filter-list>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col class="right" :class="{expanded: expanded}"
      :xl="{span: expanded ? 24 : 18}"
      :lg="{span: expanded ? 24 : 18}"
      :md="24" :sm="24" :xs="24">
      <a-tabs defaultActiveKey="1" :activeKey="currentTab" @change="onChangeTab">
        <a-tab-pane tab="Apps" key="app">
          <app-list :appList="filteredApps" :key="localAppMode"></app-list>
        </a-tab-pane>
        <!-- TService -->
        <a-tab-pane tab="Tools" key="tool" v-if="filteredTools.length > 0">
          <tool-list :toolList="filteredTools" :key="localToolMode"></tool-list>
        </a-tab-pane>
        <a-tab-pane tab="Reports" key="report" v-if="filteredReports.length > 0">
          <report-list :reportList="filteredReports" :key="localReportMode"></report-list>
        </a-tab-pane>
        <a-tab-pane tab="Charts" key="chart" disabled v-if="filteredCharts.length > 0">
          <chart-list :chartList="filteredCharts" :key="localChartMode"></chart-list>
        </a-tab-pane>
        <a-button slot="tabBarExtraContent" @click="expandPanel" type="primary" v-if="!expanded">
          Hide Filter Panel<a-icon type="fullscreen" />
        </a-button>
        <a-button slot="tabBarExtraContent" @click="expandPanel" type="primary" v-else>
          Show Filter Panel<a-icon type="fullscreen-exit" />
        </a-button>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex'
import { FilterList } from '@/components'
import AppList from '@/views/appstore/AppList'
import ToolList from '@/views/appstore/ToolList'
import ReportList from '@/views/appstore/ReportList'
import ChartList from '@/views/appstore/ChartList'
import orderBy from 'lodash.orderby'
import map from 'lodash.map'
import groupBy from 'lodash.groupby'
import filter from 'lodash.filter'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    AppList,
    ToolList,
    ReportList,
    ChartList
  },
  data() {
    return {
      loading: true,
      appList: [],
      tools: [],
      fieldsList: [
        {
          name: 'Category',
          shortName: 'category',
          key: 'category',
          data: []
        },
        {
          name: 'Author',
          shortName: 'author',
          key: 'author',
          data: []
        },
        {
          name: 'Name',
          shortName: 'title',
          key: 'title',
          data: []
        }
      ],
      filterValue: '',
      currentTab: 'app',
      localAppMode: false,
      localApps: [],
      // Tservice
      localToolMode: false,
      localTools: [],
      localReportMode: false,
      localReports: [],
      localChartMode: false,
      localCharts: [],
      expanded: true
    }
  },
  props: {},
  computed: {
    activeFilterList() {
      const active = []
      for (const field of this.fieldsList) {
        active.push(field.name)
      }
      return active
    },
    filteredFieldsList() {
      if (this.filterValue.length > 0) {
        return map(this.fieldsList, fieldRecord => {
          console.log('filteredFieldsList: ', fieldRecord, this.filterValue)
          const newFieldRecord = {}
          newFieldRecord['name'] = fieldRecord.name
          newFieldRecord['shortName'] = fieldRecord.shortName
          newFieldRecord['key'] = fieldRecord.key
          newFieldRecord['data'] = filter(fieldRecord.data, record => {
            return record.name.match(this.filterValue)
          })

          return newFieldRecord
        })
      } else {
        return this.fieldsList
      }
    },
    filteredApps() {
      if (this.localAppMode) {
        return orderBy(this.localApps, 'title', 'aes')
      } else {
        return orderBy(this.appList, 'title', 'aes')
      }
    },
    filteredTools() {
      if (this.localToolMode) {
        return filter(orderBy(this.localTools, 'title', 'aes'), item => {
          return !item.hidden
        })
      } else {
        return filter(orderBy(this.toolList, 'title', 'aes'), item => {
          return !item.hidden
        })
      }
    },
    filteredReports() {
      if (this.localReportMode) {
        return orderBy(this.localReports, 'title', 'aes')
      } else {
        return orderBy(this.reportList, 'title', 'aes')
      }
    },
    filteredCharts() {
      if (this.localChartMode) {
        return orderBy(this.localCharts, 'title', 'aes')
      } else {
        return orderBy(this.chartList, 'title', 'aes')
      }
    },
    toolList() {
      return filter(this.tools, o => {
        return o.category.toUpperCase() == 'TOOL'
      })
    },
    reportList() {
      return filter(this.tools, o => {
        return o.category.toUpperCase() == 'REPORT'
      })
    },
    chartList() {
      return filter(this.tools, o => {
        return o.category.toUpperCase() == 'CHART'
      })
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    ...mapActions({
      getAppList: 'GetAppList',
      getAppManifest: 'GetAppManifest',
      getToolManifest: 'GetToolManifest'
    }),
    expandPanel() {
      this.expanded = !this.expanded
    },
    onChangeTab(activeKey) {
      this.currentTab = activeKey

      if (activeKey === 'app') {
        // this.getList()
        this.generateFieldsList(this.appList)
      } else if (activeKey === 'tool') {
        this.generateFieldsList(this.toolList)
      } else if (activeKey === 'report') {
        this.generateFieldsList(this.reportList)
      } else if (activeKey === 'chart') {
        this.generateFieldsList(this.chartList)
      }
    },
    generateFieldsList(appList) {
      this.fieldsList.forEach(element => {
        if (element.key === 'category') {
          element.data = Object.entries(
            groupBy(appList, app => {
              return app.category
            })
          ).map(([key, value]) => {
            return {
              name: key,
              key: key,
              count: value.length
            }
          })
        } else if (element.key === 'title') {
          element.data = Object.entries(
            groupBy(appList, app => {
              return app.title
            })
          ).map(([key, value]) => {
            return {
              name: key,
              key: key,
              count: value.length
            }
          })
        } else if (element.key === 'author') {
          element.data = Object.entries(
            groupBy(appList, app => {
              return app.author
            })
          ).map(([key, value]) => {
            return {
              name: key,
              key: key,
              count: value.length
            }
          })
        }
      })
    },
    filterFieldsList(e) {
      this.filterValue = e.target.value
    },
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    filterItems(key, e) {
      if (this.currentTab === 'app') {
        this.localAppMode = true
        this.localApps = filter(this.appList, (record) => {
          return record[key] === e.key
        })
      } else if (this.currentTab === 'tool') {
        this.localToolMode = true
        this.localTools = filter(this.toolList, (record) => {
          return record[key] === e.key
        })
      } else if (this.currentTab === 'report') {
        this.localReportMode = true
        this.localReports = filter(this.reportList, (record) => {
          return record[key] === e.key
        })
      } else if (this.currentTab === 'chart') {
        this.localChartMode = true
        this.localCharts = filter(this.chartList, (record) => {
          return record[key] === e.key
        })
      }

      console.log(key, e, this.localApps, this.localTools, this.localReports, this.localCharts)
    },
    getList() {
      this.getAppManifest().then(res => {
        console.log('res', res)
        this.appList = res.data
        this.generateFieldsList(this.appList)
        this.loading = false
      })

      this.getToolManifest().then(res => {
        console.log('res', res)
        this.tools = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.filter-panel {
  .left {
    .ant-tabs {
      .ant-tabs-bar {
        margin: 0px;
      }

      .ant-tabs-content {
        height: calc(100% - 60px);
        overflow: scroll;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.filter-panel {
  margin-right: 0px !important;

  .left {
    height: 91vh;

    .ant-tabs {
      height: 100%;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 5px;

      .ant-collapse {
        border: 0px;
        border-top: 1px solid #d9d9d9;
        border-radius: 0px;

        .ant-collapse-item:last-child,
        .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
          border-radius: 0px;
        }
      }
    }
  }

  .expanded {
    margin-left: 8px;
    width: calc(100% - 8px);
  }

  .right {
    padding-bottom: 20px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    height: 91vh;

    .graph-tab {
      h4 {
        font-size: 1.5rem;
      }

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<style lang="less">
.card-meta {
  .ant-card-meta-description {
    align-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.ant-popover {
  max-width: 50%;
}
</style>
