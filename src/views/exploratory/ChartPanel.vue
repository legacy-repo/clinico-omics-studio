<template>
  <a-row class="chart-panel">
    <a-col class="title">
      <span style="float: left;">Select Trace Type</span>
      <span style="float: right;" @click="closePanel"><a-icon type="close" /></span>
    </a-col>
    <a-col class="row">
      <chart-list
        @dispatch="selectChart"
        v-for="category in charts"
        :key="category.title"
        :title="category.title"
        :charts="category.charts"
      ></chart-list>
    </a-col>
  </a-row>
</template>

<script>
import ChartList from './ChartList'

export default {
  components: {
    ChartList
  },
  data() {
    return {
      charts: [
        {
          title: 'Simple',
          charts: [
            {
              title: 'Scatter',
              key: 'scatter'
            },
            {
              title: 'Bar',
              key: 'bar'
            },
            {
              title: 'Line',
              key: 'line'
            },
            {
              title: 'Area',
              key: 'area'
            },
            {
              title: 'Heatmap',
              key: 'heatmap'
            },
            {
              title: 'Table',
              key: 'table'
            },
            {
              title: 'Contour',
              key: 'contour'
            },
            {
              title: 'Pie',
              key: 'pie'
            }
          ]
        },
        {
          title: 'Distribution',
          charts: []
        },
        {
          title: '3D',
          charts: []
        },
        {
          title: 'Maps',
          charts: []
        },
        {
          title: 'Finance',
          charts: []
        },
        {
          title: 'Specialized',
          charts: []
        }
      ]
    }
  },
  methods: {
    closePanel() {
      this.$emit('close')
    },
    selectChart(payload) {
      let {type, chart} = payload
      console.log('Select Chart: ', type, chart)
      this.$emit('select-chart', chart.key)
      this.closePanel()
    }
  }
}
</script>

<style lang="less" scoped>
.chart-panel {
  border-radius: 5px;
  border: 1px solid #d6d6d6;

  .title {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 16px;
    padding: 15px 10px;
    background-color: #fff;
    height: 56px;

    span:hover {
      cursor: pointer;
    }
  }

  .row {
    overflow: scroll;
    padding: 10px;
    background-color: #f3f6fa;
    height: calc(100% - 56px);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>