<template>
  <a-row class="card-list" :gutter="16">
    <a-col :xxl="6" :xl="8" :lg="8" :md="8" :sm="12" :xs="24" v-for="(report, idx) in reportList" :key="idx">
      <a-card hoverable class="card">
        <!-- <img :alt="report.title" :src="report.cover" slot="cover"/> -->
        <template class="ant-card-actions" slot="actions">
          <a-icon type="eye" @click="onView(report)" />
          <a-popover trigger="click">
            <a slot="title" :href="report.home" target="_blank">{{ report.appName }}</a>
            <p slot="content">{{ report.description }}</p>
            <a-icon type="info-circle" />
          </a-popover>
          <a-icon type="share-alt" />
        </template>
        <a-card-meta :title="report.title" :description="report.description" class="card-meta">
          <a-avatar
            slot="avatar"
            style="backgroundColor: #87d068"
          >{{ report.title[0].toUpperCase() }}</a-avatar>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ReportList',
  props: {
    reportList: {
      required: true,
      type: Array
    }
  },
  methods: {
    onView(report) {
      if (report.category.toUpperCase() === 'REPORT') {
        this.$router.push({
          name: 'report-management',
          query: { creationMode: 'directory', reportTool: report.title }
        })
      } else {
        console.log('No Such Option: ', report)
      }
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
