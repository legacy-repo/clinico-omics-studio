<template>
  <a-row class="pie-chart">
    <h4>{{ title }}</h4>
    <v-chart class="chart" :forceFit="true" :height="height" :width="width" :data="dataSource" :scale="scale" padding="auto">
      <v-tooltip :showTitle="false" dataKey="name*count" />
      <v-axis />
      <v-legend dataKey="name" v-if="showLegend" />
      <v-pie position="count" color="name" :v-style="pieStyle" :label="getLableConfig()" />
      <v-coord type="theta" />
    </v-chart>
  </a-row>
</template>

<script>
import DataSet from '@antv/data-set'

const scale = [{
  dataKey: 'count',
  min: 0
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
      default: 200
    },
    width: {
      type: Number,
      default: 200
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
      labelConfig: ['count', {
        offset: -40,
        textStyle: {
          rotate: 0,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      }],
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
        type: 'count',
        field: 'count',
        dimension: 'name',
        as: 'count'
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

  .chart > canvas {
    margin: 0px auto;
  }
}
</style>
