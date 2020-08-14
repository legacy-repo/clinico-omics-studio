<template>
  <!--eslint-disable-->
  <a-row class="filter-panel" :gutter="16" style="margin-right: 0px;">
    <a-col class="left" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Files">
          <a-row style="display: flex; justify-content: center; margin: 10px 10px;">
            <a-input-search
              placeholder="Enter search text"
              enter-button
              style="margin-right: 5px;"
            />
            <a-tooltip>
              <template slot="title">Add a File Filter</template>
              <a-button icon="setting" style="width: 50px;"></a-button>
            </a-tooltip>
          </a-row>
          <a-collapse :activeKey="activeFilterList">
            <a-collapse-panel
              :header="toTitleCase(field.name)"
              :key="field.name"
              v-for="field in fieldsList"
            >
              <filter-list
                :dataSource="field.data"
                :filterKey="field.key"
                @select-filter="filterCollections(field.key, $event)"
              ></filter-list>
            </a-collapse-panel>
          </a-collapse>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Samples" disabled></a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col class="right" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
      <a-tabs class="chart-container" defaultActiveKey="1" @change="onChangeChartTab">
        <a-tab-pane tab="Files" key="1">
          <a-row class="pie-container">
            <a-col v-for="item in fieldsList" :key="item.name" :xl="5" :lg="5" :md="8" :sm="12">
              <pie :dataSource="item.data" :height="120" :width="120" :title="item.shortName" />
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane tab="Search Advanced" key="2" disabled></a-tab-pane>
      </a-tabs>
      <a-tabs defaultActiveKey="1" @change="onChangeTab">
        <a-tab-pane tab="Table" key="1">
          <data-table :queryMap="queryMap" :key="queryMapString"></data-table>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import { mapActions } from 'vuex'
import { FilterList } from '@/components'
import Pie from './Pie'
import DataTable from './DataTable'
import filter from 'lodash.filter'
import map from 'lodash.map'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    DataTable,
    Pie
  },
  data() {
    return {
      fieldsList: [
        {
          name: 'Reference Materials',
          shortName: 'Reference Materials',
          key: 'reference_materials_type',
          data: []
        },
        {
          name: 'Multi Omics Platforms',
          shortName: 'Platform',
          key: 'sequencing_sequence_platform',
          data: []
        },
        {
          name: 'Multi Profiling Sites',
          shortName: 'Profiling Site',
          key: 'sequencing_sequence_site',
          data: []
        },
        {
          name: 'Multi Characters Raw Datasets',
          shortName: 'Character',
          data: [
            { name: 'Small Variants', count: 10 },
            { name: 'Structural Variants', count: 10 },
            { name: 'Methylations', count: 10 },
            { name: 'mRNAs', count: 10 },
            { name: 'miRNAs', count: 10 },
            { name: 'Proteins', count: 10 },
            { name: 'Metabolites', count: 10 }
          ]
        },
        {
          name: 'Data Category',
          shortName: 'Data Category',
          key: 'data_file_data_format',
          data: []
        }
      ],
      filterKeys: [
        'reference_materials_type',
        'sequencing_sequence_platform',
        'sequencing_sequence_site',
        'data_file_data_format'
      ],
      queryMap: {},
      queryMapString: ''
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
    }
  },
  methods: {
    ...mapActions({
      countCollections: 'CountCollections'
    }),
    onChangeChartTab() {},
    onChangeTab() {},
    toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      })
    },
    filterCollections(fieldKey, item) {
      this.queryMap[fieldKey] = item
      this.queryMapString = JSON.stringify(this.queryMap)
      this.fetchCounts(this.queryMap)
    },
    cloneMap(queryMap) {
      return JSON.parse(JSON.stringify(queryMap))
    },
    updateData(oldData, newData) {
      const clonedOldData = this.cloneMap(oldData)
      const clonedNewData = this.cloneMap(newData)

      if (clonedOldData.length > 0) {
        return map(clonedOldData, record => {
          const matched = filter(clonedNewData, item => {
            return item.key === record.key
          })

          if (matched.length > 0) {
            return matched[0]
          } else {
            return {
              name: record.name,
              key: record.key,
              count: 0
            }
          }
        })
      } else {
        return clonedNewData
      }
    },
    fetchCounts(queryMap) {
      Promise.all([
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'reference_materials_type' })),
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'sequencing_sequence_platform' })),
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'sequencing_sequence_site' })),
        this.countCollections(Object.assign(this.cloneMap(queryMap), { group: 'data_file_data_format' }))
      ])
        .then(results => {
          for (let idx in this.filterKeys) {
            const key = this.filterKeys[idx]
            const field = filter(this.fieldsList, record => {
              return record.key === key
            })

            const data = this.updateData(field[0].data, results[idx])

            field[0].data = data
          }
        })
        .catch(error => {
          console.log('fetchCouns Error: ', error)
          this.$message.warn('Cannot fetch data, please retry later.')
        })
    }
  },
  created() {
    this.fetchCounts({})
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
  .left {
    .ant-tabs {
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 5px;
      height: 1200px;

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

  .right {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    min-height: 1200px;

    .ant-tabs {
      height: 988px;
    }

    .chart-container {
      height: 210px;
    }

    .pie-container {
      display: flex;
      height: 150px;
      margin-right: 25px;

      .pie-chart {
        min-width: 130px;

        div canvas {
          margin: 0px 30px;
        }
      }
    }

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
