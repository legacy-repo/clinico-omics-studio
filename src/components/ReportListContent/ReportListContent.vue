<template>
  <div class="antd-pro-components-report-list-content-index-listContent">
    <div class="description">
      <slot>
        {{ description }}
      </slot>
    </div>
    <div class="extra">
      <!-- <a-avatar :src="avatar" size="small" /> -->
      <avatar :username="owner" :size="24" inline style="margin-right: 5px"/>
      <a :href="href">{{ owner }}</a> publish at <a :href="href">{{ href }}</a>
      <em>{{ updateAt | moment }}</em>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  components: {
    Avatar
  },
  name: 'ReportListContent',
  props: {
    prefixCls: {
      type: String,
      default: 'antd-pro-components-report-list-content-index-listContent'
    },
    description: {
      type: String,
      default: ''
    },
    owner: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    },
    updateAt: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../index.less';

.antd-pro-components-report-list-content-index-listContent {
  .description {
    max-width: 720px;
    line-height: 22px;
  }
  .extra {
    margin-top: 16px;
    color: @text-color-secondary;
    line-height: 22px;

    & /deep/ .ant-avatar {
      position: relative;
      top: 1px;
      width: 20px;
      height: 20px;
      margin-right: 8px;
      vertical-align: top;
    }

    & > em {
      margin-left: 16px;
      color: @disabled-color;
      font-style: normal;
    }
  }
}

@media screen and (max-width: @screen-xs) {
  .antd-pro-components-report-list-content-index-listContent {
    .extra {
      & > em {
        display: block;
        margin-top: 8px;
        margin-left: 0;
      }
    }
  }
}
</style>
