<template>
  <page-view title="Notification Management" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <a-row class="notification-table">
      <div class="table-operations">
        <a-button @click="markAsRead">Mark As Read</a-button>
        <a-button @click="readAllMsg">Read All Messages</a-button>
        <a-button @click="deleteAll">Delete All Messages</a-button>
      </div>
      <a-table
        :loading="loading"
        size="small"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :rowSelection="rowSelection"
        :rowClassName="setClassName"
        @change="handleChange">
        <a slot="action" slot-scope="record" @click="onDeleteRecord(record)">Delete</a>
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0" v-html="record.description"></p>
      </a-table>
    </a-row>
  </page-view>
</template>

<script>
import { PageView } from '@/layouts'
import { mapActions } from 'vuex'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

export default {
  name: 'NotificationTable',
  data () {
    return {
      loading: false,
      data: [],
      rowSelection,
      pagination: {
        pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 5,
        total: 0,
        current: 1,
        onChange: (page, pageSize) => {
          this.searchNotification(page, pageSize)
        },
        onShowSizeChange: (current, pageSize) => {
          this.searchNotification(1, pageSize)
        }
      }
    }
  },
  computed: {
    columns () {
      const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'left'
      }, {
        title: 'Created Time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'left'
      }, {
        title: 'Notification Type',
        dataIndex: 'notificationType',
        key: 'notificationType',
        align: 'left'
      }, {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        align: 'center',
        scopedSlots: {
          customRender: 'action'
        }
      }]
      return columns
    }
  },
  methods: {
    ...mapActions({
      getNotificationList: 'GetNotificationList'
    }),
    setClassName (record, index) {
      if (record.status === 'Read') {
        return 'read'
      }
    },
    searchNotification (page, pageSize) {
      this.loading = true
      this.getNotificationList({
        page: page,
        per_page: pageSize
      }).then(result => {
        const that = this
        that.data = result.data
        that.pagination.pageSize = result.perPage
        that.pagination.total = result.total
        that.pagination.current = result.page
        this.loading = false
      })
    },
    onDeleteRecord (record) {
      console.log('Delete record: ', record)
    },
    handleChange (pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
    },
    markAsRead () {},
    deleteAll () {},
    readAllMsg () {}
  },
  components: {
    PageView
  },
  created () {
    this.searchNotification(this.pagination.current, this.pagination.pageSize)
  }
}
</script>

<style lang="less" scoped>
.notification-table {
  background-color: #fff;
  min-height: 500px;
  padding: 10px;
  border-radius: 5px;

  .table-operations {
    margin-bottom: 5px;

    button {
      margin-right: 8px;
    }
  }
}
</style>

<style lang="less">
.read {
  color: #bebebe;
}
</style>
