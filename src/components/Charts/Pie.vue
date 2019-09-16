<template>
  <a-row class="pie-chart">
    <h4>{{ title }}</h4>
    <v-chart :forceFit="true" :height="height" :data="getData()" :scale="scale">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-legend dataKey="item" v-if="showLegend" />
      <v-pie position="percent" color="item" :v-style="pieStyle" :label="getLableConfig" />
      <v-coord type="theta" />
    </v-chart>
  </a-row>
</template>

<script>
const DataSet = require('@antv/data-set')

const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

export default {
  name: 'Pie',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 400
    },
    title: {
      type: String,
      default: 'Pie Chart'
    },
    showLegend: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scale,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      labelConfig: ['percent', {
        formatter: (val, item) => {
          return item.point.item + ': ' + val
        }
      }]
    }
  },
  methods: {
    getLableConfig () {
      if (this.showLabel) {
        return this.labelConfig
      } else {
        return []
      }
    },
    getData () {
      const dv = new DataSet.View().source(this.dataSource)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      const data = dv.rows
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.pie-chart {
  h4 {
    text-align: center;
  }
}
</style>
