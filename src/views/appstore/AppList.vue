<template>
  <a-row class="card-list" :gutter="16">
    <a-col :xl="6" :lg="6" :md="8" :sm="12" :xs="24" v-for="app in appList" :key="app.id">
      <a-card hoverable class="card">
        <!-- <img :alt="app.title" :src="app.cover" slot="cover"/> -->
        <template class="ant-card-actions" slot="actions">
          <a-icon type="eye" @click="onView(app)" />
          <a-popover :title="app.appName" trigger="click" v-model="app.popoverVisible">
            <a slot="content">{{ app.description }}</a>
            <a-icon type="info-circle" />
          </a-popover>
          <a-icon type="share-alt" />
        </template>
        <a-card-meta :title="app.title" :description="app.description" class="card-meta">
          <a-avatar slot="avatar" :src="app.icon" />
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
    togglePopover(app) {
      app.popoverVisible = !app.popoverVisible
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

<style lang="less">
.card-list {
  .card {
    width: 100%;
    // margin-right: 10px;
    // margin-bottom: 10px;
    margin: 0px 10px 10px;

    img {
      height: 200px;
    }

    .card-meta {
      height: 75px;
    }
  }
}
</style>
