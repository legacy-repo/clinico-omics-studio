<template>
  <a-row class="card-list" :gutter="16">
    <a-col :xxl="6" :xl="8" :lg="8" :md="8" :sm="12" :xs="24" v-for="(tool, idx) in toolList" :key="idx">
      <a-card hoverable class="card">
        <!-- <img :alt="tool.title" :src="tool.cover" slot="cover"/> -->
        <template class="ant-card-actions" slot="actions">
          <a-icon type="eye" @click="onView(tool)" />
          <a-popover trigger="click">
            <a slot="title" :href="tool.home" target="_blank">{{ `${tool.shortName}-${tool.version}` }}</a>
            <p slot="content">{{ tool.description }}</p>
            <a-icon type="info-circle" />
          </a-popover>
          <a-icon disabled type="share-alt" />
        </template>
        <a-card-meta :title="tool.title" :description="tool.description" class="card-meta">
          <a-avatar slot="avatar" style="backgroundColor: #87d068">{{ tool.title[0].toUpperCase() }}</a-avatar>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ToolList',
  props: {
    toolList: {
      required: true,
      type: Array
    }
  },
  methods: {
    onView(tool) {
      if (tool.repoUrl && tool.repoUrl.match(/^http[s]?:.*/)) {
        window.open(tool.repoUrl, '_blank')
      } else {
        // Tool or Convertor
        this.$router.push({
          name: tool.shortName
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
