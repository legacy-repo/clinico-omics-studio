<template>
  <a-row class="card-list" :gutter="16">
    <a-col :xxl="6" :xl="8" :lg="8" :md="8" :sm="12" :xs="24" v-for="(chart, idx) in chartList" :key="idx">
      <a-card hoverable class="card">
        <!-- <img :alt="chart.title" :src="chart.cover" slot="cover"/> -->
        <template class="ant-card-actions" slot="actions">
          <a-icon type="eye" @click="onView(chart)" />
          <a-popover trigger="click">
            <a slot="title" :href="chart.home" target="_blank">{{ chart.appName }}</a>
            <p slot="content">{{ chart.description }}</p>
            <a-icon type="info-circle" />
          </a-popover>
          <a-icon type="share-alt" />
        </template>
        <a-card-meta :title="chart.title" :description="chart.description" class="card-meta">
          <a-avatar slot="avatar" style="backgroundColor: #87d068">{{ chart.title[0].toUpperCase() }}</a-avatar>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ChartList',
  props: {
    chartList: {
      required: true,
      type: Array
    }
  },
  methods: {
    onView(chart) {

    }
  }
}
</script>

<style lang="less" scoped>
.card-list {
  margin-left: 0px !important;
  margin-right: 0px !important;

  .card {
    width: 100%;
    margin: 0px 0px 10px;

    img {
      height: 200px;
    }

    .card-meta {
      height: 75px;
    }
  }
}
</style>
