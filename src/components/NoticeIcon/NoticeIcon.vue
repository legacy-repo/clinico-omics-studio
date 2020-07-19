<template>
  <a-popover
    v-model="visible"
    trigger="hover"
    placement="bottom"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '400px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane tab="Notifications" key="1">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in data">
                <a-list-item-meta :title="item.title" :description="item.description">
                  <a-avatar style="background-color: white" slot="avatar" src="https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/notification.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="Change Logs" key="2">
            <a-list>
              <a-list-item>
                <a-list-item-meta title="Release v0.1.1" description="The QUALITY Platform is released on April 10.">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @mouseenter="searchNotification(1, 10, 'Unread')" @click="redirect" class="header-notice" ref="noticeRef">
      <a-badge :count="total" showZero :numberStyle="{backgroundColor: backgroundColor} ">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'HeaderNotice',
  data () {
    return {
      loadding: false,
      visible: false,
      data: [],
      total: 0
    }
  },
  computed: {
    backgroundColor () {
      if (this.total > 0) {
        return '#f5222d'
      } else {
        return '#52c41a'
      }
    }
  },
  methods: {
    ...mapActions({
      getNotificationList: 'GetNotificationList'
    }),
    searchNotification (page, pageSize, status) {
      this.loading = true
      this.getNotificationList({
        page: page,
        per_page: pageSize,
        status: status
      }).then(result => {
        const that = this
        that.data = result.data
        that.total = result.total
        this.loading = false
      })
    },
    redirect () {
      this.$router.push({ name: 'notifications' }).catch(() => {})
    }
  },
  created () {
    this.searchNotification(1, 1, 'Unread')
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 60px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
