<template>
  <a-row class="card-list" :gutter="16">
    <a-col :xxl="6" :xl="8" :lg="8" :md="8" :sm="12" :xs="24" v-for="(app, idx) in appList" :key="idx">
      <a-card hoverable class="card">
        <!-- <img :alt="app.title" :src="app.cover" slot="cover"/> -->
        <template class="ant-card-actions" slot="actions">
          <a-icon type="eye" @click="onView(app)" />
          <a-popover trigger="click">
            <a slot="title" :href="app.home" target="_blank">{{ app.appName }}</a>
            <p slot="content">{{ app.description }}</p>
            <a-icon type="info-circle" />
          </a-popover>
          <a-icon type="share-alt" />
        </template>
        <a-card-meta :title="app.title" class="card-meta">
          <p slot="description">
            <a-tag color="#108ee9">{{ formatAppVersion(app) }}</a-tag>
            <span>{{ app.description }}</span>
          </p>
          <!-- <a-avatar slot="avatar" :src="app.icon" /> -->
          <a-avatar slot="avatar" style="backgroundColor: #87d068">
            {{ app.title[0].toUpperCase() }}
          </a-avatar>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
/* eslint-disable */
export default {
  name: 'AppList',
  props: {
    appList: {
      required: true,
      type: Array
    }
  },
  methods: {
    formatAppVersion(app) {
      return app.appName.split('-').pop()
    },
    formatDescription(app) {
      return "[" + app.appName.split('-').pop() + "] " + app.description
    },
    onView(app) {
      if (app.repoUrl && app.repoUrl.match(/^http[s]?:.*/)) {
        window.open(app.repoUrl, '_blank')
      } else {
        this.$router.push({
          name: 'create-project',
          query: {
            appId: app.id
          }
        })
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
