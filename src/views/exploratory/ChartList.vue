<template>
  <a-row class="chart-list">
    <span class="title">{{ title }}</span>
    <a-row class="list">
      <a-col class="chart" v-for="chart in charts" :key="chart.key">
        <a-row class="card">
          <a-col class="image">
            <bar-icon class="custom-icon" v-if="chart.key == 'bar'" />
            <line-icon class="custom-icon" v-if="chart.key == 'line'" />
            <scatter-icon class="custom-icon" v-if="chart.key == 'scatter'" />
            <area-icon class="custom-icon" v-if="chart.key == 'area'" />
            <heatmap-icon class="custom-icon" v-if="chart.key == 'heatmap'" />
            <table-icon class="custom-icon" v-if="chart.key == 'table'" />
            <pie-icon class="custom-icon" v-if="chart.key == 'pie'" />
            <contour-icon class="custom-icon" v-if="chart.key == 'contour'" />
          </a-col>
          <a-col class="actions">
            <a-button icon="search" size="small" disabled @click="dispatch('search', chart)" />
            <a-button icon="exclamation-circle" size="small" @click="dispatch('help', chart)" />
            <a-button icon="bar-chart" size="small" @click="dispatch('example', chart)" />
          </a-col>
        </a-row>
        <span>{{ chart.title }}</span>
      </a-col>
    </a-row>
  </a-row>
</template>

<script>
import { barIcon, lineIcon, scatterIcon, areaIcon, heatmapIcon, tableIcon, pieIcon, contourIcon } from '@/core/icons'

export default {
  components: {
    barIcon,
    lineIcon,
    scatterIcon,
    areaIcon,
    heatmapIcon,
    tableIcon,
    pieIcon,
    contourIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    charts: {
      type: Array,
      required: true
    }
  },
  methods: {
    dispatch(type, chart) {
      console.log('dispatch: ', type, chart)
      this.$emit('dispatch', {
        type: type,
        chart: chart
      })
    }
  }
}
</script>

<style lang="less" scoped>
.chart-list {
  .title {
    font-size: 15px;
    height: 16px;
  }

  .list {
    .chart {
      margin: 10px 10px 10px 0px;

      .card {
        display: flex;
        flex-direction: row;

        .actions {
          padding: 0px 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .image {
          padding: 10px;
          border-radius: 5px;
          background: #fff;
          box-shadow: 0 2px 9px transparent;
          border: 1px solid #c8d4e3;

          .custom-icon {
            width: 60px;
            height: 60px;
          }
        }
      }

      span {
        display: flex;
        width: 80px;
        justify-content: center;
      }
    }

    display: flex;
    flex-wrap: wrap;
  }
}
</style>