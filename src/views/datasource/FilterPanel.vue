<template>
  <!--eslint-disable-->
  <a-row class="filter-panel" :gutter="16">
    <a-col class="left" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
      <a-collapse :activeKey="activeFilterList">
        <a-collapse-panel :header="toTitleCase(field.name)" :key="field.name" v-for="field in fieldsList">
          <filter-list :dataSource="field.data"></filter-list>
        </a-collapse-panel>
      </a-collapse>
    </a-col>
    <a-col class="right" :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
      <a-tabs class="chart-container" defaultActiveKey="1" @change="onChangeChartTab">
        <a-tab-pane tab="Cases" key="1">
          <!-- <a-col v-for="item in dataList" :key="item.name" :xl="6" :lg="6" :md="8" :sm="12">
            <pie :dataSource="item.data" :height="400" :title="item.name" />
          </a-col> -->
          <img style="height: 155px;" src="http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/case-pie-chart.png">
        </a-tab-pane>
      </a-tabs>
      <a-tabs defaultActiveKey="1" @change="onChangeTab">
        <a-tab-pane tab="Table" key="1">
          <data-table></data-table>
        </a-tab-pane>
        <a-tab-pane tab="Graph" key="2" class="graph-tab">
          <h4>Case count per Data Category</h4>
          <img style="height: 860px;" src="http://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/case-count.png">
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<script>
import { FilterList, Pie } from '@/components'
import DataTable from './DataTable'

export default {
  name: 'FilterPanel',
  components: {
    FilterList,
    DataTable,
    Pie
  },
  data () {
    return {
      dataList: [
        {
          name: 'Primary Site',
          data: [
            { item: '事例一', count: 40 },
            { item: '事例二', count: 21 },
            { item: '事例三', count: 17 },
            { item: '事例四', count: 13 },
            { item: '事例五', count: 9 }
          ]
        }, {
          name: 'Project',
          data: [
            { item: '事例一', count: 40 },
            { item: '事例二', count: 21 },
            { item: '事例三', count: 17 },
            { item: '事例四', count: 13 },
            { item: '事例五', count: 9 }
          ]
        }
      ],
      fieldsList: [
        {
          name: 'Primary Site',
          data: [
            {
              name: 'Breast',
              nums: '3,650'
            }, {
              name: 'Ovary',
              nums: '1,525'
            }, {
              name: 'Colon',
              nums: '1,053'
            }, {
              name: 'Kidney',
              nums: '864'
            }, {
              name: 'Blood',
              nums: 475
            }, {
              name: 'Pancreas',
              nums: '445'
            }
          ]
        }, {
          name: 'Program',
          data: [
            {
              name: 'TCGA',
              nums: '5,817'
            }, {
              name: 'TARGET',
              nums: '1,542'
            }
          ]
        }, {
          name: 'Project',
          data: [
            {
              name: 'TCGA-OV',
              nums: 587
            }
          ]
        }
      ]
    }
  },
  props: {},
  computed: {
    activeFilterList () {
      const active = []
      for (const field of this.fieldsList) {
        active.push(field.name)
      }
      return active
    }
  },
  methods: {
    onChangeChartTab () {

    },
    onChangeTab () {

    },
    toTitleCase (str) {
      return str.replace(
        /\w\S*/g,
        function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.filter-panel {
  .right {
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    min-height: 650px;

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
