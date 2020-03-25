<template>
  <div>
    <a-card style="margin-top: 10px" :bordered="false">
      <a-badge slot="extra" :count="total" :numberStyle="{backgroundColor: '#52c41a'}"/>
      <div slot="title">
        <a-radio-group @change="onClickRadioBtn" defaultValue="total" :value="radioGroupValue">
          <a-radio-button value="total">Total</a-radio-button>
          <a-radio-button value="unchecked">Unchecked</a-radio-button>
          <a-radio-button value="checked">Checked</a-radio-button>
          <a-radio-button value="archived">Archived</a-radio-button>
        </a-radio-group>
        <a-input-search
          style="margin-left: 16px; width: 272px;"
          placeholder="Please Enter Report Name"
          @search="onSearch"
        />
      </div>

      <a-list
        size="large"
        :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSize: perPage, total: total, current: page }"
      >
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-popover slot="avatar">
              <template slot="content">
                <img :src="item.cover" class="popover" />
              </template>
              <a-avatar size="large" shape="square" :src="item.cover" />
            </a-popover>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="onShowReport(item.title, item.report)" :disabled="!item.report">View</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>Update</a></a-menu-item>
                <a-menu-item><a>Delete</a></a-menu-item>
                <a-menu-item><a>Checked</a></a-menu-item>
                <a-menu-item><a>Archived</a></a-menu-item>
              </a-menu>
              <a>More<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>Checked</span>
              <p>{{ item.checkedAt }}</p>
            </div>
            <div class="list-content-item">
              <span>Archived</span>
              <p>{{ item.archivedAt }}</p>
            </div>
            <div class="list-content-item">
              <a-tag color="pink" v-if="item.status.checked">Checked</a-tag>
              <a-tag color="blue" v-if="item.status.archived">Archived</a-tag>
            </div>
          </div>
        </a-list-item>
      </a-list>

      <task-form ref="taskForm" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from '@/views/list/modules/TaskForm'
import { getReportList } from '@/api/manage'
import Avatar from '@/components/Avatar'
import orderBy from 'lodash.orderby'

export default {
  name: 'ReportList',
  components: {
    Avatar,
    HeadInfo,
    TaskForm
  },
  data () {
    return {
      data: {},
      total: 0,
      perPage: 5,
      page: 1,
      radioGroupValue: 'total'
    }
  },
  methods: {
    onSearch (value, event) {
      console.log('Search Box: ', value)
    },
    onClickRadioBtn (event) {
      this.radioGroupValue = event.target.value
      console.log('Current Radio Button Value: ', this.radioGroupValue)
    },
    onShowReport (workflowName, reportId) {
      this.$router.push({
        name: 'report-details',
        params: {
          reportId: reportId
        },
        query: {
          readonly: true,
          description: 'The Report of ' + workflowName
        }
      })
    }
  },
  created () {
    getReportList({
      page: 1,
      per_page: 5
    }).then(result => {
      const that = this
      that.data = orderBy(result.data, [item => item.title.toLowerCase()], ['asc'])
      that.perPage = result.per_page
      that.total = result.total
      that.page = result.page
    })
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content {
  display: flex;
  flex-direction: row;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;

  .ant-tag {
    margin-bottom: 5px;
  }

  span {
    line-height: 20px;
  }

  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}

.popover {
  width: 300px;
}
</style>
